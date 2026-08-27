import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Loader2 } from 'lucide-react';
import type { InsightArticle } from '../../types';
import { INSIGHTS } from '../../data/insights';
import { useSupabaseTable } from '../../lib/useSupabaseTable';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';
import { Badge } from '../common/Badge';
import { ImagePlaceholder } from '../common/ImagePlaceholder';

export const InsightsPreview: React.FC = () => {
  const { items: dbInsights, isLoading } = useSupabaseTable<InsightArticle>('insights', { orderBy: 'createdAt' });
  const allArticles = useMemo(() => {
    if (dbInsights && dbInsights.length > 0) return dbInsights;
    return INSIGHTS;
  }, [dbInsights]);
  const latestInsights = allArticles.slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-paper border-b border-border-soft">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10">
          <SectionHeader
            eyebrow="Editorial & Analysis"
            title="Latest Technical Insights"
            description="Observations on the Nepali IT ecosystem, software architecture paradigms, and practical advice for modern developers."
          />
          <div className="shrink-0">
            <Link
              to="/insights"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-blue transition-colors"
            >
              <span>Browse All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-sm text-ink-soft">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading insights…
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {latestInsights.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col justify-between bg-white border border-border rounded-xl overflow-hidden hover:border-navy/40 transition-colors"
            >
              <div>
                <Link to={`/insights/${article.slug}`} className="block">
                  <ImagePlaceholder
                    src={article.coverImage}
                    alt={article.title}
                    aspectRatio="cinema"
                    imgClassName="group-hover:scale-102 transition-transform duration-300"
                  />
                </Link>

                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="blue" size="sm">
                      {article.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-[11px] text-ink-faint">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <Link to={`/insights/${article.slug}`}>
                    <h3 className="text-base sm:text-lg font-bold text-ink group-hover:text-navy transition-colors leading-snug">
                      {article.title}
                    </h3>
                  </Link>

                  <p className="text-xs sm:text-sm text-ink-soft leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 sm:px-6 pb-5 pt-2 border-t border-border-faint flex items-center justify-between">
                <span className="text-xs text-ink-faint">{article.date}</span>
                <Link
                  to={`/insights/${article.slug}`}
                  className="text-xs font-semibold text-navy group-hover:text-blue inline-flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
        )}
      </Container>
    </section>
  );
};
