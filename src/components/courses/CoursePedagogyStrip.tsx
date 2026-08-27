import React from 'react';
import { GitPullRequest, Cloud, Users, Briefcase } from 'lucide-react';

export const CoursePedagogyStrip: React.FC = () => {
  const pillars = [
    {
      icon: <GitPullRequest className="w-5 h-5 text-blue" />,
      title: 'Production Code Reviews',
      description: 'Every laboratory assignment and project submission receives line-by-line engineering feedback and Git PR approval standards.'
    },
    {
      icon: <Cloud className="w-5 h-5 text-sage" />,
      title: 'Live Cloud Deployments',
      description: 'You will deploy full-stack applications, containerized services, and AI models to live cloud infrastructure with custom domains.'
    },
    {
      icon: <Users className="w-5 h-5 text-navy" />,
      title: '1:12 Intimate Mentorship',
      description: 'Cohorts are strictly limited to 12 students to ensure deep personalized debugging support, code reviews, and project supervision.'
    },
    {
      icon: <Briefcase className="w-5 h-5 text-amber" />,
      title: 'Placement & Career Defense',
      description: 'Benefit from live project presentations, technical mock interviews, resume refinement, and direct hiring partner referrals.'
    }
  ];

  return (
    <section className="my-16 bg-white border border-border rounded-3xl p-6 sm:p-10 shadow-xs">
      <div className="max-w-3xl mb-8 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-blue">
          Pedagogical Excellence
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
          How Navya Courses are Structured Differently
        </h2>
        <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
          We don't teach passive slides. Our curriculum mirrors modern software product teams with agile sprints, code reviews, and live production deliverables.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-paper border border-border space-y-3 hover:border-navy/30 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center shadow-xs">
              {pillar.icon}
            </div>
            <h3 className="text-sm font-bold text-ink leading-snug">
              {pillar.title}
            </h3>
            <p className="text-xs text-ink-soft leading-relaxed">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
