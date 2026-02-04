import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowLeft, Terminal } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

export const BlogPage = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch posts from blog_posts.json with cache busting
    fetch('/blog_posts.json?t=' + Date.now())
      .then(res => res.json())
      .then(data => {
        // Handle both array format and object format
        const postsArray = Array.isArray(data) ? data : (data.posts || []);
        setPosts(postsArray);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load blog posts:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-matte-black text-white flex items-center justify-center">
        <p className="text-white/60 font-mono text-sm">Loading forensic analysis...</p>
      </div>
    );
  }

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-matte-black text-white font-sans">
        {/* Header */}
        <div className="bg-black border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <button 
              onClick={() => setSelectedPost(null)} 
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft size={18} />
              <span className="font-mono text-sm uppercase tracking-wider">Back to Articles</span>
            </button>
          </div>
        </div>

        {/* Article Content */}
        <article className="py-20 max-w-3xl mx-auto px-6">
          <div className="mb-8">
            <span className="text-[10px] font-mono uppercase tracking-widest text-electric-teal border border-electric-teal/30 px-2 py-1 rounded-sm">
              {selectedPost.category}
            </span>
          </div>
          
          <h1 className="font-serif text-5xl mb-6 text-white leading-tight">{selectedPost.title}</h1>
          
          <div className="flex items-center gap-4 mb-12 text-sm text-white/40">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{selectedPost.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{selectedPost.readTime} read</span>
            </div>
          </div>

          {/* Improved Markdown Rendering */}
          <div className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={{
                // Headings
                h1: ({ children }) => (
                  <h1 className="font-serif text-4xl mb-6 mt-12 text-white leading-tight border-b border-white/10 pb-4">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="font-serif text-3xl text-white mt-12 mb-4">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="font-serif text-2xl text-white mt-8 mb-3">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-lg font-bold text-electric-teal mt-6 mb-2">
                    {children}
                  </h4>
                ),
                
                // Paragraphs
                p: ({ children }) => (
                  <p className="text-white/70 leading-relaxed mb-6 text-lg">
                    {children}
                  </p>
                ),
                
                // Lists
                ul: ({ children }) => (
                  <ul className="list-disc pl-6 space-y-2 text-white/70 my-6">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-6 space-y-2 text-white/70 my-6">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-white/70 leading-relaxed">
                    {children}
                  </li>
                ),
                
                // Emphasis
                strong: ({ children }) => (
                  <strong className="text-white font-semibold">
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em className="text-electric-teal/80">
                    {children}
                  </em>
                ),
                
                // Code
                code: ({ inline, children }) => 
                  inline ? (
                    <code className="px-2 py-1 rounded bg-white/10 text-electric-teal text-sm font-mono">
                      {children}
                    </code>
                  ) : (
                    <code className="block px-6 py-4 rounded bg-black/50 border border-white/10 text-white/80 text-sm font-mono overflow-x-auto my-6">
                      {children}
                    </code>
                  ),
                
                // Blockquotes
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-electric-teal pl-6 py-2 my-6 italic text-white/60 bg-white/5">
                    {children}
                  </blockquote>
                ),
                
                // Links
                a: ({ href, children }) => (
                  <a 
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-electric-teal hover:text-white underline transition-colors"
                  >
                    {children}
                  </a>
                ),
                
                // Horizontal Rule
                hr: () => (
                  <hr className="my-12 border-none h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                ),
                
                // Tables
                table: ({ children }) => (
                  <div className="overflow-x-auto my-8">
                    <table className="w-full border-collapse">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="px-4 py-3 text-left font-semibold border-b-2 border-electric-teal bg-white/5 text-white">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-4 py-3 border-b border-white/10 text-white/70">
                    {children}
                  </td>
                ),
              }}
            >
              {selectedPost.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-matte-black text-white font-sans">
      {/* Header */}
      <div className="bg-black border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => {
              localStorage.setItem('tnb_entered', 'true');
              window.location.href = window.location.origin + window.location.pathname;
            }} 
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="font-mono text-sm uppercase tracking-wider">Back to Home</span>
          </button>
          <div className="flex items-center gap-2">
            <img src="/bridge_LOGO_3.png" alt="The Neutral Bridge" className="w-6 h-6" />
            <span className="font-serif font-bold text-lg">The Neutral Bridge</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="py-20 border-b border-white/5 bg-circuit">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-electric-teal/10 border border-electric-teal/30 rounded-full mb-6">
            <Terminal size={12} className="text-electric-teal" />
            <span className="text-[10px] font-mono font-bold text-electric-teal uppercase tracking-widest">Engineering Analysis</span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl mb-6 text-white">The Bridge Journal</h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Forensic analysis of the 2027 financial reset. Engineering-grade insights into XRP, Ripple, and global liquidity infrastructure.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/40 text-lg">No analysis published yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8">
              {posts.map((post) => (
                <article 
                  key={post.id}
                  className="bg-charcoal border border-white/10 p-8 hover:border-electric-teal/50 transition-all group cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-electric-teal border border-electric-teal/30 px-2 py-1 rounded-sm">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-4 text-xs text-white/40">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{post.readTime} read</span>
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="font-serif text-2xl text-white mb-3 group-hover:text-electric-teal transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-white/60 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  
                  <button
                    className="inline-flex items-center gap-2 text-electric-teal hover:text-white transition-colors"
                  >
                    Read Analysis →
                  </button>
                </article>
              ))}
            </div>
          )}
          
          {/* Coming Soon Notice */}
          <div className="mt-12 text-center p-8 border border-white/10 bg-white/5">
            <p className="font-mono text-sm text-white/60 uppercase tracking-widest">
              📡 New analysis published 3x weekly // Subscribe for updates
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-charcoal border-t border-white/10">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl mb-4 text-white">Stay Ahead of the Reset</h2>
          <p className="text-white/60 mb-8">Get weekly forensic analysis delivered to your inbox.</p>
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
              className="flex-1 bg-black border border-white/20 px-4 py-3 text-white focus:outline-none focus:border-electric-teal transition-colors rounded-sm"
            />
            <button 
              type="submit"
              className="bg-electric-teal text-black font-bold px-8 py-3 rounded-sm hover:bg-white transition-all uppercase tracking-wider text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs text-white/40">
            The Neutral Bridge is an analytical publication. It does not constitute financial or investment advice.
          </p>
          <p className="text-xs text-white/20 mt-2">© 2026 K. Morgan. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BlogPage;
