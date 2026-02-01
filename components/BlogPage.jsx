import React, { useState } from 'react';
import { Calendar, Clock, ArrowLeft, Terminal, X } from 'lucide-react';

export const BlogPage = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const posts = [
    {
      id: '1',
      title: 'The 2027 Timeline: Why January 18th Matters',
      excerpt: 'A forensic breakdown of the GENIUS Act deadline and its implications for global liquidity infrastructure.',
      content: `The January 18, 2027 date represents more than a legislative deadline—it marks a systemic pressure point in global financial infrastructure.

## The GENIUS Act Context

The Government Efficiency and National Innovation in Unified Systems Act establishes technical parameters for cross-border payment modernization. While marketed as regulatory reform, the engineering implications point toward mandatory infrastructure upgrades.

## Technical Dependencies

Current correspondent banking operates on 1970s-era SWIFT messaging. The 2027 deadline creates forcing functions for:

- ISO 20022 message format adoption
- Real-time settlement capability
- Atomic transaction finality
- Regulatory reporting automation

## Bridge Currency Requirements

Moving from T+2 settlement to atomic finality requires neutral liquidity providers. Traditional pre-funded nostro accounts cannot scale to 24/7 operations across all currency pairs.

The mathematics demand high-value density assets capable of absorbing sovereign-scale flows without material slippage.`,
      date: 'Jan 27, 2026',
      readTime: '8 min',
      category: 'Timeline Analysis',
      slug: '2027-timeline-january-18'
    },
    {
      id: '2',
      title: 'ISO 20022 Migration: The Data Layer of the Reset',
      excerpt: 'How the new messaging standard creates the technical foundation for atomic settlement and bridge currencies.',
      content: `ISO 20022 represents a fundamental reimagining of financial message architecture. Unlike legacy formats, it provides structured, machine-readable data that enables automated compliance and real-time settlement.

## From Messaging to Data

Traditional SWIFT messages carry payment instructions. ISO 20022 messages carry structured financial data with embedded metadata for:

- Automated sanctions screening
- Real-time FX calculation
- Regulatory reporting
- Atomic settlement coordination

## The Bridge Requirement

When payment messages contain complete transaction context, settlement can occur simultaneously with instruction. This eliminates counterparty risk but requires instant liquidity across currency pairs.

Pre-funded accounts cannot provide 24/7 coverage. Mathematical necessity dictates neutral bridge assets with global liquidity depth.`,
      date: 'Jan 24, 2026',
      readTime: '12 min',
      category: 'Technical Analysis',
      slug: 'iso-20022-migration'
    },
    {
      id: '3',
      title: 'Protocol 22: Privacy Under Supervision',
      excerpt: 'Zero-Knowledge Proofs and the engineering solution to regulatory compliance without sacrificing transaction privacy.',
      content: `The privacy versus compliance dilemma has constrained digital payment systems since inception. Protocol 22 represents an engineering solution using cryptographic proofs.

## The Technical Challenge

Financial institutions require transaction privacy for competitive reasons. Regulators require transaction visibility for enforcement. These appear mutually exclusive.

## Zero-Knowledge Architecture

ZK-proofs enable verification of transaction validity without revealing transaction details. A regulator can verify:

- Transaction occurred
- Parties are authorized
- Amount is within limits
- Sanctions screening passed

Without learning specific values or counterparties unless investigation warranted.

## Implementation Requirements

This architecture requires public ledger infrastructure with:

- Cryptographic proof generation
- Selective disclosure mechanisms
- Regulatory view keys
- Immutable audit trails

The technical specifications point toward specific infrastructure providers.`,
      date: 'Jan 20, 2026',
      readTime: '15 min',
      category: 'Privacy & Security',
      slug: 'protocol-22-privacy'
    },
    {
      id: '4',
      title: 'The Math of Necessity: Why High Value Density is Required',
      excerpt: 'Slippage mathematics and the economic impossibility of moving sovereign-scale volume with low-priced assets.',
      content: `Market depth determines practical transaction size. When moving large values through thin order books, price slippage makes transactions economically nonviable.

## The Slippage Problem

Consider moving $1B through a market with $100M daily volume. The mathematical impact:

- Order book depth exhaustion
- 5-15% price movement
- Execution across multiple price levels
- Unacceptable transaction costs

## Value Density Solution

Higher per-unit price reduces required transaction volume. Moving $1B requires:

- At $0.50/unit: 2 billion units
- At $5.00/unit: 200 million units  
- At $50.00/unit: 20 million units

Each 10x increase in value density reduces volume by 10x, exponentially reducing market impact.

## Infrastructure-Grade Pricing

For bridge currencies handling sovereign flows, value density becomes operational necessity rather than speculation.`,
      date: 'Jan 15, 2026',
      readTime: '10 min',
      category: 'Economic Analysis',
      slug: 'math-of-necessity'
    }
  ];

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

          <div className="prose prose-invert prose-lg max-w-none">
            {selectedPost.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('## ')) {
                return <h2 key={idx} className="text-2xl font-serif text-white mt-12 mb-4">{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n').filter(line => line.startsWith('- '));
                return (
                  <ul key={idx} className="list-disc pl-6 space-y-2 text-white/70 my-6">
                    {items.map((item, i) => <li key={i}>{item.replace('- ', '')}</li>)}
                  </ul>
                );
              }
              return <p key={idx} className="text-white/70 leading-relaxed mb-6">{paragraph}</p>;
            })}
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
          <div className="grid grid-cols-1 gap-8">
            {posts.map((post) => (
              <article 
                key={post.id}
                className="bg-charcoal border border-white/10 p-8 hover:border-electric-teal/50 transition-all group"
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
                  onClick={() => setSelectedPost(post)}
                  className="inline-flex items-center gap-2 text-electric-teal hover:text-white transition-colors"
                >
                  Read Analysis →
                </button>
              </article>
            ))}
          </div>
          
          {/* Coming Soon Notice */}
          <div className="mt-12 text-center p-8 border border-white/10 bg-white/5">
            <p className="font-mono text-sm text-white/60 uppercase tracking-widest">
              📡 New analysis published weekly // Subscribe for updates
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
