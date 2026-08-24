import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Share2 } from 'lucide-react';
import { INSIGHTS } from '../data/insights';
import { Container } from '../components/common/Container';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { SEOHead } from '../components/common/SEOHead';

export const BlogDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const article = INSIGHTS.find((a) => a.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <main className="min-h-screen py-20 bg-[#FAFAF8] flex items-center justify-center">
        <Container size="narrow" className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-[#171A1F]">
            Article Not Found
          </h1>
          <p className="text-sm text-[#5F6670]">
            The article you are looking for does not exist or has been relocated.
          </p>
          <div className="pt-2">
            <Button variant="primary" href="/insights">
              Back to Insights
            </Button>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-10 sm:py-16 bg-[#FAFAF8]">
      <SEOHead
        title={`${article.title} | Navya Ed Tech Insights`}
        description={article.excerpt}
      />

      <Container size="narrow">
        {/* Back navigation */}
        <div className="mb-6">
          <Link
            to="/insights"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5F6670] hover:text-[#17324D] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Insights</span>
          </Link>
        </div>

        {/* Article Header */}
        <article className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="navy" size="md">
                {article.category}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-[#8C939E]">
                <Clock className="w-3.5 h-3.5" />
                <span>{article.readTime}</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#171A1F] leading-tight">
              {article.title}
            </h1>

            {/* Author and Date Bar */}
            <div className="flex items-center justify-between py-3 border-y border-[#E8E4DA] text-xs text-[#5F6670]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#17324D] text-white flex items-center justify-center text-[10px] font-bold">
                  N
                </div>
                <div>
                  <span className="font-semibold text-[#171A1F] block">{article.author.name}</span>
                  <span className="text-[11px] text-[#8C939E]">{article.author.role}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs">
                <Calendar className="w-3.5 h-3.5 text-[#8C939E]" />
                <span>{article.date}</span>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="rounded-2xl overflow-hidden border border-[#E0DACF] aspect-[16/9] bg-[#F4F1EA]">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Body */}
          <div className="prose max-w-none text-[#171A1F] space-y-5 text-sm sm:text-base leading-relaxed pt-4">
            {article.content.map((paragraph, idx) => (
              <p key={idx} className="text-[#333842] leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-[#E8E4DA] flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-[#5F6670] uppercase tracking-wider mr-1">
              Tags:
            </span>
            {article.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1 rounded-full bg-[#F4F1EA] text-[#17324D] font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Bottom Card for Course Inquiry */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#17324D] text-white space-y-3">
            <h3 className="text-lg sm:text-xl font-bold">
              Looking to upgrade your engineering skills?
            </h3>
            <p className="text-xs sm:text-sm text-[#C4CDD5] leading-relaxed">
              Explore our project-based training programs in MERN Stack, Python & Machine Learning, React, and DevOps.
            </p>
            <div className="pt-2">
              <Button variant="secondary" size="sm" href="/courses">
                Explore Available Courses
              </Button>
            </div>
          </div>
        </article>
      </Container>
    </main>
  );
};
