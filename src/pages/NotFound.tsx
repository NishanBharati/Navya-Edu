import React from 'react';
import { Compass, Home, BookOpen, ArrowRight, HelpCircle, PhoneCall } from 'lucide-react';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { SEOHead } from '../components/common/SEOHead';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <main className="min-h-[75vh] flex items-center py-16 sm:py-24 bg-paper">
      <SEOHead
        title="404 - Page Not Found | Navya Ed Tech Nepal"
        description="The requested page or syllabus could not be found. Explore our IT courses or contact the admissions counseling desk."
        noindex={true}
      />

      <Container>
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Badge & Code */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy/5 border border-navy/10 text-xs font-semibold uppercase tracking-wider text-blue">
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span>Error 404 • Resource Not Located</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight text-navy">
              404
            </h1>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">
              Page or Syllabus Not Found
            </h2>
            <p className="text-sm sm:text-base text-ink-soft leading-relaxed max-w-lg mx-auto">
              The link you followed may be outdated, the course code may have been updated, or the address was mistyped.
            </p>
          </div>

          {/* Core Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button variant="primary" size="md" href="/" className="w-full sm:w-auto justify-center">
              <Home className="w-4 h-4 mr-2" />
              <span>Return to Homepage</span>
            </Button>
            <Button variant="secondary" size="md" href="/courses" className="w-full sm:w-auto justify-center">
              <BookOpen className="w-4 h-4 mr-2" />
              <span>Browse All Courses</span>
            </Button>
            <Button variant="outline" size="md" href="/contact" className="w-full sm:w-auto justify-center">
              <PhoneCall className="w-4 h-4 mr-2" />
              <span>Admissions Desk</span>
            </Button>
          </div>

          {/* Popular Tracks Quick Navigation */}
          <div className="pt-8 border-t border-border space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
              Looking for our core engineering courses?
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
              {[
                { name: 'Data Science (50 Days)', slug: 'data-science' },
                { name: 'Python Advance (40 Days)', slug: 'python-advance' },
                { name: 'Python Beginner (40 Days)', slug: 'python-beginner' },
                { name: 'Scratch Advanced (30 Days)', slug: 'scratch-advanced' },
                { name: 'Scratch Beginner (30 Days)', slug: 'scratch-beginner' },
                { name: 'Web Development (45 Days)', slug: 'web-development' },
              ].map((c) => (
                <Link
                  key={c.slug}
                  to={`/courses/${c.slug}`}
                  className="px-3 py-1.5 rounded-lg bg-white border border-border hover:border-navy hover:text-navy text-ink-soft transition-all shadow-2xs flex items-center gap-1"
                >
                  <span>{c.name}</span>
                  <ArrowRight className="w-3 h-3 text-blue" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};
