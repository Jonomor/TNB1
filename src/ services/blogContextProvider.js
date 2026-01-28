// Blog Context Integration for Gemini AI Posts
// Provides real-time market context for automated blog generation

import xrpMarketService from './xrpMarketService';

class BlogContextProvider {
  constructor() {
    this.contextCache = null;
    this.lastFetch = null;
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  /**
   * Get comprehensive market context for blog posts
   * This enriches Gemini's engineering analysis with current market data
   */
  async getMarketContext() {
    // Return cached data if fresh
    if (this.contextCache && this.lastFetch && (Date.now() - this.lastFetch < this.cacheTimeout)) {
      return this.contextCache;
    }

    try {
      const analysis = await xrpMarketService.getCompleteAnalysis();
      this.contextCache = this.buildContext(analysis);
      this.lastFetch = Date.now();
      return this.contextCache;
    } catch (error) {
      console.error('Failed to fetch market context:', error);
      return this.getMinimalContext();
    }
  }

  /**
   * Build structured context object for blog posts
   */
  buildContext(analysis) {
    const price = analysis.price;
    const sentiment = analysis.sentiment;
    const news = analysis.news;

    return {
      // Prompt-ready summary for Gemini
      promptSummary: this.buildPromptSummary(price, sentiment, news),
      
      // Structured data for template insertion
      metrics: {
        currentPrice: price.price,
        priceChange24h: price.priceChange24h,
        priceChange7d: price.priceChange7d,
        marketCap: price.marketCap,
        volume24h: price.volume24h,
        marketCapRank: price.marketCapRank,
        sentimentScore: sentiment?.score,
        sentimentLabel: sentiment?.interpretation
      },

      // Context snippets for different post types
      contexts: {
        technical: this.buildTechnicalContext(price),
        market: this.buildMarketContext(price, sentiment),
        news: this.buildNewsContext(news),
        institutional: this.buildInstitutionalContext(price, analysis)
      },

      // Metadata
      timestamp: Date.now(),
      dataQuality: this.assessDataQuality(analysis)
    };
  }

  /**
   * Build prompt-ready summary for Gemini AI
   */
  buildPromptSummary(price, sentiment, news) {
    const priceDirection = price.priceChange24h > 0 ? 'up' : 'down';
    const priceChangeAbs = Math.abs(price.priceChange24h).toFixed(2);
    const topNewsHeadlines = news.slice(0, 3).map(n => n.title).join('; ');

    return `CURRENT MARKET CONTEXT (${new Date().toLocaleDateString()}):
XRP is trading at $${price.price.toFixed(4)}, ${priceDirection} ${priceChangeAbs}% in the last 24 hours. 
Market cap: $${(price.marketCap / 1e9).toFixed(2)}B (Rank #${price.marketCapRank}). 
24h volume: $${(price.volume24h / 1e9).toFixed(2)}B.
Market sentiment: ${sentiment?.interpretation || 'Neutral'} (score: ${sentiment?.score.toFixed(1) || 'N/A'}).
Recent news themes: ${topNewsHeadlines || 'No major headlines'}.

When incorporating this data into your engineering analysis, maintain The Neutral Bridge's forensic tone. Reference specific metrics when relevant to technical infrastructure discussions. Avoid speculative price predictions; focus on systemic implications.`;
  }

  /**
   * Build technical analysis context
   */
  buildTechnicalContext(price) {
    const metrics = [];

    // Volume analysis
    const volumeToMcap = (price.volume24h / price.marketCap) * 100;
    if (volumeToMcap > 20) {
      metrics.push(`High trading activity detected: 24h volume represents ${volumeToMcap.toFixed(1)}% of market cap, suggesting significant market interest.`);
    }

    // Supply dynamics
    const circulatingPct = (price.circulatingSupply / price.totalSupply) * 100;
    metrics.push(`Circulating supply at ${circulatingPct.toFixed(1)}% of total (${(price.circulatingSupply / 1e9).toFixed(2)}B of ${(price.totalSupply / 1e9).toFixed(2)}B XRP).`);

    // Price position analysis
    const athDistance = ((price.price / price.ath - 1) * 100);
    if (athDistance < -50) {
      metrics.push(`Price currently ${Math.abs(athDistance).toFixed(1)}% below all-time high of $${price.ath.toFixed(4)}.`);
    }

    return metrics.join(' ');
  }

  /**
   * Build market dynamics context
   */
  buildMarketContext(price, sentiment) {
    const insights = [];

    // Price momentum
    if (price.priceChange7d && Math.abs(price.priceChange7d) > 10) {
      insights.push(`Significant 7-day price movement: ${price.priceChange7d > 0 ? '+' : ''}${price.priceChange7d.toFixed(2)}%.`);
    }

    // Sentiment correlation
    if (sentiment) {
      const priceVsSentiment = this.analyzePriceSentimentDivergence(price.priceChange24h, sentiment.score);
      if (priceVsSentiment) {
        insights.push(priceVsSentiment);
      }
    }

    // Market cap positioning
    insights.push(`XRP maintains #${price.marketCapRank} market cap position at $${(price.marketCap / 1e9).toFixed(2)}B.`);

    return insights.join(' ');
  }

  /**
   * Build news context
   */
  buildNewsContext(news) {
    if (!news || news.length === 0) {
      return 'Limited news coverage in recent period.';
    }

    // Categorize news by sentiment
    const positive = news.filter(n => n.sentiment === 'positive').length;
    const negative = news.filter(n => n.sentiment === 'negative').length;
    const neutral = news.filter(n => n.sentiment === 'neutral').length;

    // Extract key themes from top headlines
    const themes = this.extractNewsThemes(news.slice(0, 10));
    
    return `Recent coverage analysis: ${positive} positive, ${neutral} neutral, ${negative} negative articles. Key themes: ${themes.join(', ')}.`;
  }

  /**
   * Build institutional-focused context
   */
  buildInstitutionalContext(price, analysis) {
    const insights = [];

    // Liquidity metrics
    const liquidityScore = (price.volume24h / price.marketCap) * 100;
    insights.push(`Market liquidity: ${liquidityScore.toFixed(2)}% daily volume-to-mcap ratio.`);

    // Supply transparency
    insights.push(`Transparent supply model: ${(price.circulatingSupply / 1e9).toFixed(2)}B circulating, ${((price.totalSupply - price.circulatingSupply) / 1e9).toFixed(2)}B in escrow/held.`);

    // Market maturity indicators
    const fullyDilutedMcap = price.fullyDilutedValuation || (price.totalSupply * price.price);
    insights.push(`Fully diluted valuation: $${(fullyDilutedMcap / 1e9).toFixed(2)}B.`);

    return insights.join(' ');
  }

  /**
   * Analyze price vs sentiment divergence
   */
  analyzePriceSentimentDivergence(priceChange, sentimentScore) {
    const pricePositive = priceChange > 2;
    const priceNegative = priceChange < -2;
    const sentimentPositive = sentimentScore > 20;
    const sentimentNegative = sentimentScore < -20;

    if (pricePositive && sentimentNegative) {
      return 'Note: Price rising despite negative news sentiment—possible technical buying or short covering.';
    }
    if (priceNegative && sentimentPositive) {
      return 'Note: Price declining despite positive news sentiment—possible profit-taking or broader market pressure.';
    }
    if (pricePositive && sentimentPositive) {
      return 'Price action aligns with positive news sentiment.';
    }
    if (priceNegative && sentimentNegative) {
      return 'Price action aligns with negative news sentiment.';
    }

    return null;
  }

  /**
   * Extract key themes from news headlines
   */
  extractNewsThemes(newsItems) {
    const themes = new Set();
    const keywords = {
      'regulation': ['SEC', 'regulatory', 'lawsuit', 'compliance', 'legal'],
      'adoption': ['partnership', 'bank', 'adoption', 'integration', 'payment'],
      'technology': ['upgrade', 'protocol', 'network', 'development', 'ledger'],
      'market': ['price', 'rally', 'surge', 'drop', 'trading'],
      'institutional': ['institutional', 'investor', 'fund', 'investment']
    };

    newsItems.forEach(item => {
      const text = (item.title + ' ' + (item.description || '')).toLowerCase();
      Object.entries(keywords).forEach(([theme, words]) => {
        if (words.some(word => text.includes(word.toLowerCase()))) {
          themes.add(theme);
        }
      });
    });

    return Array.from(themes).slice(0, 3);
  }

  /**
   * Assess data quality for reliability scoring
   */
  assessDataQuality(analysis) {
    const scores = {
      price: analysis.price ? 1 : 0,
      news: analysis.news?.length > 5 ? 1 : 0.5,
      sentiment: analysis.sentiment ? 1 : 0,
      completeness: 0
    };

    scores.completeness = (scores.price + scores.news + scores.sentiment) / 3;

    return {
      score: scores.completeness,
      rating: scores.completeness > 0.8 ? 'High' : scores.completeness > 0.5 ? 'Medium' : 'Low',
      sources: analysis.metadata?.sources || []
    };
  }

  /**
   * Get minimal context for fallback scenarios
   */
  getMinimalContext() {
    return {
      promptSummary: 'CURRENT MARKET CONTEXT: Live market data temporarily unavailable. Focus on fundamental analysis and systemic infrastructure topics.',
      metrics: {},
      contexts: {
        technical: '',
        market: '',
        news: '',
        institutional: ''
      },
      timestamp: Date.now(),
      dataQuality: { score: 0, rating: 'Unavailable', sources: [] }
    };
  }

  /**
   * Format context for GitHub Actions workflow
   * Returns environment variables that can be used in the blog posting action
   */
  async getContextForGitHubAction() {
    const context = await this.getMarketContext();
    
    return {
      MARKET_PROMPT_CONTEXT: context.promptSummary,
      XRP_PRICE: context.metrics.currentPrice?.toFixed(4) || 'N/A',
      XRP_CHANGE_24H: context.metrics.priceChange24h?.toFixed(2) || 'N/A',
      MARKET_CAP: context.metrics.marketCap ? `$${(context.metrics.marketCap / 1e9).toFixed(2)}B` : 'N/A',
      SENTIMENT: context.metrics.sentimentLabel || 'Neutral',
      DATA_QUALITY: context.dataQuality.rating
    };
  }

  /**
   * Generate focused context for specific post types
   */
  async getContextForPostType(postType) {
    const context = await this.getMarketContext();
    
    const typeMap = {
      'technical': context.contexts.technical,
      'market': context.contexts.market,
      'news': context.contexts.news,
      'institutional': context.contexts.institutional
    };

    return {
      baseContext: context.promptSummary,
      focusedContext: typeMap[postType] || context.contexts.technical,
      metrics: context.metrics
    };
  }
}

// Export singleton instance
export default new BlogContextProvider();

// Export class for testing
export { BlogContextProvider };
