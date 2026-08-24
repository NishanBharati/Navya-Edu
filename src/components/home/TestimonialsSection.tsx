import React from 'react';
import { Quote, Star, CheckCircle2, Building2, GraduationCap } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  track: string;
  quote: string;
  avatar: string;
}

export const TestimonialsSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: 'Suman Gautam',
      role: 'Full Stack Engineer',
      company: 'Fintech Solutions Nepal',
      track: 'Full Stack Engineering Fellowship',
      quote:
        'The difference at Navya was the code reviews. Instead of just "it works," the mentors showed us how to normalize schemas, prevent SQL leaks, and use TypeScript interfaces properly. When I did my tech interview, the questions were exactly what we practiced in class.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Pratima Thapa',
      role: 'Frontend Developer',
      company: 'CloudBridge Technologies',
      track: 'React & Modern Frontend Track',
      quote:
        'Coming from a non-CS background, I was intimidated by state management and build tooling. The instructors broke down Next.js, Tailwind, and Git workflows step-by-step. My live capstone on Vercel was the main reason I got hired.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
    },
    {
      name: 'Aayush Shrestha',
      role: 'Associate Data Analyst',
      company: 'Digital Analytics Hub',
      track: 'Applied Data Science & Machine Learning',
      quote:
        'We worked on real Nepali datasets like Kalimati market prices and macroeconomic trends. Building FastAPI microservices to serve machine learning predictions gave me practical confidence that textbooks never provided.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAFAF8] border-b border-[#EFECE5]">
      <Container>
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#356A9A]">
            Alumni Outcomes
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#171A1F]">
            From Classroom Labs to Production Software Teams
          </h2>
          <p className="text-sm sm:text-base text-[#5F6670] leading-relaxed">
            Read how our graduates leveraged verifiable capstones, continuous code reviews, and structured career support to transition into engineering roles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-3xl border border-[#E8E4DA] shadow-xs flex flex-col justify-between space-y-6 hover:border-[#17324D]/30 transition-all"
            >
              <div className="space-y-4">
                {/* Track Badge & Stars */}
                <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
                  <span className="text-[10px] font-mono font-bold text-[#356A9A] uppercase tracking-wider">
                    {item.track}
                  </span>
                  <div className="flex items-center gap-0.5 text-[#D97706]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-[#5F6670] leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Profile Meta */}
              <div className="pt-4 border-t border-[#F0ECE1] flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border border-[#E5DFD4]"
                />
                <div>
                  <h3 className="text-sm font-bold text-[#171A1F] flex items-center gap-1.5">
                    <span>{item.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#718C7A]" />
                  </h3>
                  <p className="text-xs text-[#5F6670]">
                    {item.role} • <strong className="text-[#17324D]">{item.company}</strong>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
