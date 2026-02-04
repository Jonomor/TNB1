import React, { useEffect, useState } from 'react';
import { ArrowLeft, Clock, Calendar, Tag, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

export const BlogArticle = ({ article, onBack }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [article]);

  return (
    <div className="min-h-screen bg-matte-black text-white">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-50">
        <div 
          className="h-full bg-gradient-to-r from-electric-teal to-neon-blue transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 bg-matte-black/95 backdrop-blur-sm border-b border-white/10 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-electric-teal hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-mono">Back to Articles</span>
          </button>
        </div>
      </header>

      {/* Article Container */}
      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Article Header */}
        <div className="mb-12 pb-8 border-b border-white/10">
          {/* Category Badge */}
          {article.category && (
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-teal/10 border border-electric-teal/30 text-electric-teal text-xs font-mono">
                <Tag className="w-3 h-3" />
                {article.category}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            {article.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-white/60 font-mono">
            {article.author && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
            )}
            {article.date && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            )}
            {article.readTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime} read</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {article.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-xs rounded bg-white/5 border border-white/10 text-white/70 hover:border-electric-teal/50 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Article Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
              // Headings
              h1: ({ children }) => (
                <h1 className="text-4xl font-bold mb-6 mt-12 pb-4 border-b border-white/10 bg-gradient-to-r from-electric-teal to-white bg-clip-text text-transparent">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-3xl font-bold mb-4 mt-10 text-white/90">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-2xl font-semibold mb-3 mt-8 text-white/80">
                  {children}
                </h3>
              ),
              
              // Paragraphs
              p: ({ children }) => (
                <p className="text-white/70 leading-relaxed mb-6 text-lg">
                  {children}
                </p>
              ),
              
              // Lists
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
                <li className="text-white/70 leading-relaxed pl-2">
                  <span className="text-electric-teal mr-2">→</span>
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
                <em className="text-electric-teal/80 not-italic">
                  {children}
                </em>
              ),
              
              // Code
              code: ({ inline, children }) => 
                inline ? (
                  <code className="px-2 py-1 rounded bg-white/10 border border-white/20 text-electric-teal text-sm font-mono">
                    {children}
                  </code>
                ) : (
                  <code className="block px-6 py-4 rounded-lg bg-black/50 border border-white/10 text-white/80 text-sm font-mono overflow-x-auto my-6">
                    {children}
                  </code>
                ),
              
              // Blockquotes
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-electric-teal pl-6 py-2 my-6 italic text-white/60 bg-white/5 rounded-r">
                  {children}
                </blockquote>
              ),
              
              // Links
              a: ({ href, children }) => (
                <a 
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-electric-teal hover:text-neon-blue underline decoration-electric-teal/30 hover:decoration-neon-blue transition-colors"
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
                <th className="px-4 py-3 text-left font-semibold border-b-2 border-electric-teal bg-white/5">
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
            {article.content}
          </ReactMarkdown>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="bg-gradient-to-br from-electric-teal/10 to-neon-blue/10 border border-electric-teal/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-3 text-white">
              Want to dive deeper?
            </h3>
            <p className="text-white/70 mb-6">
              Explore more forensic analysis and infrastructure insights in our complete collection.
            </p>
            <button 
              onClick={onBack}
              className="px-6 py-3 bg-electric-teal text-black font-semibold rounded-lg hover:bg-electric-teal/90 transition-colors"
            >
              View All Articles
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};
