import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, BookOpen, Loader2 } from 'lucide-react';
import type { InsightArticle } from '../../types';
import { useSupabaseTable } from '../../lib/useSupabaseTable';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';
import { Badge } from '../common/Badge';

export const InsightsPreview: React.FC = () => {
  const { items: insights, isLoading } = useSupabaseTable<InsightArticle>('insights', { orderBy: 'createdAt' });
  const latestInsights = insights.slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-[#FAFAF8] border-b border-[#EFECE5]">
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
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#17324D] hover:text-[#356A9A] transition-colors"
            >
              <span>Browse All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-sm text-[#5F6670]">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading insights…
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {latestInsights.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col justify-between bg-white border border-[#E8E4DA] rounded-xl overflow-hidden hover:border-[#17324D]/40 transition-colors"
            >
              <div>
                <Link to={`/insights/${article.slug}`} className="block aspect-[16/9] overflow-hidden bg-[#F4F1EA]">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                </Link>

                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="blue" size="sm">
                      {article.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-[11px] text-[#8C939E]">
                      <Clock className="w-3 h-3" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <Link to={`/insights/${article.slug}`}>
                    <h3 className="text-base sm:text-lg font-bold text-[#171A1F] group-hover:text-[#17324D] transition-colors leading-snug">
                      {article.title}
                    </h3>
                  </Link>

                  <p className="text-xs sm:text-sm text-[#5F6670] leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-5 sm:px-6 pb-5 pt-2 border-t border-[#F0ECE1] flex items-center justify-between">
                <span className="text-xs text-[#8C939E]">{article.date}</span>
                <Link
                  to={`/insights/${article.slug}`}
                  className="text-xs font-semibold text-[#17324D] group-hover:text-[#356A9A] inline-flex items-center gap-1"
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
