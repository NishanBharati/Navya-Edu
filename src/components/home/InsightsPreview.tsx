import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, BookOpen } from 'lucide-react';
import type { InsightArticle } from '../../types';
import { INSIGHTS } from '../../data/insights';
import { useSupabaseTable } from '../../lib/useSupabaseTable';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';
import { Badge } from '../common/Badge';
import { ImagePlaceholder } from '../common/ImagePlaceholder';
import { Reveal, Stagger, StaggerItem } from '../motion/Reveal';

export const InsightsPreview: React.FC = () => {
  const { items: dbInsights, isLoading } = useSupabaseTable<InsightArticle>('insights', { orderBy: 'createdAt' });
  const allArticles = useMemo(() => {
    if (dbInsights && dbInsights.length > 0) return dbInsights;
    return INSIGHTS;
  }, [dbInsights]);
  const latestInsights = allArticles.slice(0, 3);

  return (
    <section className="section-y bg-paper-alt border-y border-border-soft">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
          <SectionHeader
            eyebrow="Editorial & Analysis"
            title="Latest Technical Insights"
            description="Observations on the Nepali IT ecosystem, software architecture paradigms, and practical advice for modern developers."
          />
          <Reveal className="shrink-0">
            <Link to="/insights" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
              <span className="link-underline">Browse All Articles</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-240 ease-out group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" aria-busy="true" aria-label="Loading insights">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-2xl border border-border bg-white overflow-hidden">
                <div className="skeleton aspect-video" />
                <div className="p-6 space-y-3">
                  <div className="skeleton h-4 w-24 rounded-md" />
                  <div className="skeleton h-5 w-11/12 rounded-md" />
                  <div className="skeleton h-4 w-full rounded-md" />
                  <div className="skeleton h-4 w-2/3 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {latestInsights.map((article) => (
              <StaggerItem key={article.id} className="h-full">
                <Link
                  to={`/insights/${article.slug}`}
                  className="group flex flex-col justify-between bg-white border border-border rounded-2xl overflow-hidden hover:border-navy/25 hover:shadow-lg hover:-translate-y-0.5 transition-[border-color,box-shadow,translate] duration-300 ease-out h-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
                >
                  <div>
                    <div className="relative overflow-hidden bg-paper-alt border-b border-border">
                      <ImagePlaceholder
                        src={article.coverImage}
                        alt={article.title}
                        aspectRatio="cinema"
                        imgClassName="group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                        sizes="(min-width: 768px) 33vw, 100vw"
                      />
                      {/* Floating read preview badge on hover */}
                      <div className="absolute top-3 right-3 z-10 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-[opacity,translate] duration-240 ease-out">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-navy-dark/90 text-white text-xs font-mono font-semibold backdrop-blur-md shadow-sm">
                          <BookOpen className="w-3.5 h-3.5 text-blue-light" />
                          <span>Read Article</span>
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>

                    <div className="p-6 space-y-3.5">
                      <div className="flex items-center gap-2">
                        <Badge variant="blue" size="sm" className="shadow-2xs">
                          {article.category}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-ink-muted font-mono">
                          <Clock className="w-3 h-3 text-blue" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold tracking-[-0.02em] text-ink group-hover:text-navy transition-colors duration-180 leading-snug">
                        {article.title}
                      </h3>

                      <p className="text-sm text-ink-muted leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 py-4 border-t border-border-soft flex items-center justify-between">
                    <span className="text-xs font-mono text-ink-muted">{article.date}</span>
                    <span className="text-[13px] font-semibold text-navy inline-flex items-center gap-1.5">
                      <span>Read Full Insight</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-240 ease-out group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </Container>
    </section>
  );
};
