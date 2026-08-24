import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, Mail, Clock } from 'lucide-react';
import { FOOTER_LINKS } from '../../data/navigation';
import { Container } from '../common/Container';
import { Logo } from '../common/Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#17324D] text-[#E5DFD4] pt-16 pb-12 border-t border-[#12283E]">
      <Container>
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Brand & Parent Company Connection */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block group focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg p-0.5" aria-label="Navya Ed Tech Home">
              <Logo
                variant="dark"
                size="md"
                subtitle="Technology Education Division"
              />
            </Link>

            <p className="text-sm text-[#C4CDD5] leading-relaxed max-w-md">
              Learn technology from a company that actually builds technology. Practical, project-driven IT training bridging academic theory and modern commercial software engineering in Nepal.
            </p>

            <div className="pt-2">
              <a
                href="https://navyaedtech.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors border border-white/10"
              >
                <span>Official Parent Company: navyaedtech.com</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#9BBAD4]" />
              </a>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#9BBAD4]">
              <ShieldCheck className="w-4 h-4 text-[#718C7A]" />
              <span>Registered IT Education & Training Provider in Nepal</span>
            </div>
          </div>

          {/* Col 3: Popular Courses */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Popular Courses
            </h4>
            <ul className="space-y-2 text-sm">
              {FOOTER_LINKS.popularCourses.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-[#C4CDD5] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Programs & Explore */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Programs & Work
            </h4>
            <ul className="space-y-2 text-sm">
              {FOOTER_LINKS.education.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-[#C4CDD5] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Admissions & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Admissions Desk
            </h4>
            <div className="space-y-2.5 text-xs text-[#C4CDD5]">
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-[#9BBAD4] shrink-0 mt-0.5" />
                <span>info@navyaedtech.com</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#9BBAD4] shrink-0 mt-0.5" />
                <span>Sun – Fri: 7:00 AM – 7:00 PM</span>
              </div>
              <p className="pt-1 text-[11px] text-[#9BBAD4] leading-normal">
                Kathmandu, Nepal
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C9BAE]">
          <div>
            © {new Date().getFullYear()} Navya Ed Tech Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
