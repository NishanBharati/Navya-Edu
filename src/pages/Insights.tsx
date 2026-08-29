import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
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
import { AdvisorModal } from '../components/common/AdvisorModal';
import { ImagePlaceholder } from '../components/common/ImagePlaceholder';

export const Insights: React.FC = () => {
  const { items: dbInsights, isLoading } = useSupabaseTable<InsightArticle>('insights', {
    orderBy: 'date',
    ascending: false
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Fallback to INSIGHTS if database is loading or empty
  const allArticles = useMemo(() => {
    if (dbInsights && dbInsights.length > 0) {
      return dbInsights;
    }
    return INSIGHTS;
  }, [dbInsights]);

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

  // Filtered articles
  const filteredArticles = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allArticles.filter((article) => {
      const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!q) return true;

      const inTitle = article.title.toLowerCase().includes(q);
      const inExcerpt = article.excerpt.toLowerCase().includes(q);
      const inCategory = article.category.toLowerCase().includes(q);
      const inTags = article.tags?.some((t) => t.toLowerCase().includes(q)) ?? false;
      const inAuthor = article.author.name.toLowerCase().includes(q);
      return inTitle || inExcerpt || inCategory || inTags || inAuthor;
    });
  }, [allArticles, selectedCategory, searchQuery]);

  // Featured article for top spotlight
  const featuredArticle = useMemo(() => {
    return allArticles.find((a) => a.featured) || allArticles[0];
  }, [allArticles]);

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
    if (!newsletterEmail) return;
    setIsSubscribed(true);
  };

  return (
    <main className="min-h-screen py-10 sm:py-16 bg-paper text-ink">
      <SEOHead
        title="Technical Insights, Engineering Practices & Career Guides | Navya Ed Tech"
        description="Authoritative analyses on software engineering workflows, Nepal IT career pathways, TypeScript, Python AI, and project-based computer science pedagogy."
      />

      <Container>
        {/* ========================================================================= */}
        {/* 1. HERO SECTION & EDITORIAL IDENTITY */}
        {/* ========================================================================= */}
        <section className="mb-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-navy/5 border border-navy/15 text-xs font-semibold tracking-wider text-navy uppercase">
              <BookOpen className="w-3.5 h-3.5 text-blue" />
              <span>Engineering & Education Editorial</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue" />
              <span className="text-ink-soft font-normal lowercase">{allArticles.length} publications</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink leading-[1.12]">
                Industry Insights, System Design & Career Guides.
              </h1>
              <p className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-2xl">
                Objective perspectives on modern software engineering architecture, technical hiring demands in Nepal and global remote markets, and practical learning methodologies.
              </p>
            </div>

            {/* Editorial Focus Pills */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs">
              <span className="px-3 py-1.5 rounded-xl bg-white border border-border text-ink font-medium shadow-xs">
                ⚡ Architecture & Microservices
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white border border-border text-ink font-medium shadow-xs">
                💼 Nepal IT Hiring Trends
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white border border-border text-ink font-medium shadow-xs">
                🛠️ Production Code Reviews
              </span>
            </div>
          </div>

          {/* Right Visual Composition with Generated Hero Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="absolute -inset-2 bg-gradient-to-tr from-blue/20 via-navy/15 to-amber/20 rounded-3xl blur-xl -z-10" />
              <div className="relative rounded-3xl overflow-hidden border border-blue-mist shadow-xl bg-white group">
                <img
                  src="/images/heroes/insights-hero.jpg"
                  alt="Software architecture and engineering research lab in Kathmandu"
                  className="w-full h-[320px] sm:h-[380px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-black/20" />

                {/* Floating Top Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/40 shadow-sm text-xs font-bold text-navy">
                  <span className="w-2 h-2 rounded-full bg-blue animate-pulse" />
                  <span>Engineering Editorial Desk</span>
                </div>

                {/* Bottom Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-ink">Technical Publications</p>
                    <p className="text-[11px] text-ink-soft">Curated by Senior Engineers</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-navy text-white shrink-0">
                    Verified Notes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. FEATURED ARTICLE SPOTLIGHT */}
        {/* ========================================================================= */}
        {featuredArticle && selectedCategory === 'All' && searchQuery === '' && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber" />
                Editor's Choice Spotlight
              </span>
              <span className="text-xs text-ink-faint">Curated for Tech Practitioners & Students</span>
            </div>

            <article className="group relative bg-white border border-border rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:border-navy/40 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 lg:h-full overflow-hidden relative">
                <ImagePlaceholder
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.title}
                  aspectRatio="video"
                  className="lg:h-full lg:aspect-auto"
                  imgClassName="group-hover:scale-102 transition-transform duration-500"
                >
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <Badge variant="navy" size="md" className="shadow-sm bg-white/95 backdrop-blur-sm">
                      {featuredArticle.category}
                    </Badge>
                  </div>
                </ImagePlaceholder>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs text-ink-faint">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {featuredArticle.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredArticle.readTime}
                    </span>
                  </div>

                  <Link to={`/insights/${featuredArticle.slug}`}>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-ink group-hover:text-navy transition-colors leading-snug">
                      {featuredArticle.title}
                    </h2>
                  </Link>

                  <p className="text-xs sm:text-sm text-ink-soft leading-relaxed line-clamp-3 sm:line-clamp-4">
                    {featuredArticle.excerpt}
                  </p>

                  {/* Key Takeaway Chip */}
                  {featuredArticle.keyTakeaways && featuredArticle.keyTakeaways.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-paper border border-border text-xs text-[#333842] space-y-1.5">
                      <span className="font-semibold text-navy block uppercase text-[10px] tracking-wider">
                        Core Takeaway
                      </span>
                      <p className="line-clamp-2 text-ink-soft leading-relaxed">
                        {featuredArticle.keyTakeaways[0]}
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-border-faint flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {featuredArticle.author.avatarUrl ? (
                      <img
                        src={featuredArticle.author.avatarUrl}
                        alt={featuredArticle.author.name}
                        className="w-8 h-8 rounded-full object-cover border border-border"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center text-xs font-bold">
                        {featuredArticle.author.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <span className="text-xs font-bold text-ink block leading-tight">
                        {featuredArticle.author.name}
                      </span>
                      <span className="text-[11px] text-ink-faint block">
                        {featuredArticle.author.role}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/insights/${featuredArticle.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-navy text-white text-xs font-semibold hover:bg-blue transition-colors shadow-sm"
                  >
                    <span>Read Analysis</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. FILTER TABS & SEARCH BAR */}
        {/* ========================================================================= */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-border shadow-sm mb-10 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const count = categoryCounts[cat] || 0;
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-navy text-white shadow-sm ring-1 ring-navy'
                        : 'bg-paper text-ink-soft border border-border-warm hover:bg-paper-alt hover:text-ink'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-[#EAE5DA] text-ink-soft'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72 shrink-0">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
              <input
                type="text"
                placeholder="Search topics, tags, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-input-border bg-paper text-ink focus:outline-none focus:ring-2 focus:ring-navy focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {(searchQuery || selectedCategory !== 'All') && (
            <div className="pt-3 border-t border-border-faint flex items-center justify-between text-xs text-ink-soft">
              <span>
                Showing <strong>{filteredArticles.length}</strong> {filteredArticles.length === 1 ? 'article' : 'articles'}
                {selectedCategory !== 'All' && <span> in <strong>{selectedCategory}</strong></span>}
                {searchQuery && <span> matching "<strong>{searchQuery}</strong>"</span>}
              </span>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="text-blue font-semibold hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 4. ARTICLES GRID */}
        {/* ========================================================================= */}
        {isLoading && allArticles.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-sm text-ink-soft">
            <Loader2 className="w-6 h-6 animate-spin text-navy" />
            <span>Loading technical publications…</span>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="bg-white border border-border rounded-2xl p-12 text-center space-y-4 max-w-xl mx-auto my-8">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="group bg-white border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-navy/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Article Thumbnail */}
                  <Link to={`/insights/${article.slug}`} className="block">
                    <ImagePlaceholder
                      src={article.coverImage}
                      alt={article.title}
                      aspectRatio="cinema"
                      imgClassName="group-hover:scale-103 transition-transform duration-500"
                    >
                      <div className="absolute top-3 left-3">
                        <Badge variant="blue" size="sm" className="shadow-xs bg-white/95 backdrop-blur-sm">
                          {article.category}
                        </Badge>
                      </div>
                    </ImagePlaceholder>
                  </Link>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-ink-faint">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
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
                            className="text-[10px] px-2 py-0.5 rounded-md bg-paper text-ink-soft border border-border font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Bar with Author & Share */}
                <div className="px-5 sm:px-6 py-4 bg-paper/50 border-t border-border-faint flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {article.author.avatarUrl ? (
                      <img
                        src={article.author.avatarUrl}
                        alt={article.author.name}
                        className="w-6 h-6 rounded-full object-cover border border-border"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-navy text-white flex items-center justify-center text-[10px] font-bold">
                        {article.author.name.charAt(0)}
                      </div>
                    )}
                    <span className="text-xs font-semibold text-[#333842] truncate max-w-[120px]">
                      {article.author.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => handleCopyLink(e, article.slug, article.id)}
                      title="Copy article link"
                      className="p-1.5 rounded-lg text-ink-faint hover:text-navy hover:bg-[#EAE5DA]/50 transition-colors relative"
                    >
                      {copiedId === article.id ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Share2 className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <Link
                      to={`/insights/${article.slug}`}
                      className="text-xs font-bold text-navy group-hover:text-blue inline-flex items-center gap-1"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
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
                      placeholder="Enter your email (e.g. dev@domain.com)"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/15 transition-all"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-blue text-white text-xs font-bold hover:bg-[#4884BD] transition-colors whitespace-nowrap shrink-0 shadow-sm"
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
