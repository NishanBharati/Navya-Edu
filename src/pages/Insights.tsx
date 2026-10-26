import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import {
  Clock,
  ArrowRight,
  Search,
  Loader2,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Share2,
  Send,
  Calendar,
  X
} from 'lucide-react';
import type { InsightArticle } from '../types';
import { INSIGHTS } from '../data/insights';
import { useSupabaseTable } from '../lib/useSupabaseTable';
import { Container } from '../components/common/Container';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { SEOHead } from '../components/common/SEOHead';
import { getBreadcrumbSchema } from '../utils/structuredData';
import { AdvisorModal } from '../components/common/AdvisorModal';
import { ImagePlaceholder } from '../components/common/ImagePlaceholder';
import { HeroImageWithParallax } from '../components/common/HeroImageWithParallax';
import { HeroLiveIndicator } from '../components/common/HeroLiveIndicator';
import {
  heroStaggerContainer,
  heroEyebrow,
  heroHeadline,
  heroParagraph,
  heroCardsContainer,
  heroCardItem,
  staggerContainer,
  bentoCardVariant,
  EASING,
  VIEWPORT_ONCE
} from '../lib/motion';

/**
 * Magazine-style Spotlight Article with subtle scroll parallax on the cover image.
 */
const SpotlightArticle: React.FC<{ article: InsightArticle }> = ({ article }) => {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Subtle vertical drift on image as user scrolls past it (-20px -> +20px)
  const imageY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [-20, 20]);
  const imageScale = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : [1.06, 1.01]);

  return (
    <div className="mb-14">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          Editor&apos;s Choice Spotlight
        </span>
        <span className="text-xs text-ink-faint font-mono">Curated Engineering Analysis</span>
      </div>

      <article
        ref={containerRef}
        className="group relative bg-white border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-navy/40 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0"
      >
        {/* Parallax Image Frame (7 cols) */}
        <div className="lg:col-span-7 relative overflow-hidden bg-paper-alt border-b lg:border-b-0 lg:border-r border-border min-h-[280px] sm:min-h-[360px] lg:min-h-full">
          <motion.div
            style={{ y: imageY, scale: imageScale }}
            className="w-full h-full absolute inset-0 will-change-transform"
          >
            <ImagePlaceholder
              src={article.coverImage}
              alt={article.title}
              aspectRatio="auto"
              className="w-full h-full !border-0"
              imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </motion.div>

          {/* Floating Badges */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <Badge variant="navy" size="md" className="shadow-md bg-navy/90 text-white backdrop-blur-md">
              {article.category}
            </Badge>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/90 text-navy-dark text-[10px] font-mono font-bold tracking-wide shadow-xs backdrop-blur-md">
              <Sparkles className="w-3 h-3" />
              Featured Read
            </span>
          </div>

          {/* Vignette Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Editorial Content Column (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 bg-paper-alt/20">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs text-ink-faint font-mono">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue" />
                {article.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue" />
                {article.readTime}
              </span>
            </div>

            <Link to={`/insights/${article.slug}`}>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-ink group-hover:text-navy transition-colors leading-[1.25]">
                {article.title}
              </h2>
            </Link>

            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed line-clamp-3 sm:line-clamp-4">
              {article.excerpt}
            </p>

            {/* Magazine-Style Takeaway Quote Block */}
            {article.keyTakeaways && article.keyTakeaways.length > 0 && (
              <div className="p-4 rounded-2xl bg-white border border-border-warm text-xs text-ink space-y-1.5 shadow-2xs">
                <span className="font-mono font-bold text-navy uppercase text-[10px] tracking-wider block">
                  Core Engineering Takeaway:
                </span>
                <p className="line-clamp-2 text-ink-soft leading-relaxed italic">
                  &ldquo;{article.keyTakeaways[0]}&rdquo;
                </p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-border-faint flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              {article.author.avatarUrl ? (
                <img
                  src={article.author.avatarUrl}
                  alt={article.author.name}
                  className="w-9 h-9 rounded-full object-cover border border-border shadow-2xs"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-navy text-white flex items-center justify-center text-xs font-bold">
                  {article.author.name.charAt(0)}
                </div>
              )}
              <div>
                <span className="text-xs font-bold text-ink block leading-tight">
                  {article.author.name}
                </span>
                <span className="text-[11px] text-ink-faint block">
                  {article.author.role}
                </span>
              </div>
            </div>

            <Link
              to={`/insights/${article.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy text-white text-xs font-bold hover:bg-navy-light transition-all shadow-xs group/read"
            >
              <span>Read Analysis</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/read:translate-x-1" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};



export const Insights: React.FC = () => {
  const { items: dbInsights, isLoading } = useSupabaseTable<InsightArticle>('insights', {
    orderBy: 'date',
    ascending: false
  });
  const prefersReducedMotion = useReducedMotion();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Fallback to INSIGHTS if database is loading or empty
  const allArticles = useMemo(() => {
    if (dbInsights && dbInsights.length > 0) {
      const active = dbInsights.filter((a) => a.status !== 'draft');
      if (active.length > 0) return active;
    }
    return INSIGHTS.filter((a) => a.status !== 'draft');
  }, [dbInsights]);

  // Extract all unique tags across articles for quick filter chips
  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    cats.add('All');
    allArticles.forEach((art) => {
      cats.add(art.category);
    });
    return Array.from(cats);
  }, [allArticles]);

  // Dynamic list of categories with counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: allArticles.length };
    allArticles.forEach((article) => {
      counts[article.category] = (counts[article.category] || 0) + 1;
    });
    return counts;
  }, [allArticles]);

  const categories = useMemo(() => {
    const set = new Set<string>(['All']);
    allArticles.forEach((a) => set.add(a.category));
    return Array.from(set);
  }, [allArticles]);

  // Filtered insights based on category and search query
  const filteredArticles = useMemo(() => {
    return allArticles.filter((article) => {
      const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.tags?.some((t) => t.toLowerCase().includes(query)) ||
        article.author.name.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [allArticles, selectedCategory, searchQuery]);

  // Featured article (first pinned or first general)
  const featuredArticle = useMemo(() => {
    if (selectedCategory === 'All' && !searchQuery) {
      return allArticles.find((a) => a.featured) || allArticles[0] || null;
    }
    return null;
  }, [allArticles, selectedCategory, searchQuery]);

  // Grid articles (excluding featured when displayed on default view)
  const gridArticles = useMemo(() => {
    if (featuredArticle && selectedCategory === 'All' && !searchQuery) {
      return filteredArticles.filter((a) => a.id !== featuredArticle.id);
    }
    return filteredArticles;
  }, [filteredArticles, featuredArticle, selectedCategory, searchQuery]);

  const handleShare = async (article: InsightArticle, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/insights/${article.slug}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url,
        });
        return;
      } catch (err) {
        // Fallback to clipboard if user cancels or fails
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(article.id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch (err) {
      // Ignore clipboard write issues
    }
  };

  const handleCopyLink = (e: React.MouseEvent, slug: string, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/insights/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setIsSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <main className="min-h-screen py-10 sm:py-16 bg-paper text-ink">
      <SEOHead
        title="Industry Insights, Engineering Guides & Tech Perspectives | Navya Ed Tech"
        description="Read technical guides, software architecture principles, and tech hiring analysis from the engineering leads at Navya Ed Tech Kathmandu."
        keywords="Nepal tech insights, software architecture blog Kathmandu, tech career guides Nepal, Python web dev articles, learning to code Nepal"
        structuredData={getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Insights', path: '/insights' },
        ])}
      />

      <Container>
        {/* ========================================================================= */}
        {/* 1. HERO SECTION & EDITORIAL IDENTITY */}
        {/* ========================================================================= */}
        <section className="mb-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <motion.div
            variants={prefersReducedMotion ? undefined : heroStaggerContainer}
            initial={prefersReducedMotion ? false : 'hidden'}
            animate="visible"
            className="lg:col-span-7 space-y-6"
          >
            <motion.div
              variants={prefersReducedMotion ? undefined : heroEyebrow}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-navy/5 border border-navy/15 text-xs font-semibold tracking-wider text-navy uppercase"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue" />
              <span>Engineering & Education Editorial</span>
              <HeroLiveIndicator color="blue" />
              <span className="text-ink-soft font-normal lowercase">{allArticles.length} technical guides</span>
            </motion.div>

            <div className="space-y-3">
              <motion.h1
                variants={prefersReducedMotion ? undefined : heroHeadline}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink leading-[1.12]"
              >
                Industry Insights, System Design & Career Guides.
              </motion.h1>
              <motion.p
                variants={prefersReducedMotion ? undefined : heroParagraph}
                className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-2xl"
              >
                Objective perspectives on modern software engineering architecture, technical hiring demands in Nepal and global remote markets, and practical learning methodologies.
              </motion.p>
            </div>

            {/* Editorial Focus Pills */}
            <motion.div
              variants={prefersReducedMotion ? undefined : heroCardsContainer}
              className="pt-2 flex flex-wrap items-center gap-2.5 text-xs"
            >
              <motion.span
                variants={prefersReducedMotion ? undefined : heroCardItem}
                className="px-3 py-1.5 rounded-xl bg-white border border-border text-ink font-medium shadow-xs hover:border-navy/30 transition-colors"
              >
                ⚡ Architecture & Microservices
              </motion.span>
              <motion.span
                variants={prefersReducedMotion ? undefined : heroCardItem}
                className="px-3 py-1.5 rounded-xl bg-white border border-border text-ink font-medium shadow-xs hover:border-navy/30 transition-colors"
              >
                💼 Nepal IT Hiring Trends
              </motion.span>
              <motion.span
                variants={prefersReducedMotion ? undefined : heroCardItem}
                className="px-3 py-1.5 rounded-xl bg-white border border-border text-ink font-medium shadow-xs hover:border-navy/30 transition-colors"
              >
                🛠️ Production Code Reviews
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Right Visual Composition with Parallax Overlaid Card */}
          <div className="lg:col-span-5 relative">
            <HeroImageWithParallax
              src="/images/heroes/insights-hero.jpg"
              alt="Software architecture and engineering research lab in Kathmandu"
              heightClass="h-[320px] sm:h-[380px]"
              priority={true}
              overlayBadgeTop={
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/40 shadow-sm text-xs font-bold text-navy">
                  <HeroLiveIndicator color="blue" />
                  <span>Engineering Editorial Desk</span>
                </div>
              }
              overlayCardBottom={
                <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-ink">Engineering Guides</p>
                    <p className="text-[11px] text-ink-soft">Authored by Software Engineers</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-navy text-white shrink-0">
                    Verified Notes
                  </span>
                </div>
              }
            />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. FEATURED ARTICLE SPOTLIGHT (MAGAZINE-STYLE WITH SCROLL PARALLAX) */}
        {/* ========================================================================= */}
        {featuredArticle && selectedCategory === 'All' && searchQuery === '' && (
          <SpotlightArticle article={featuredArticle} />
        )}

        {/* ========================================================================= */}
        {/* 3. SEARCH & CHRONOLOGICAL ARTICLES HEADER */}
        {/* ========================================================================= */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-border shadow-xs mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-ink flex items-center gap-2">
                <span>All Published Technical Guides</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-navy/10 text-navy font-mono">
                  {allArticles.length}
                </span>
              </h2>
              <p className="text-xs text-ink-faint mt-0.5">
                Arranged chronologically by publication date
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-80 shrink-0">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none" />
              <input
                type="text"
                aria-label="Search articles by topic, tag, or skill"
                placeholder="Search topics, tags, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-input-border bg-paper text-ink focus:outline-none focus:ring-2 focus:ring-navy focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink p-1 cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {searchQuery && (
            <div className="pt-3 border-t border-border-faint flex items-center justify-between text-xs text-ink-soft">
              <span>
                Showing <strong>{filteredArticles.length}</strong> {filteredArticles.length === 1 ? 'article' : 'articles'} matching "<strong>{searchQuery}</strong>"
              </span>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-blue font-semibold hover:underline cursor-pointer"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 4. ARTICLES GRID (WITH CARD LIFT, HOVER ZOOM & ANIMATED READ ARROW) */}
        {/* ========================================================================= */}
        {isLoading && allArticles.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-sm text-ink-soft">
            <Loader2 className="w-6 h-6 animate-spin text-navy" />
            <span>Loading technical publications…</span>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="bg-white border border-border rounded-3xl p-12 text-center space-y-4 max-w-xl mx-auto my-8 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-navy/5 text-navy mx-auto flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-ink">No articles match your query</h3>
            <p className="text-xs sm:text-sm text-ink-soft">
              Try searching with broader terms (e.g. "TypeScript", "Career", "Nepal") or clear your category filters.
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
            >
              View All Articles
            </Button>
          </div>
        ) : (
          <motion.div
            variants={prefersReducedMotion ? undefined : staggerContainer(0.08, 0.04)}
            initial={prefersReducedMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 items-stretch"
          >
            {filteredArticles.map((article) => (
              <motion.div
                key={article.id}
                variants={prefersReducedMotion ? undefined : bentoCardVariant}
                className="h-full"
              >
                <article
                  className="group bg-white border border-border rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:border-navy/40 hover:-translate-y-1.5 transition-all duration-300 transform-gpu flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Article Thumbnail with Hover Zoom */}
                    <Link to={`/insights/${article.slug}`} className="block relative overflow-hidden bg-paper-alt border-b border-border">
                      <ImagePlaceholder
                        src={article.coverImage}
                        alt={article.title}
                        aspectRatio="cinema"
                        imgClassName="group-hover:scale-106 transition-transform duration-500 ease-out"
                      >
                        <div className="absolute top-3 left-3 z-10">
                          <Badge variant="blue" size="sm" className="shadow-xs bg-white/95 backdrop-blur-sm">
                            {article.category}
                          </Badge>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </ImagePlaceholder>
                    </Link>

                    {/* Body Content */}
                    <div className="p-6 space-y-3.5">
                      <div className="flex items-center justify-between text-[11px] text-ink-faint font-mono">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-blue" />
                          <span>{article.readTime}</span>
                        </span>
                        <span>{article.date}</span>
                      </div>

                      <Link to={`/insights/${article.slug}`}>
                        <h3 className="text-base sm:text-lg font-bold text-ink group-hover:text-navy transition-colors leading-snug">
                          {article.title}
                        </h3>
                      </Link>

                      <p className="text-xs sm:text-sm text-ink-soft leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>

                      {/* Tag Cloud */}
                      {article.tags && article.tags.length > 0 && (
                        <div className="pt-2 flex flex-wrap gap-1.5">
                          {article.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-paper text-ink-soft border border-border font-mono"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Footer Bar with Author & Animated Read Link */}
                  <div className="px-6 py-4 bg-paper-alt/50 border-t border-border-faint flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      {article.author.avatarUrl ? (
                        <img
                          src={article.author.avatarUrl}
                          alt={article.author.name}
                          className="w-7 h-7 rounded-full object-cover border border-border"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-navy text-white flex items-center justify-center text-[10px] font-bold">
                          {article.author.name.charAt(0)}
                        </div>
                      )}
                      <span className="text-xs font-semibold text-ink truncate max-w-[120px]">
                        {article.author.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => handleCopyLink(e, article.slug, article.id)}
                        title="Copy article link"
                        className="p-1.5 rounded-lg text-ink-faint hover:text-navy hover:bg-border transition-colors relative cursor-pointer"
                      >
                        {copiedId === article.id ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Share2 className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <Link
                        to={`/insights/${article.slug}`}
                        className="text-xs font-bold text-navy hover:text-blue inline-flex items-center gap-1.5 transition-colors group/read"
                      >
                        <span>Read</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1.5 group-hover/read:translate-x-1.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* 5. NEWSLETTER & ENGINEERING DISPATCH STRIP */}
        {/* ========================================================================= */}
        <section className="bg-gradient-to-br from-navy to-[#0E1F30] rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-white mb-16 shadow-md relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#A8C6E5] flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5" />
                Navya Engineering Dispatch
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                Monthly Technical Digests & Syllabus Updates
              </h2>
              <p className="text-xs sm:text-sm text-mist leading-relaxed max-w-xl">
                Receive curated articles on software architecture, hiring trends in Nepal, open workshops, and new capstone syllabi directly in your inbox. No spam.
              </p>
            </div>

            <div className="lg:col-span-5">
              {isSubscribed ? (
                <div className="p-4 rounded-xl bg-white/10 border border-white/20 text-center space-y-2 backdrop-blur-sm">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                  <p className="text-sm font-bold text-white">You are on the dispatch list!</p>
                  <p className="text-xs text-mist">
                    We'll email you when our next technical analysis and workshop dates drop.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      required
                      aria-label="Email address for engineering insights newsletter"
                      placeholder="Enter your email (e.g. dev@domain.com)"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/15 transition-all"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-blue text-white text-xs font-bold hover:bg-[#4884BD] transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
                    >
                      Subscribe
                    </button>
                  </div>
                  <p className="text-[11px] text-ink-faint">
                    Curated by senior engineering mentors. Unsubscribe anytime in 1 click.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. BRIDGING THEORY TO PRACTICE: COURSE CTA */}
        {/* ========================================================================= */}
        <section className="bg-white border border-border rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue block">
              Project-Based Pedagogy
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-ink">
              Ready to turn these principles into live production code?
            </h3>
            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
              Explore our practical courses in Python Beginner, Python Advance, Web Development, Scratch, and Data Science. Build real capstone projects under mentor guidance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button
              variant="outline"
              size="md"
              onClick={() => setIsAdvisorOpen(true)}
            >
              Talk with an Advisor
            </Button>
            <Button
              variant="primary"
              size="md"
              href="/courses"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Explore All Courses
            </Button>
          </div>
        </section>
      </Container>

      {/* Academic Advisor Modal */}
      <AdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
      />
    </main>
  );
};
