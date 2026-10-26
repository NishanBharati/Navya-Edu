import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Terminal, ShieldCheck, CheckCircle2, ArrowRight, ExternalLink, Code2, Cloud, Quote, Star } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { VERIFIED_CAPSTONES, TESTIMONIAL_POLICY, TESTIMONIALS } from '../../data/testimonials';
import type { Testimonial } from '../../types';
import { useSupabaseTable } from '../../lib/useSupabaseTable';
import { Link } from 'react-router-dom';
import { fadeUp, staggerContainer } from '../../lib/motion';

export const TestimonialsSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const { items: dbTestimonials } = useSupabaseTable<Testimonial>('testimonials');

  const approvedTestimonials = useMemo(() => {
    const list = dbTestimonials && dbTestimonials.length > 0 ? dbTestimonials : TESTIMONIALS;
    return list.filter((t) => t.status === 'Approved' && t.consentConfirmed);
  }, [dbTestimonials]);
  return (
    <section className="py-16 sm:py-24 bg-paper border-b border-border-soft">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/5 border border-navy/15 text-xs font-semibold text-navy uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5 text-blue" />
            <span>Curriculum Capstone Benchmarks</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-ink">
            Authentic Reference Systems Engineered at Navya
          </h2>
          <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
            Instead of artificial testimonials or manufactured ratings, we showcase actual code: production-grade capstone applications built under rigorous mentor pull request reviews.
          </p>
        </div>

        {/* Verified Student Reflections */}
        {approvedTestimonials.length > 0 && (
          <div className="mb-14">
            <div className="text-center max-w-xl mx-auto mb-8 space-y-1.5">
              <span className="text-xs font-bold text-navy uppercase tracking-wider">
                Graduate Retrospectives & Career Outcomes
              </span>
              <p className="text-xs text-ink-muted">
                Published with explicit written consent following capstone defense and verified employment.
              </p>
            </div>
            <motion.div
              variants={prefersReducedMotion ? undefined : staggerContainer(0.08, 0.04)}
              initial={prefersReducedMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {approvedTestimonials.map((testimonial) => (
                <motion.div
                  key={testimonial.id}
                  variants={prefersReducedMotion ? undefined : fadeUp}
                  className="bg-white p-6 rounded-2xl border border-border shadow-xs hover:border-navy/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                        Consent Verified
                      </span>
                    </div>
                    <div className="relative">
                      <Quote className="w-6 h-6 text-navy/10 absolute -top-2 -left-1" />
                      <p className="text-xs sm:text-sm text-ink-soft leading-relaxed italic relative z-10 pt-1">
                        "{testimonial.quote}"
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border-faint flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full bg-navy text-white flex items-center justify-center text-xs font-bold shrink-0">
                      {testimonial.studentName.slice(0, 2).toUpperCase()}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-ink truncate">{testimonial.studentName}</p>
                      <p className="text-[11px] text-ink-muted truncate">
                        {testimonial.role ? `${testimonial.role}${testimonial.company ? ` at ${testimonial.company}` : ''}` : testimonial.cohortOrCourse}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* Capstones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {VERIFIED_CAPSTONES.map((capstone) => (
            <div
              key={capstone.id}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-border shadow-xs hover:border-navy/40 hover:shadow-md transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 border-b border-border-faint pb-3">
                  <span className="text-[11px] font-bold text-navy uppercase tracking-wider px-2.5 py-1 rounded-md bg-navy/10">
                    {capstone.deliverableType}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-medium text-sage-ink bg-sage/10 px-2 py-0.5 rounded">
                    <Cloud className="w-3 h-3" />
                    <span>{capstone.demoHost}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-blue uppercase tracking-wider block">
                    {capstone.courseName}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-ink leading-snug">
                    {capstone.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                  {capstone.description}
                </p>

                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-ink-faint block">
                    Demonstrated Competencies:
                  </span>
                  <ul className="space-y-1.5 text-xs text-ink-soft">
                    {capstone.keyCompetencies.map((comp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sage shrink-0 mt-0.5" />
                        <span className="leading-snug">{comp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-border-faint space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {capstone.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-paper text-navy text-[11px] font-mono font-medium border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <Link
                    to={`/courses/${capstone.courseSlug}`}
                    className="inline-flex items-center gap-1 font-bold text-navy hover:text-blue transition-colors"
                  >
                    <span>View Course Track</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    to="/student-work"
                    className="text-ink-faint hover:text-ink transition-colors flex items-center gap-1 text-[11px]"
                  >
                    <span>Full Showcase</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Transparent Institutional Feedback Policy Notice */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-border max-w-3xl mx-auto shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-border-faint pb-3">
            <div className="p-2 rounded-xl bg-navy/5 text-navy">
              <ShieldCheck className="w-5 h-5 text-blue" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-ink">
                {TESTIMONIAL_POLICY.policyHeadline}
              </h4>
              <p className="text-xs text-ink-faint">Standard of Integrity & Transparency</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
            {TESTIMONIAL_POLICY.statement}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-[11px] text-ink-soft">
            {TESTIMONIAL_POLICY.verificationProcess.map((item, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-paper border border-border-soft flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-navy text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 text-center">
            <Button variant="outline" size="sm" href="/student-work">
              Explore All Verified Student Projects
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};
