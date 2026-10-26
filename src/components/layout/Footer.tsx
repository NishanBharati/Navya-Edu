import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, Clock, Phone } from 'lucide-react';
import { FOOTER_LINKS } from '../../data/navigation';
import { Container } from '../common/Container';
import { Logo } from '../common/Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy text-border-warm pt-16 pb-12 border-t border-navy-deep">
      <Container>
        <h2 className="sr-only">Footer Directory and Institutional Links</h2>
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Brand & Parent Company Connection */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block group focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg p-0.5">
              <Logo
                variant="dark"
                size="md"
                subtitle="Technology Education Division"
              />
            </Link>

            <p className="text-sm text-mist leading-relaxed max-w-md">
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
                <ArrowUpRight className="w-3.5 h-3.5 text-navy-mist" />
              </a>
            </div>
          </div>

          {/* Col 3: Popular Courses */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Popular Courses
            </h3>
            <ul className="space-y-2 text-sm">
              {FOOTER_LINKS.popularCourses.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-mist hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Programs & Admissions */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Programs & Admissions
            </h3>
            <ul className="space-y-2 text-sm">
              {FOOTER_LINKS.education.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-mist hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Admissions & Contact */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Admissions Desk
            </h3>
            <div className="space-y-2.5 text-xs text-mist">
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-navy-mist shrink-0 mt-0.5" />
                <a
                  href="tel:+9779800000000"
                  className="hover:text-white transition-colors underline-offset-2 hover:underline font-semibold"
                >
                  +977 980-0000000
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-navy-mist shrink-0 mt-0.5" />
                <a
                  href="mailto:info@navyaedtech.com"
                  className="hover:text-white transition-colors underline-offset-2 hover:underline"
                >
                  info@navyaedtech.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-navy-mist shrink-0 mt-0.5" />
                <span>Sun – Fri: 7:00 AM – 7:00 PM</span>
              </div>
              <p className="pt-1 text-[11px] text-navy-mist leading-normal">
                Putalisadak, Kathmandu, Nepal
              </p>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors border border-white/15"
                >
                  <span>Inquire / Visit Campus</span>
                  <ArrowUpRight className="w-3 h-3 text-navy-mist" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#A8B6C7]">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span>© {new Date().getFullYear()} Navya Ed Tech Pvt. Ltd. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-[11px] text-mist">Kathmandu, Bagmati Province, Nepal</span>
          </div>
          <nav aria-label="Legal and institutional policies" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span className="text-white/20" aria-hidden="true">•</span>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20" aria-hidden="true">•</span>
            <Link to="/refund" className="hover:text-white transition-colors">
              Refund Policy
            </Link>
            <span className="text-white/20" aria-hidden="true">•</span>
            <Link to="/faq" className="hover:text-white transition-colors">
              Student FAQ
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
};
