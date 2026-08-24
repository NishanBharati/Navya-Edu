import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, BookOpen, Search } from 'lucide-react';
import { INSIGHTS } from '../data/insights';
import { Container } from '../components/common/Container';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { SEOHead } from '../components/common/SEOHead';

export const Insights: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Nepal IT Industry', 'Programming', 'Web Development'];

  const filteredArticles = INSIGHTS.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = INSIGHTS[0];

  return (
    <main className="min-h-screen py-10 sm:py-16 bg-[#FAFAF8]">
      <SEOHead
        title="Technical Insights & IT Education Articles | Navya Ed Tech"
        description="Articles, architectural observations, and career guidance from Navya EdTech software practitioners and educators in Nepal."
      />

      <Container>
        {/* Page Header */}
        <div className="max-w-3xl space-y-4 mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#356A9A]">
            Engineering & Education Blog
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#171A1F]">
            Insights & Technical Notes
          </h1>
          <p className="text-base sm:text-lg text-[#5F6670] leading-relaxed">
            Observations on modern software engineering workflows, the Nepali tech employment landscape, and pedagogical methodologies.
          </p>
        </div>

        {/* Featured Article Card */}
        {featuredArticle && selectedCategory === 'All' && searchQuery === '' && (
          <article className="bg-white border border-[#E8E4DA] rounded-2xl overflow-hidden shadow-sm mb-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto h-full overflow-hidden bg-[#F4F1EA]">
              <img
                src={featuredArticle.coverImage}
                alt={featuredArticle.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-5 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="navy" size="sm">
                  Featured Insight
                </Badge>
                <span className="text-xs text-[#8C939E]">
                  {featuredArticle.readTime}
                </span>
              </div>

              <Link to={`/insights/${featuredArticle.slug}`}>
                <h2 className="text-xl sm:text-2xl font-bold text-[#171A1F] hover:text-[#17324D] transition-colors leading-tight">
                  {featuredArticle.title}
                </h2>
              </Link>

              <p className="text-xs sm:text-sm text-[#5F6670] leading-relaxed">
                {featuredArticle.excerpt}
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-[#F0ECE1]">
                <span className="text-xs text-[#8C939E]">{featuredArticle.date}</span>
                <Link
                  to={`/insights/${featuredArticle.slug}`}
                  className="text-xs font-semibold text-[#17324D] hover:text-[#356A9A] inline-flex items-center gap-1"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </article>
        )}

        {/* Filter and Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E8E4DA]">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#17324D] text-white shadow-sm'
                    : 'bg-white text-[#5F6670] border border-[#E5DFD4] hover:bg-[#F4F1EA]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5F6670]" />
            <input
              type="text"
              placeholder="Search insights..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-[#D8D2C6] bg-white text-[#171A1F] focus:outline-none focus:ring-2 focus:ring-[#17324D]"
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="group bg-white border border-[#E8E4DA] rounded-xl overflow-hidden shadow-sm hover:border-[#17324D]/40 transition-colors flex flex-col justify-between"
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
                    <span className="text-[11px] text-[#8C939E] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
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
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
};
