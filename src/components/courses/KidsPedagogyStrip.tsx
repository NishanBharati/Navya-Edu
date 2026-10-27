import React from 'react';
import { ShieldCheck, HeartHandshake, Gamepad2, Brain } from 'lucide-react';

export const KidsPedagogyStrip: React.FC = () => {
  const pillars = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-sage" />,
      title: 'Safe & Supervised Online Classes',
      description: 'Small, supportive live online classes with a mentor watching every screen, and parents welcome to sit in from home.'
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-blue" />,
      title: '1:8 Mentor Attention',
      description: 'Extra-small batches so every child receives immediate patience, encouragement, and personalized one-on-one debugging assistance.'
    },
    {
      icon: <Gamepad2 className="w-5 h-5 text-amber-600" />,
      title: 'Active Screen Time',
      description: 'Shifts children from passive video consumption into active creators who design playable games, animations, and interactive stories.'
    },
    {
      icon: <Brain className="w-5 h-5 text-purple-600" />,
      title: 'Path to Text Coding',
      description: 'Builds computational sequencing, coordinate geometry, and logical thinking that make transitioning to Python effortless.'
    }
  ];

  return (
    <section className="my-16 bg-white border border-border rounded-3xl p-6 sm:p-10 shadow-xs">
      <div className="max-w-3xl mb-8 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
          Young Coders Philosophy
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
          How We Make Coding Fun, Safe & Rewarding for Kids
        </h2>
        <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
          We combine MIT-developed visual programming tools with small-cohort mentorship so every child discovers the joy of building their own software.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-paper border border-border space-y-3 hover:border-amber-500/30 transition-colors"
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
