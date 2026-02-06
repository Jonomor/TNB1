import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowLeft, ArrowRight, Search, TrendingUp, BookOpen, Lightbulb, Share2, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

export const BlogPage = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  const categories = [
    { name: 'All', shortName: 'All', icon: BookOpen },
    { name: 'Market Analysis', shortName: 'Market', icon: TrendingUp },
    { name: 'Infrastructure Analysis', shortName: 'Infrastructure', icon: Lightbulb },
    { name: 'Research', shortName: 'Research', icon: Search }
  ];

  useEffect(() => {
    fetch('/blog_posts.json?t=' + Date.now())
      .then(res => res.json())
      .then(data => {
        const postsArray = Array.isArray(data) ? data : (data.posts || []);
        setPosts(postsArray);
        setLoading(false);

        // Check if URL has an article slug
        const hash = window.location.hash;
        const articleMatch = hash.match(/#\/blog\/(.+)/);
        if (articleMatch) {
          const slug = articleMatch[1];
          const post = postsArray.find(p => p.slug === slug || p.id === slug);
          if (post) setSelectedPost(post);
        }
      })
      .catch(err => {
        console.error('Failed to load blog posts:', err);
        setLoading(false);
      });
  }, []);

  const selectPost = (post) => {
    setSelectedPost(post);
    window.location.hash = `#/blog/${post.slug || post.id}`;
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    setSelectedPost(null);
    window.location.hash = '#/blog';
  };

  const copyLink = () => {
    const link = selectedPost 
      ? `${window.location.origin}${window.location.pathname}#/blog/${selectedPost.slug || selectedPost.id}`
      : window.location.href;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Featured post (most recent)
  const featuredPost = posts[0];
  const regularPosts = filteredPosts.slice(selectedCategory === 'All' ? 1 : 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-matte-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-electric-teal border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60 font-mono text-sm">Loading insights...</p>
        </div>
      </div>
    );
  }

  // Article View
  if (selectedPost) {
    return (
      <div className="min-h-screen bg-matte-black text-white">
        {/* Sticky Header */}
        <header className="sticky top-0 bg-black/95 backdrop-blur-sm border-b border-white/10 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
            <button 
              onClick={goBack}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
              <span className="font-medium text-sm sm:text-base">Back to Blog</span>
            </button>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={copyLink}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-electric-teal/50 transition-all text-xs sm:text-sm"
              >
                {copied ? (
                  <>
                    <Check size={14} className="sm:w-4 sm:h-4 text-electric-teal" />
                    <span className="font-medium text-electric-teal hidden sm:inline">Copied!</span>
                    <span className="font-medium text-electric-teal sm:hidden">✓</span>
                  </>
                ) : (
                  <>
                    <Share2 size={14} className="sm:w-4 sm:h-4" />
                    <span className="font-medium hidden sm:inline">Share</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image - Mobile Optimized */}
        {selectedPost.image && (
          <div className="w-full px-0 sm:px-6 pt-0 sm:pt-12 sm:max-w-5xl sm:mx-auto">
            <img 
              src={selectedPost.image} 
              alt={selectedPost.title}
              className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover sm:rounded-lg"
            />
          </div>
        )}

        {/* Article Container */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
          {/* Category Badge */}
          <div className="mb-4 sm:mb-6">
            <span className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-electric-teal/10 border border-electric-teal/30 text-electric-teal font-medium text-xs sm:text-sm">
              {selectedPost.category}
            </span>
          </div>

          {/* Title - Mobile Responsive */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight text-white">
            {selectedPost.title}
          </h1>

          {/* Metadata */}
          <div className="flex items-center gap-4 sm:gap-6 pb-6 sm:pb-8 mb-6 sm:mb-8 border-b border-white/10 text-sm sm:text-base">
            <div className="flex items-center gap-1.5 sm:gap-2 text-white/60">
              <Calendar size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="font-medium text-xs sm:text-sm">{new Date(selectedPost.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-white/60">
              <Clock size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="font-medium text-xs sm:text-sm">{selectedPost.readTime}</span>
            </div>
          </div>

          {/* Content - Mobile Optimized Typography */}
          <div className="prose prose-invert prose-sm sm:prose-base md:prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 mt-8 sm:mt-12 text-white border-b border-white/10 pb-3 sm:pb-4">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 mt-6 sm:mt-10 text-white">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 mt-5 sm:mt-8 text-white/90">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-white/70 leading-relaxed mb-4 sm:mb-6 text-base sm:text-lg">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="space-y-2 sm:space-y-3 my-4 sm:my-6 ml-4 sm:ml-6">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="space-y-2 sm:space-y-3 my-4 sm:my-6 ml-4 sm:ml-6 list-decimal">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-white/70 leading-relaxed text-sm sm:text-base">
                    {children}
                  </li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-white">
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-electric-teal/80">
                    {children}
                  </em>
                ),
                code: ({ inline, children }) => 
                  inline ? (
                    <code className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded bg-white/10 text-electric-teal text-xs sm:text-sm font-mono">
                      {children}
                    </code>
                  ) : (
                    <code className="block px-4 sm:px-6 py-3 sm:py-4 rounded-lg bg-black/50 border border-white/10 text-white/80 text-xs sm:text-sm font-mono overflow-x-auto my-4 sm:my-6">
                      {children}
                    </code>
                  ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-electric-teal pl-4 sm:pl-6 py-2 my-4 sm:my-6 italic text-white/60 bg-white/5 rounded-r text-sm sm:text-base">
                    {children}
                  </blockquote>
                ),
                a: ({ href, children }) => (
                  <a 
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-electric-teal hover:text-white underline transition-colors break-words"
                  >
                    {children}
                  </a>
                ),
                hr: () => (
                  <hr className="my-8 sm:my-12 border-white/10" />
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-6 sm:my-8 -mx-4 sm:mx-0">
                    <table className="w-full border-collapse border border-white/10 min-w-max">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="px-3 sm:px-4 py-2 sm:py-3 text-left font-semibold bg-white/5 border-b-2 border-electric-teal text-white text-xs sm:text-sm">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-3 sm:px-4 py-2 sm:py-3 border-b border-white/10 text-white/70 text-xs sm:text-sm">
                    {children}
                  </td>
                ),
              }}
            >
              {selectedPost.content}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          {selectedPost.tags && selectedPost.tags.length > 0 && (
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10">
              <h3 className="text-xs sm:text-sm font-semibold text-white/60 mb-3 sm:mb-4 uppercase tracking-wider">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {selectedPost.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-2.5 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs sm:text-sm hover:border-electric-teal/50 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Related Articles CTA */}
        <div className="bg-charcoal border-t border-white/10 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-white">Explore More Insights</h2>
            <p className="text-white/60 mb-6 sm:mb-8 text-sm sm:text-base">
              Discover more forensic analysis and infrastructure research
            </p>
            <button 
              onClick={goBack}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-electric-teal text-black font-semibold rounded-lg hover:bg-opacity-90 transition-all text-sm sm:text-base"
            >
              View All Articles
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Blog List View
  return (
    <div className="min-h-screen bg-matte-black text-white">
      {/* Header */}
      <header className="bg-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <button 
            onClick={() => {
              localStorage.setItem('tnb_entered', 'true');
              window.location.href = window.location.origin + window.location.pathname;
            }}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base">Home</span>
          </button>
          <div className="flex items-center gap-2">
            <img src="/bridge_LOGO_3.png" alt="The Neutral Bridge" className="w-6 h-6 sm:w-8 sm:h-8" />
            <span className="font-bold text-base sm:text-xl">The Neutral Bridge</span>
          </div>
        </div>
      </header>

      {/* Hero Section - Mobile Optimized */}
      <section className="bg-gradient-to-br from-charcoal to-matte-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-electric-teal via-white to-electric-teal bg-clip-text text-transparent leading-tight">
            Unlock Expert Analyses
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 max-w-2xl leading-relaxed">
            Deep-dive forensic analysis on XRP infrastructure, global finance reset, and institutional adoption patterns.
          </p>
        </div>
      </section>

      {/* Search and Categories */}
      <section className="border-b border-white/10 bg-black sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          {/* Search Bar */}
          <div className="mb-4 sm:mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-white/40" size={18} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-electric-teal transition-colors rounded-lg text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Category Tabs - Mobile Optimized with Short Names */}
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
            {categories.map(({ name, shortName, icon: Icon }) => (
              <button
                key={name}
                onClick={() => setSelectedCategory(name)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg font-medium whitespace-nowrap transition-all text-xs sm:text-sm md:text-base ${
                  selectedCategory === name
                    ? 'bg-electric-teal text-black'
                    : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <Icon size={14} className="sm:w-4 sm:h-4 md:w-[18px] md:h-[18px] flex-shrink-0" />
                <span className="hidden sm:inline">{name}</span>
                <span className="sm:hidden">{shortName}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post - Mobile Optimized */}
      {selectedCategory === 'All' && featuredPost && (
        <section className="bg-gradient-to-br from-electric-teal/5 to-transparent border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
            <div 
              onClick={() => selectPost(featuredPost)}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 items-center cursor-pointer group"
            >
              <div className="order-2 md:order-1">
                <span className="inline-block px-2.5 sm:px-3 py-1 rounded-full bg-electric-teal text-black text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                  Featured Article
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-white group-hover:text-electric-teal transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-white/60 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed line-clamp-3 sm:line-clamp-none">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 sm:gap-6 text-white/60 mb-4 sm:mb-6 text-xs sm:text-sm">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Calendar size={14} className="sm:w-4 sm:h-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Clock size={14} className="sm:w-4 sm:h-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-electric-teal text-black font-semibold rounded-lg hover:bg-opacity-90 transition-all text-sm sm:text-base">
                  Read Article
                  <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                </button>
              </div>
              
              {/* Featured Image - Mobile Optimized */}
              <div className="order-1 md:order-2 relative aspect-video rounded-lg sm:rounded-xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border border-white/10 group-hover:border-electric-teal/50 transition-all">
                {featuredPost.image ? (
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen size={60} className="sm:w-20 sm:h-20 text-white/20 group-hover:text-electric-teal/50 transition-colors" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid - Mobile Optimized */}
      <section className="py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {regularPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => selectPost(post)}
                className="group cursor-pointer bg-charcoal border border-white/10 rounded-lg overflow-hidden hover:border-electric-teal/50 transition-all hover:shadow-xl hover:shadow-electric-teal/10"
              >
                {/* Thumbnail - Mobile Optimized */}
                <div className="relative aspect-video bg-gradient-to-br from-white/10 to-white/5 overflow-hidden">
                  {post.image ? (
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen size={40} className="sm:w-12 sm:h-12 text-white/20 group-hover:text-electric-teal/50 transition-colors" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <span className="inline-block px-2 py-0.5 sm:py-1 rounded bg-white/5 border border-white/10 text-white/70 text-xs font-medium mb-2 sm:mb-3">
                    {post.category}
                  </span>
                  
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white group-hover:text-electric-teal transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-white/60 mb-3 sm:mb-4 line-clamp-3 leading-relaxed text-sm sm:text-base">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-white/40">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} className="sm:w-[14px] sm:h-[14px]" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} className="sm:w-[14px] sm:h-[14px]" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12 sm:py-20">
              <Search size={48} className="sm:w-16 sm:h-16 text-white/10 mx-auto mb-4" />
              <p className="text-white/40 text-base sm:text-lg">No articles found matching your criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-black border-t border-white/10 py-12 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Stay Informed</h2>
          <p className="text-white/60 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg">
            Get weekly forensic analysis and infrastructure insights delivered to your inbox
          </p>
          <form 
            action="https://formspree.io/f/xqeqorqy" 
            method="POST"
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <input 
              type="email" 
              name="email"
              placeholder="Enter your email" 
              required
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-white/5 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-electric-teal transition-colors rounded-lg text-sm sm:text-base"
            />
            <button 
              type="submit"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-electric-teal text-black font-bold rounded-lg hover:bg-opacity-90 transition-all whitespace-nowrap text-sm sm:text-base"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-white/40 text-xs sm:text-sm">
            The Neutral Bridge is an analytical publication. It does not constitute financial or investment advice.
          </p>
          <p className="text-white/20 text-xs sm:text-sm mt-2">© 2026 K. Morgan. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BlogPage;
