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
    { name: 'All', icon: BookOpen },
    { name: 'Market Analysis', icon: TrendingUp },
    { name: 'Infrastructure Analysis', icon: Lightbulb },
    { name: 'Research', icon: Search }
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-electric-teal border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-mono text-sm">Loading insights...</p>
        </div>
      </div>
    );
  }

  // Article View
  if (selectedPost) {
    return (
      <div className="min-h-screen bg-white">
        {/* Sticky Header */}
        <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <button 
              onClick={goBack}
              className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Blog</span>
            </button>
            
            <div className="flex items-center gap-3">
              <button
                onClick={copyLink}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={16} className="text-electric-teal" />
                    <span className="text-sm font-medium text-electric-teal">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 size={16} />
                    <span className="text-sm font-medium">Share</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Article Container */}
        <article className="max-w-4xl mx-auto px-6 py-16">
          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-teal/10 text-electric-teal font-medium text-sm">
              {selectedPost.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl font-bold mb-6 leading-tight text-gray-900">
            {selectedPost.title}
          </h1>

          {/* Metadata */}
          <div className="flex items-center gap-6 pb-8 mb-8 border-b border-gray-200">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar size={18} />
              <span className="font-medium">{new Date(selectedPost.date).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric',
                year: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock size={18} />
              <span className="font-medium">{selectedPost.readTime}</span>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={{
                h1: ({ children }) => (
                  <h1 className="text-4xl font-bold mb-6 mt-12 text-gray-900 border-b border-gray-200 pb-4">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-3xl font-bold mb-4 mt-10 text-gray-900">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-2xl font-semibold mb-3 mt-8 text-gray-800">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="space-y-3 my-6 ml-6">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="space-y-3 my-6 ml-6 list-decimal">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-gray-700 leading-relaxed">
                    {children}
                  </li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-gray-900">
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-gray-700">
                    {children}
                  </em>
                ),
                code: ({ inline, children }) => 
                  inline ? (
                    <code className="px-2 py-1 rounded bg-gray-100 text-electric-teal text-sm font-mono">
                      {children}
                    </code>
                  ) : (
                    <code className="block px-6 py-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 text-sm font-mono overflow-x-auto my-6">
                      {children}
                    </code>
                  ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-electric-teal pl-6 py-2 my-6 italic text-gray-600 bg-gray-50 rounded-r">
                    {children}
                  </blockquote>
                ),
                a: ({ href, children }) => (
                  <a 
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-electric-teal hover:underline"
                  >
                    {children}
                  </a>
                ),
                hr: () => (
                  <hr className="my-12 border-gray-200" />
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-8">
                    <table className="w-full border-collapse border border-gray-200">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="px-4 py-3 text-left font-semibold bg-gray-50 border-b-2 border-gray-300 text-gray-900">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-4 py-3 border-b border-gray-200 text-gray-700">
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
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wider">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {selectedPost.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Related Articles CTA */}
        <div className="bg-gray-50 border-t border-gray-200 py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Explore More Insights</h2>
            <p className="text-gray-600 mb-8">
              Discover more forensic analysis and infrastructure research
            </p>
            <button 
              onClick={goBack}
              className="px-8 py-4 bg-electric-teal text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all"
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => {
              localStorage.setItem('tnb_entered', 'true');
              window.location.href = window.location.origin + window.location.pathname;
            }}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Home</span>
          </button>
          <div className="flex items-center gap-2">
            <img src="/bridge_LOGO_3.png" alt="The Neutral Bridge" className="w-8 h-8" />
            <span className="font-bold text-xl">The Neutral Bridge</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h1 className="text-6xl font-bold mb-6 text-gray-900">
            Unlock Expert Analyses
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Deep-dive forensic analysis on XRP infrastructure, global finance reset, and institutional adoption patterns.
          </p>
        </div>
      </section>

      {/* Search and Categories */}
      <section className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-electric-teal transition-colors"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map(({ name, icon: Icon }) => (
              <button
                key={name}
                onClick={() => setSelectedCategory(name)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedCategory === name
                    ? 'bg-electric-teal text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon size={18} />
                {name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {selectedCategory === 'All' && featuredPost && (
        <section className="bg-gradient-to-br from-electric-teal/5 to-transparent border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div 
              onClick={() => selectPost(featuredPost)}
              className="grid md:grid-cols-2 gap-12 items-center cursor-pointer group"
            >
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-electric-teal text-white text-sm font-medium mb-4">
                  Featured Article
                </span>
                <h2 className="text-4xl font-bold mb-4 text-gray-900 group-hover:text-electric-teal transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-6 text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span className="text-sm">{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span className="text-sm">{featuredPost.readTime}</span>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-electric-teal text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all">
                  Read Article
                  <ArrowRight size={18} />
                </button>
              </div>
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl aspect-video flex items-center justify-center">
                <BookOpen size={80} className="text-gray-400" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => selectPost(post)}
                className="group cursor-pointer bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl hover:border-electric-teal/50 transition-all"
              >
                {/* Thumbnail */}
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 aspect-video flex items-center justify-center">
                  <BookOpen size={48} className="text-gray-400 group-hover:text-electric-teal transition-colors" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="inline-block px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs font-medium mb-3">
                    {post.category}
                  </span>
                  
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-electric-teal transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <Search size={64} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No articles found matching your criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Informed</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Get weekly forensic analysis and infrastructure insights delivered to your inbox
          </p>
          <form 
            action="https://formspree.io/f/xqeqorqy" 
            method="POST"
            className="flex flex-col sm:flex-row gap-4"
          >
            <input 
              type="email" 
              name="email"
              placeholder="Enter your email" 
              required
              className="flex-1 px-6 py-4 bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-electric-teal transition-colors rounded-lg"
            />
            <button 
              type="submit"
              className="px-8 py-4 bg-electric-teal text-white font-bold rounded-lg hover:bg-opacity-90 transition-all whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-600 text-sm">
            The Neutral Bridge is an analytical publication. It does not constitute financial or investment advice.
          </p>
          <p className="text-gray-400 text-sm mt-2">© 2026 K. Morgan. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BlogPage;
