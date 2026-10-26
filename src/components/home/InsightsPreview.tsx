import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Clock, Loader2, BookOpen } from 'lucide-react';
import type { InsightArticle } from '../../types';
import { INSIGHTS } from '../../data/insights';
import { useSupabaseTable } from '../../lib/useSupabaseTable';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';
import { Badge } from '../common/Badge';
import { ImagePlaceholder } from '../common/ImagePlaceholder';
import { fadeUp, staggerContainer } from '../../lib/motion';

export const InsightsPreview: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
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
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-blue transition-colors group"
            >
              <span>Browse All Articles</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-sm text-ink-soft">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading insights…
          </div>
        ) : (
          <motion.div
            variants={prefersReducedMotion ? undefined : staggerContainer(0.08, 0.04)}
            initial={prefersReducedMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          >
            {latestInsights.map((article) => (
              <motion.div
                key={article.id}
                variants={prefersReducedMotion ? undefined : fadeUp}
                className="h-full"
              >
                <Link
                  to={`/insights/${article.slug}`}
                  className="group flex flex-col justify-between bg-white border border-border rounded-2xl overflow-hidden hover:border-navy/40 hover:shadow-2xl hover:shadow-navy/10 transform-gpu hover:-translate-y-1.5 transition-all duration-300 h-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
                >
                  <div>
                    <div className="relative overflow-hidden bg-paper-alt border-b border-border">
                      <ImagePlaceholder
                        src={article.coverImage}
                        alt={article.title}
                        aspectRatio="cinema"
                        imgClassName="group-hover:scale-106 transition-transform duration-500 ease-out"
                      />
                      {/* Floating read preview badge on hover */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
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

                      <h3 className="text-base sm:text-lg font-bold text-ink group-hover:text-navy transition-colors leading-snug">
                        {article.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-ink-soft leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-5 pt-3.5 border-t border-border-faint flex items-center justify-between bg-paper-alt/40 group-hover:bg-paper-alt/80 transition-colors">
                    <span className="text-xs font-mono text-ink-muted">{article.date}</span>
                    <span
                      className="text-xs font-bold text-navy group-hover:text-blue inline-flex items-center gap-1.5 transition-colors group/link"
                    >
                      <span>Read Full Insight</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </Container>
    </section>
  );
};
