import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  CheckCircle2,
  Copy,
  BookOpen,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Tag,
  GraduationCap,
  MessageSquare,
  ShieldCheck,
  ChevronLeft,
  Eye,
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import type { InsightArticle } from '../types';
import { INSIGHTS } from '../data/insights';
import { COURSES } from '../data/courses';
import { Container } from '../components/common/Container';
import { Badge } from '../components/common/Badge';
import { SITE_URL } from '../config/site';
import { Button } from '../components/common/Button';
import { SEOHead } from '../components/common/SEOHead';
import { getArticleSchema, getBreadcrumbSchema } from '../utils/structuredData';
import { AdvisorModal } from '../components/common/AdvisorModal';
import { ImagePlaceholder } from '../components/common/ImagePlaceholder';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { isRealPhoto } from '../lib/media';

export const BlogDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get('preview') === 'true';

  const initialArticle = slug ? (INSIGHTS.find((item) => item.slug === slug) ?? null) : null;
  const [article, setArticle] = useState<InsightArticle | null>(initialArticle);
  const [isLoading, setIsLoading] = useState(!initialArticle);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);

  // Load article from Supabase with fallback to local INSIGHTS
  useEffect(() => {
    let isActive = true;

    async function loadArticle() {
      try {
        const { data, error } = await supabase
          .from('insights')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (!isActive) return;

        if (data && !error) {
          setArticle(data as InsightArticle);
        } else {
          // Fallback to local INSIGHTS
          const matched = INSIGHTS.find((item) => item.slug === slug) ?? null;
          setArticle(matched);
        }
      } catch {
        if (!isActive) return;
        const matched = INSIGHTS.find((item) => item.slug === slug) ?? null;
        setArticle(matched);
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadArticle();

    return () => {
      isActive = false;
    };
  }, [slug]);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const currentProgress = (totalScroll / windowHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Related Course matching
  const relatedCourse = useMemo(() => {
    if (!article) return null;
    if (article.relatedCourseSlug) {
      const found = COURSES.find((c) => c.slug === article.relatedCourseSlug);
      if (found) return found;
    }
    // Fallback matching by category keywords
    if (article.category === 'Web Development') {
      return COURSES.find((c) => c.slug === 'web-development');
    }
    if (article.category === 'AI') {
      return COURSES.find((c) => c.slug === 'data-science' || c.slug === 'python-advance');
    }
    if (article.category === 'Programming' || article.category === 'Technology') {
      return COURSES.find((c) => c.slug === 'python-beginner');
    }
    return COURSES[0];
  }, [article]);

  // Next and Previous articles
  const { prevArticle, nextArticle, relatedArticles } = useMemo(() => {
    const currentIndex = INSIGHTS.findIndex((a) => a.slug === slug);
    const prev = currentIndex > 0 ? INSIGHTS[currentIndex - 1] : null;
    const next = currentIndex >= 0 && currentIndex < INSIGHTS.length - 1 ? INSIGHTS[currentIndex + 1] : null;
    const others = INSIGHTS.filter((a) => a.slug !== slug).slice(0, 3);
    return { prevArticle: prev, nextArticle: next, relatedArticles: others };
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen py-24 bg-paper flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-navy border-t-transparent animate-spin" />
        <span className="text-xs font-semibold text-ink-soft uppercase tracking-wider">
          Loading Publication…
        </span>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="min-h-screen py-16 sm:py-24 bg-paper">
        <SEOHead
          title="Article Not Found | Navya Ed Tech"
          description="The requested publication could not be located in our insights archive."
          noindex={true}
        />
        <Container size="narrow">
          <Breadcrumbs
            className="mb-6"
            items={[
              { label: 'Insights', href: '/insights' },
              { label: 'Article Not Found' },
            ]}
          />
          <div className="text-center space-y-5 bg-white p-8 sm:p-12 rounded-2xl border border-border shadow-xs">
            <div className="w-14 h-14 rounded-full bg-navy/5 text-navy mx-auto flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink">
              Article Not Found
            </h1>
            <p className="text-sm text-ink-muted max-w-md mx-auto leading-relaxed">
              The article "{slug}" could not be located. It may have been updated, renamed, or archived.
            </p>
            <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
              <Button variant="primary" href="/insights">
                Browse All Insights
              </Button>
              <Button variant="secondary" href="/courses">
                Explore Courses
              </Button>
            </div>
          </div>
        </Container>
      </main>
    );
  }

  if (article.status === 'draft' && !isPreview) {
    return (
      <main className="min-h-screen py-16 sm:py-24 bg-paper">
        <Container size="narrow">
          <Breadcrumbs
            className="mb-6"
            items={[
              { label: 'Insights', href: '/insights' },
              { label: 'Draft Publication' },
            ]}
          />
          <div className="text-center space-y-5 bg-white p-8 sm:p-12 rounded-2xl border border-border shadow-xs">
            <div className="w-14 h-14 rounded-full bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-ink">
              Draft Publication
            </h1>
            <p className="text-sm text-ink-muted max-w-md mx-auto leading-relaxed">
              "{article.title}" is currently saved as an editorial draft and has not been published yet.
            </p>
            <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
              <Button variant="primary" href="/insights">
                Browse Published Insights
              </Button>
              <Button variant="outline" href="/admin/insights">
                Admin Console
              </Button>
            </div>
          </div>
        </Container>
      </main>
    );
  }

  const shareTitle = encodeURIComponent(article.title);
  const shareUrl = encodeURIComponent(typeof window !== 'undefined' ? window.location.href : `${SITE_URL}/insights/${slug}`);

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Insights', path: '/insights' },
    { name: article.title, path: `/insights/${article.slug}` },
  ];

  return (
    <main className="min-h-screen pb-20 bg-paper text-ink">
      {isPreview && (
        <div className="bg-amber-500 text-white px-4 py-2.5 text-xs font-semibold flex items-center justify-between shadow-md sticky top-0 z-50">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
            <Eye className="w-4 h-4 shrink-0" />
            <span>
              <strong>Editorial Preview Mode:</strong> You are previewing an unreleased article draft ({article.status || 'draft'}). This is not accessible to public readers.
            </span>
            <Link
              to="/admin/insights"
              className="ml-auto underline font-bold hover:text-amber-100 shrink-0"
            >
              Back to Admin
            </Link>
          </div>
        </div>
      )}
      <SEOHead
        title={article.seoTitle ? `${article.seoTitle} | Navya Ed Tech` : `${article.title} | Navya Ed Tech Insights`}
        description={article.seoDescription || article.excerpt}
        keywords={`${article.category}, IT insights Nepal, ${article.tags?.join(', ') || 'software engineering Kathmandu'}`}
        ogType="article"
        ogImage={article.coverImage}
        canonicalUrl={`${SITE_URL}/insights/${article.slug}`}
        noindex={isPreview}
        structuredData={[
          getArticleSchema(article),
          getBreadcrumbSchema(breadcrumbs),
        ]}
      />

      {/* Reading Progress Indicator Bar */}
      <div
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Article reading progress"
        className="fixed top-0 left-0 w-full h-1 bg-transparent z-50 pointer-events-none"
      >
        <div
          className="h-full bg-blue transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ========================================================================= */}
      {/* 1. BREADCRUMBS & TOP NAV */}
      {/* ========================================================================= */}
      <div className="border-b border-border bg-white/90 backdrop-blur-sm sticky top-20 z-30">
        <Container className="py-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 min-w-0 max-w-full">
            <div className="min-w-0 max-w-full overflow-hidden">
              <Breadcrumbs
                items={[
                  { label: 'Insights', href: '/insights' },
                  { label: article.category, href: '/insights' },
                  { label: article.title },
                ]}
              />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleCopyLink}
                aria-label="Copy article link to clipboard"
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border border-input-border bg-white text-xs font-semibold text-ink hover:bg-paper-alt transition-colors cursor-pointer"
                title="Copy article link"
              >
                {isCopied ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-ink-muted" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </Container>
      </div>

      <Container className="pt-8 sm:pt-12">
        <article className="space-y-8">
          {/* ========================================================================= */}
          {/* 2. ARTICLE HEADER & META */}
          {/* ========================================================================= */}
          <header className="space-y-5">
            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              <Badge variant="navy" size="md">
                {article.category}
              </Badge>
              <span className="inline-flex items-center gap-1 text-ink-faint">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readTime}</span>
              </span>
              <span className="text-mist">•</span>
              <span className="inline-flex items-center gap-1 text-ink-faint">
                <Calendar className="w-3.5 h-3.5" />
                <span>{article.date}</span>
              </span>
              <span className="text-mist">•</span>
              <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Tech Review</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold tracking-tight text-ink leading-[1.2]">
              {article.title}
            </h1>

            {article.subtitle && (
              <p className="text-base sm:text-lg text-ink-soft leading-relaxed">
                {article.subtitle}
              </p>
            )}

            {/* Author Profile Strip */}
            <div className="flex items-center justify-between py-4 border-y border-border bg-white px-4 sm:px-6 rounded-2xl">
              <div className="flex items-center gap-3">
                {isRealPhoto(article.author.avatarUrl) ? (
                  <img
                    src={article.author.avatarUrl}
                    alt={article.author.name}
                    width="40"
                    height="40"
                    loading="lazy"
                    decoding="async"
                    className="w-10 h-10 rounded-full object-cover border border-border"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-navy text-white flex items-center justify-center text-sm font-bold">
                    {article.author.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-ink">{article.author.name}</span>
                  </div>
                  <span className="text-xs text-ink-faint block">{article.author.role}</span>
                </div>
              </div>

              {/* Share Triggers */}
              <div className="flex items-center gap-1.5">
                <a
                  href={`https://api.whatsapp.com/send?text=${shareTitle}%20${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on WhatsApp"
                  className="p-2 rounded-lg border border-border-warm text-ink-soft hover:text-[#25D366] hover:border-[#25D366]/40 hover:bg-[#25D366]/5 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  className="p-2 rounded-lg border border-border-warm text-ink-soft hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/5 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </a>
              </div>
            </div>
          </header>

          {/* ========================================================================= */}
          {/* 3. COVER IMAGE */}
          {/* ========================================================================= */}
          <ImagePlaceholder
            src={article.coverImage}
            alt={article.title}
            aspectRatio="cinema"
            priority
            className="rounded-2xl sm:rounded-3xl border border-[#E0DACF] shadow-sm"
          />

          {/* ========================================================================= */}
          {/* 4. KEY TAKEAWAYS / EXECUTIVE SUMMARY */}
          {/* ========================================================================= */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <section className="p-6 sm:p-8 rounded-2xl bg-navy/5 border border-navy/15 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy">
                <Sparkles className="w-4 h-4 text-amber" />
                <span>Executive Summary & Key Takeaways</span>
              </div>
              <ul className="space-y-2.5">
                {article.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#333842] leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* ========================================================================= */}
          {/* 4.5 TABLE OF CONTENTS (When multiple section headings exist) */}
          {/* ========================================================================= */}
          {(() => {
            const headings = article.content
              .filter((b) => b.startsWith('## '))
              .map((b) => b.replace('## ', ''));

            if (headings.length < 2) return null;

            return (
              <nav aria-label="Table of contents" className="p-5 sm:p-6 rounded-2xl bg-paper-alt border border-border-warm space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-navy uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-blue" />
                  <span>Table of Contents</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm">
                  {headings.map((heading, hIdx) => {
                    const anchor = heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    return (
                      <li key={hIdx} className="flex items-center gap-2">
                        <ChevronRight className="w-3.5 h-3.5 text-blue shrink-0" />
                        <a
                          href={`#${anchor}`}
                          className="text-navy hover:text-blue hover:underline font-medium transition-colors"
                        >
                          {heading}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            );
          })()}

          {/* ========================================================================= */}
          {/* 5. ARTICLE BODY CONTENT */}
          {/* ========================================================================= */}
          <div className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-border shadow-sm space-y-6">
            {article.content.map((block, idx) => {
              // Section Subheadings with Anchors
              if (block.startsWith('## ')) {
                const headingText = block.replace('## ', '');
                const anchor = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                return (
                  <h2
                    id={anchor}
                    key={idx}
                    className="text-xl sm:text-2xl font-extrabold tracking-tight text-ink pt-6 pb-2 border-b border-border-faint scroll-mt-28 first:pt-0"
                  >
                    {headingText}
                  </h2>
                );
              }

              // Code Blocks (```lang ... ```)
              if (block.startsWith('```') && block.endsWith('```')) {
                const lines = block.split('\n');
                const lang = lines[0].replace('```', '').trim() || 'code';
                const codeContent = lines.slice(1, -1).join('\n');
                return (
                  <div key={idx} className="my-4 rounded-xl overflow-hidden border border-navy/20 bg-[#0F172A] text-slate-100 font-mono text-xs shadow-sm">
                    <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs text-slate-400 uppercase tracking-wider flex justify-between items-center">
                      <span>{lang}</span>
                      <span className="text-xs text-slate-500">Source Snippet</span>
                    </div>
                    <pre className="p-4 overflow-x-auto leading-relaxed">
                      <code>{codeContent}</code>
                    </pre>
                  </div>
                );
              }

              // Bullet lists
              if (block.includes('• ')) {
                const items = block.split('\n').filter(Boolean);
                return (
                  <ul key={idx} className="space-y-2.5 my-3 pl-2">
                    {items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#333842] leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-navy mt-2 shrink-0" />
                        <span>{item.replace('• ', '')}</span>
                      </li>
                    ))}
                  </ul>
                );
              }

              // Normal paragraphs
              return (
                <p key={idx} className="text-sm sm:text-base text-[#333842] leading-relaxed font-normal">
                  {block}
                </p>
              );
            })}

            {/* Author Bio Box */}
            {article.author.bio && (
              <div className="mt-8 pt-6 border-t border-border-faint flex items-start gap-4">
                {isRealPhoto(article.author.avatarUrl) ? (
                  <img
                    src={article.author.avatarUrl}
                    alt={article.author.name}
                    width="48"
                    height="48"
                    loading="lazy"
                    decoding="async"
                    className="w-12 h-12 rounded-full object-cover border border-border shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-navy text-white flex items-center justify-center text-sm font-bold shrink-0">
                    {article.author.name.charAt(0)}
                  </div>
                )}
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-sm text-ink block">{article.author.name}</span>
                  <p className="text-ink-soft leading-relaxed">{article.author.bio}</p>
                </div>
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* 6. TAGS & ARTICLE FOOTER */}
          {/* ========================================================================= */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-border">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-ink-faint flex items-center gap-1 mr-1">
                <Tag className="w-3.5 h-3.5" />
                Tags:
              </span>
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3 py-1 rounded-lg bg-white border border-border-warm text-navy font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={handleCopyLink}
              className="text-xs font-semibold text-navy hover:text-blue inline-flex items-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{isCopied ? 'Link Copied to Clipboard' : 'Share this Analysis'}</span>
            </button>
          </div>

          {/* ========================================================================= */}
          {/* 7. MATCHING COURSE / CURRICULUM BRIDGE */}
          {/* ========================================================================= */}
          {relatedCourse && (
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-navy to-[#122438] text-white space-y-4 shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#A8C6E5]">
                <GraduationCap className="w-4 h-4" />
                <span>Associated Project Track & Curriculum</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Learn {relatedCourse.title} through Hands-On Engineering Sprints
              </h2>
              <p className="text-xs sm:text-sm text-mist leading-relaxed max-w-2xl">
                Master the practical architectures discussed in this article. Build verified full-stack applications with senior code reviews and live mentorship in Kathmandu.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Button
                  variant="secondary"
                  size="md"
                  href={`/courses/${relatedCourse.slug}`}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  View Course Syllabus & Batches
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setIsAdvisorOpen(true)}
                  className="!border-white/30 !text-white hover:!bg-white/10"
                >
                  Ask Course Advisor
                </Button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 8. PREVIOUS & NEXT ARTICLE NAVIGATION */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {prevArticle ? (
              <Link
                to={`/insights/${prevArticle.slug}`}
                className="group p-5 rounded-2xl bg-white border border-border hover:border-navy/40 transition-all flex flex-col justify-between space-y-2"
              >
                <span className="text-xs font-bold text-ink-faint uppercase tracking-wider flex items-center gap-1">
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Previous Article
                </span>
                <span className="text-sm font-bold text-ink group-hover:text-navy line-clamp-2">
                  {prevArticle.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextArticle && (
              <Link
                to={`/insights/${nextArticle.slug}`}
                className="group p-5 rounded-2xl bg-white border border-border hover:border-navy/40 transition-all flex flex-col justify-between space-y-2 text-right sm:text-right"
              >
                <span className="text-xs font-bold text-ink-faint uppercase tracking-wider flex items-center justify-end gap-1">
                  Next Article
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-sm font-bold text-ink group-hover:text-navy line-clamp-2">
                  {nextArticle.title}
                </span>
              </Link>
            )}
          </div>

          {/* ========================================================================= */}
          {/* 9. RELATED ARTICLES GRID */}
          {/* ========================================================================= */}
          <section className="pt-10 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-extrabold text-ink">
                More Technical Insights
              </h2>
              <Link
                to="/insights"
                className="text-xs font-bold text-navy hover:text-blue inline-flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/insights/${rel.slug}`}
                  className="group bg-white border border-border rounded-2xl overflow-hidden shadow-xs hover:border-navy/40 transition-all flex flex-col justify-between"
                >
                  <ImagePlaceholder
                    src={rel.coverImage}
                    alt={rel.title}
                    aspectRatio="video"
                    imgClassName="group-hover:scale-103 transition-transform duration-300"
                  />
                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-ink-faint">
                      <Badge variant="neutral" size="sm">
                        {rel.category}
                      </Badge>
                      <span>{rel.readTime}</span>
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-ink group-hover:text-navy line-clamp-2 leading-snug">
                      {rel.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </article>
      </Container>

      {/* Academic Advisor Modal */}
      <AdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        defaultCourseSlug={relatedCourse?.slug}
      />
    </main>
  );
};
