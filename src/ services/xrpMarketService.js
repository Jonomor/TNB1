// XRP Market Analysis Service
// Multi-source aggregation for institutional-grade market intelligence

class XRPMarketService {
  constructor() {
    this.cache = {
      price: null,
      news: null,
      onchain: null,
      sentiment: null,
      lastUpdate: null
    };
    this.updateInterval = null;
  }

  // Aggregate price data from multiple sources for reliability
  async getPriceData() {
    try {
      const [coingecko, coinmarketcap] = await Promise.allSettled([
        this.fetchCoinGecko(),
        this.fetchCoinMarketCap()
      ]);

      const primary = coingecko.status === 'fulfilled' ? coingecko.value : 
                     coinmarketcap.status === 'fulfilled' ? coinmarketcap.value : null;

      if (!primary) throw new Error('All price sources failed');

      return {
        ...primary,
        dataSource: coingecko.status === 'fulfilled' ? 'CoinGecko' : 'CoinMarketCap',
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Price data fetch failed:', error);
      return this.cache.price || this.getMockPriceData();
    }
  }

  async fetchCoinGecko() {
    const apiKey = import.meta.env.VITE_COINGECKO_API_KEY;
    const url = apiKey 
      ? `https://api.coingecko.com/api/v3/coins/ripple?localization=false&tickers=false&community_data=false&developer_data=false&x_cg_demo_api_key=${apiKey}`
      : 'https://api.coingecko.com/api/v3/coins/ripple?localization=false&tickers=false&community_data=false&developer_data=false';
    
    const response = await fetch(url);
    const data = await response.json();
    
    return {
      price: data.market_data.current_price.usd,
      priceChange24h: data.market_data.price_change_percentage_24h,
      priceChange7d: data.market_data.price_change_percentage_7d,
      priceChange30d: data.market_data.price_change_percentage_30d,
      marketCap: data.market_data.market_cap.usd,
      volume24h: data.market_data.total_volume.usd,
      circulatingSupply: data.market_data.circulating_supply,
      totalSupply: data.market_data.total_supply,
      maxSupply: data.market_data.max_supply,
      ath: data.market_data.ath.usd,
      athDate: data.market_data.ath_date.usd,
      atl: data.market_data.atl.usd,
      atlDate: data.market_data.atl_date.usd,
      marketCapRank: data.market_cap_rank,
      fullyDilutedValuation: data.market_data.fully_diluted_valuation?.usd
    };
  }

  async fetchCoinMarketCap() {
    // Fallback source - requires API key for production
    // For demo, return null to fall back to CoinGecko
    return null;
  }

  // Fetch XRP-specific news from multiple sources
  async getNewsData() {
    try {
      const [cryptoNews, rssFeeds] = await Promise.allSettled([
        this.fetchCryptoNews(),
        this.fetchRSSFeeds()
      ]);

      const news = [];
      
      if (cryptoNews.status === 'fulfilled') {
        news.push(...cryptoNews.value);
      }
      
      if (rssFeeds.status === 'fulfilled') {
        news.push(...rssFeeds.value);
      }

      // Deduplicate and sort by relevance and recency
      const deduplicated = this.deduplicateNews(news);
      const sorted = deduplicated.sort((a, b) => {
        const scoreA = this.calculateNewsRelevance(a);
        const scoreB = this.calculateNewsRelevance(b);
        return scoreB - scoreA;
      });

      return sorted.slice(0, 20); // Top 20 most relevant
    } catch (error) {
      console.error('News fetch failed:', error);
      return this.cache.news || [];
    }
  }

  async fetchCryptoNews() {
    try {
      const token = import.meta.env.VITE_CRYPTOPANIC_API_KEY;
      if (!token) {
        console.warn('CryptoPanic API key not set, using mock news');
        return this.getMockNews();
      }
      
      const response = await fetch(
        `https://cryptopanic.com/api/v1/posts/?auth_token=${token}&currencies=XRP&public=true`
      );
      const data = await response.json();
      
      return data.results.map(item => ({
        title: item.title,
        url: item.url,
        source: item.source.title,
        publishedAt: item.published_at,
        sentiment: this.analyzeSentiment(item.title),
        votes: item.votes,
        relevanceScore: this.calculateNewsRelevance(item)
      }));
    } catch (error) {
      console.error('CryptoPanic fetch failed:', error);
      return this.getMockNews();
    }
  }

  async fetchRSSFeeds() {
    // Aggregate from multiple RSS feeds
    const feeds = [
      'https://u.today/rss/xrp',
      // Add more XRP-focused RSS feeds
    ];

    const allItems = [];
    
    for (const feed of feeds) {
      try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed)}`);
        const data = await response.json();
        
        if (data.items) {
          allItems.push(...data.items.map(item => ({
            title: item.title,
            url: item.link,
            source: data.feed.title,
            publishedAt: item.pubDate,
            description: item.description,
            sentiment: this.analyzeSentiment(item.title + ' ' + item.description)
          })));
        }
      } catch (error) {
        console.error(`RSS feed ${feed} failed:`, error);
      }
    }

    return allItems;
  }

  // Calculate news relevance score
  calculateNewsRelevance(newsItem) {
    let score = 0;
    
    // Recency (up to 50 points)
    const ageHours = (Date.now() - new Date(newsItem.publishedAt)) / (1000 * 60 * 60);
    score += Math.max(0, 50 - ageHours);
    
    // Votes/engagement (up to 30 points)
    if (newsItem.votes) {
      score += Math.min(30, newsItem.votes.positive - newsItem.votes.negative);
    }
    
    // Source credibility (up to 20 points)
    const credibleSources = ['Bloomberg', 'Reuters', 'CoinDesk', 'Cointelegraph'];
    if (credibleSources.some(s => newsItem.source.includes(s))) {
      score += 20;
    }
    
    return score;
  }

  // Analyze sentiment from text
  analyzeSentiment(text) {
    const positive = ['surge', 'gain', 'bullish', 'rally', 'breakthrough', 'partnership', 'adoption', 'win', 'success'];
    const negative = ['crash', 'drop', 'bearish', 'loss', 'lawsuit', 'decline', 'fall', 'concern'];
    
    const lowerText = text.toLowerCase();
    const positiveCount = positive.filter(word => lowerText.includes(word)).length;
    const negativeCount = negative.filter(word => lowerText.includes(word)).length;
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  // Deduplicate news items
  deduplicateNews(newsItems) {
    const seen = new Set();
    return newsItems.filter(item => {
      const key = item.title.toLowerCase().slice(0, 50);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  // Get on-chain metrics
  async getOnChainData() {
    try {
      // This would integrate with XRP Ledger APIs or analytics platforms
      // For now, return structured placeholder
      return {
        activeAccounts24h: null,
        transactions24h: null,
        averageFee: null,
        ledgerIndex: null,
        escrowedXRP: null,
        // Could add: whale movements, exchange flows, etc.
      };
    } catch (error) {
      console.error('On-chain data fetch failed:', error);
      return null;
    }
  }

  // Calculate market sentiment index
  async getMarketSentiment() {
    try {
      const news = this.cache.news || await this.getNewsData();
      
      const sentimentCounts = news.reduce((acc, item) => {
        acc[item.sentiment] = (acc[item.sentiment] || 0) + 1;
        return acc;
      }, { positive: 0, neutral: 0, negative: 0 });

      const total = Object.values(sentimentCounts).reduce((a, b) => a + b, 0);
      
      return {
        score: total > 0 ? ((sentimentCounts.positive - sentimentCounts.negative) / total) * 100 : 0,
        breakdown: sentimentCounts,
        interpretation: this.interpretSentiment(sentimentCounts, total)
      };
    } catch (error) {
      console.error('Sentiment calculation failed:', error);
      return {
        score: 0,
        breakdown: { positive: 0, neutral: 0, negative: 0 },
        interpretation: 'Neutral'
      };
    }
  }

  interpretSentiment(counts, total) {
    if (total === 0) return 'Neutral';
    const positiveRatio = counts.positive / total;
    if (positiveRatio > 0.6) return 'Strong Bullish';
    if (positiveRatio > 0.4) return 'Moderately Bullish';
    if (positiveRatio > 0.3) return 'Neutral';
    if (positiveRatio > 0.2) return 'Moderately Bearish';
    return 'Strong Bearish';
  }

  // Get complete market analysis package
  async getCompleteAnalysis() {
    const [price, news, onchain, sentiment] = await Promise.all([
      this.getPriceData(),
      this.getNewsData(),
      this.getOnChainData(),
      this.getMarketSentiment()
    ]);

    this.cache = { price, news, onchain, sentiment, lastUpdate: Date.now() };

    return {
      price,
      news,
      onchain,
      sentiment,
      metadata: {
        lastUpdate: this.cache.lastUpdate,
        sources: ['CoinGecko', 'CryptoPanic', 'RSS Aggregation'],
        nextUpdate: this.cache.lastUpdate + (60 * 1000) // 1 minute
      }
    };
  }

  // Format data for blog post context
  formatForBlogContext() {
    if (!this.cache.price || !this.cache.sentiment) {
      return null;
    }

    const price = this.cache.price;
    const sentiment = this.cache.sentiment;

    return {
      summary: `XRP trading at $${price.price.toFixed(4)} (${price.priceChange24h > 0 ? '+' : ''}${price.priceChange24h.toFixed(2)}% 24h). Market sentiment: ${sentiment.interpretation}.`,
      metrics: {
        price: price.price,
        change24h: price.priceChange24h,
        volume: price.volume24h,
        marketCap: price.marketCap,
        sentiment: sentiment.score
      },
      topNews: this.cache.news?.slice(0, 3).map(n => ({
        title: n.title,
        url: n.url,
        sentiment: n.sentiment
      }))
    };
  }

  // Mock data for development/fallback
  getMockPriceData() {
    return {
      price: 2.45,
      priceChange24h: 3.2,
      priceChange7d: -1.5,
      priceChange30d: 12.8,
      marketCap: 142000000000,
      volume24h: 8500000000,
      circulatingSupply: 57900000000,
      totalSupply: 99988000000,
      maxSupply: 100000000000,
      marketCapRank: 3,
      ath: 3.84,
      athDate: '2018-01-07',
      atl: 0.002802,
      atlDate: '2014-07-07',
      fullyDilutedValuation: 245000000000,
      dataSource: 'Mock',
      timestamp: Date.now()
    };
  }

  getMockNews() {
    return [
      {
        title: 'XRP Ledger Sees Increased Institutional Activity',
        url: '#',
        source: 'Crypto News',
        publishedAt: new Date().toISOString(),
        sentiment: 'positive',
        votes: { positive: 10, negative: 2 }
      },
      {
        title: 'Ripple Partners with Major Financial Institution',
        url: '#',
        source: 'Finance Today',
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
        sentiment: 'positive',
        votes: { positive: 15, negative: 1 }
      },
      {
        title: 'XRP Network Upgrade Enhances Transaction Speed',
        url: '#',
        source: 'Blockchain Today',
        publishedAt: new Date(Date.now() - 7200000).toISOString(),
        sentiment: 'positive',
        votes: { positive: 8, negative: 1 }
      }
    ];
  }

  // Start auto-updating
  startAutoUpdate(intervalMs = 60000) {
    this.stopAutoUpdate();
    this.getCompleteAnalysis(); // Initial fetch
    this.updateInterval = setInterval(() => {
      this.getCompleteAnalysis();
    }, intervalMs);
  }

  stopAutoUpdate() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }
}

export default new XRPMarketService();
