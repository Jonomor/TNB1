import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, RefreshCw, Download, ExternalLink, 
  Activity, BarChart3, Newspaper, Globe, ChevronRight,
  AlertCircle, Info
} from 'lucide-react';
import xrpMarketService from '../src/services/xrpMarketService.js';

const MarketAnalysisPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    loadData();
    
    if (autoRefresh) {
      xrpMarketService.startAutoUpdate(60000);
    } else {
      xrpMarketService.stopAutoUpdate();
    }

    return () => xrpMarketService.stopAutoUpdate();
  }, [autoRefresh]);

  const loadData = async () => {
    try {
      setLoading(true);
      const analysis = await xrpMarketService.getCompleteAnalysis();
      setData(analysis);
      setError(null);
    } catch (err) {
      setError('Failed to load market data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num, decimals = 2) => {
    if (!num) return 'N/A';
    if (num >= 1e9) return `$${(num / 1e9).toFixed(decimals)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(decimals)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(decimals)}K`;
    return `$${num.toFixed(decimals)}`;
  };

  const formatPercent = (num) => {
    if (num === null || num === undefined) return 'N/A';
    const formatted = num.toFixed(2);
    return num >= 0 ? `+${formatted}%` : `${formatted}%`;
  };

  const exportData = () => {
    const exportObj = {
      timestamp: new Date().toISOString(),
      price: data?.price,
      sentiment: data?.sentiment,
      news: data?.news?.slice(0, 10),
      metadata: data?.metadata
    };
    
    const dataStr = JSON.stringify(exportObj, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `xrp-analysis-${Date.now()}.json`;
    link.click();
  };

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-gray-950 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-gray-800 rounded w-1/3"></div>
            <div className="grid grid-cols-4 gap-6">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-32 bg-gray-800 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const price = data?.price;
  const sentiment = data?.sentiment;
  const news = data?.news || [];

  const PriceChangeIndicator = ({ value, size = 'md' }) => {
    if (value === null || value === undefined) return <span className="text-gray-500">N/A</span>;
    const isPositive = value >= 0;
    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-xl'
    };
    
    return (
      <span className={`flex items-center gap-1 font-semibold ${sizeClasses[size]} ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        {isPositive ? <TrendingUp size={size === 'lg' ? 24 : 16} /> : <TrendingDown size={size === 'lg' ? 24 : 16} />}
        {formatPercent(value)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">XRP Market Analysis</h1>
              <p className="text-gray-400">Real-time institutional-grade market intelligence</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  autoRefresh 
                    ? 'border-green-600 text-green-400 bg-green-900/20' 
                    : 'border-gray-700 text-gray-400 hover:bg-gray-800'
                }`}
              >
                <RefreshCw size={16} className={`inline mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
                {autoRefresh ? 'Auto-Refresh On' : 'Auto-Refresh Off'}
              </button>
              <button
                onClick={loadData}
                className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors"
              >
                <RefreshCw size={16} className="inline mr-2" />
                Refresh Now
              </button>
              <button
                onClick={exportData}
                className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors"
              >
                <Download size={16} className="inline mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-900/20 to-blue-950/20 border border-blue-800/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Current Price</p>
              <Activity className="text-blue-400" size={20} />
            </div>
            <p className="text-3xl font-bold mb-1">${price?.price.toFixed(4)}</p>
            <PriceChangeIndicator value={price?.priceChange24h} />
          </div>

          <div className="bg-gradient-to-br from-purple-900/20 to-purple-950/20 border border-purple-800/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Market Cap</p>
              <BarChart3 className="text-purple-400" size={20} />
            </div>
            <p className="text-3xl font-bold mb-1">{formatNumber(price?.marketCap)}</p>
            <p className="text-sm text-gray-400">Rank #{price?.marketCapRank}</p>
          </div>

          <div className="bg-gradient-to-br from-green-900/20 to-green-950/20 border border-green-800/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">24h Volume</p>
              <Globe className="text-green-400" size={20} />
            </div>
            <p className="text-3xl font-bold mb-1">{formatNumber(price?.volume24h)}</p>
            <p className="text-sm text-gray-400">
              {((price?.volume24h / price?.marketCap) * 100).toFixed(2)}% of MCap
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-900/20 to-orange-950/20 border border-orange-800/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Market Sentiment</p>
              <Newspaper className="text-orange-400" size={20} />
            </div>
            <p className={`text-3xl font-bold mb-1 ${
              sentiment?.score > 20 ? 'text-green-400' : 
              sentiment?.score < -20 ? 'text-red-400' : 
              'text-yellow-400'
            }`}>
              {sentiment?.interpretation || 'N/A'}
            </p>
            <p className="text-sm text-gray-400">
              Score: {sentiment?.score.toFixed(1)}
            </p>
          </div>
        </div>

        {/* Price Performance */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">Price Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <p className="text-sm text-gray-400 mb-2">24 Hour Change</p>
                <PriceChangeIndicator value={price?.priceChange24h} size="lg" />
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <p className="text-sm text-gray-400 mb-2">7 Day Change</p>
                <PriceChangeIndicator value={price?.priceChange7d} size="lg" />
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <p className="text-sm text-gray-400 mb-2">30 Day Change</p>
                <PriceChangeIndicator value={price?.priceChange30d} size="lg" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <p className="text-sm text-gray-400 mb-2">All-Time High</p>
                <p className="text-2xl font-bold text-white mb-1">{formatNumber(price?.ath, 4)}</p>
                <p className="text-xs text-gray-500">
                  {price?.athDate ? new Date(price.athDate).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <p className="text-sm text-gray-400 mb-2">All-Time Low</p>
                <p className="text-2xl font-bold text-white mb-1">{formatNumber(price?.atl, 6)}</p>
                <p className="text-xs text-gray-500">
                  {price?.atlDate ? new Date(price.atlDate).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <p className="text-sm text-gray-400 mb-2">From ATH</p>
                <p className="text-2xl font-bold text-red-400">
                  {price?.ath ? ((price.price / price.ath - 1) * 100).toFixed(2) : 'N/A'}%
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <p className="text-sm text-gray-400 mb-2">Circulating Supply</p>
                <p className="text-xl font-bold text-white">
                  {price?.circulatingSupply ? (price.circulatingSupply / 1e9).toFixed(2) : 'N/A'}B
                </p>
                <p className="text-xs text-gray-500">
                  {price?.totalSupply ? ((price.circulatingSupply / price.totalSupply) * 100).toFixed(1) : 'N/A'}% of total
                </p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <p className="text-sm text-gray-400 mb-2">Total Supply</p>
                <p className="text-xl font-bold text-white">
                  {price?.totalSupply ? (price.totalSupply / 1e9).toFixed(2) : 'N/A'}B
                </p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <p className="text-sm text-gray-400 mb-2">Fully Diluted Valuation</p>
                <p className="text-xl font-bold text-white">
                  {formatNumber(price?.fullyDilutedValuation)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sentiment Analysis */}
        {sentiment && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6">Sentiment Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="bg-gray-800/50 p-6 rounded-lg mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400">Overall Sentiment Score</span>
                    <span className={`text-3xl font-bold ${
                      sentiment.score > 20 ? 'text-green-400' : 
                      sentiment.score < -20 ? 'text-red-400' : 
                      'text-yellow-400'
                    }`}>
                      {sentiment.score.toFixed(1)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all ${
                        sentiment.score > 20 ? 'bg-green-500' : 
                        sentiment.score < -20 ? 'bg-red-500' : 
                        'bg-yellow-500'
                      }`}
                      style={{ width: `${Math.min(100, Math.abs(sentiment.score))}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Interpretation: <span className="font-semibold text-white">{sentiment.interpretation}</span>
                  </p>
                </div>

                <div className="bg-gray-800/50 p-6 rounded-lg">
                  <p className="text-sm text-gray-400 mb-3">News Analysis Breakdown</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-green-400">Positive Articles</span>
                      <span className="font-bold">{sentiment.breakdown.positive}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Neutral Articles</span>
                      <span className="font-bold">{sentiment.breakdown.neutral}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-red-400">Negative Articles</span>
                      <span className="font-bold">{sentiment.breakdown.negative}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg">
                <p className="text-sm text-gray-400 mb-4">Sentiment Distribution</p>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-green-400">Positive</span>
                      <span className="text-white font-semibold">
                        {((sentiment.breakdown.positive / (sentiment.breakdown.positive + sentiment.breakdown.neutral + sentiment.breakdown.negative)) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ 
                          width: `${(sentiment.breakdown.positive / (sentiment.breakdown.positive + sentiment.breakdown.neutral + sentiment.breakdown.negative)) * 100}%` 
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Neutral</span>
                      <span className="text-white font-semibold">
                        {((sentiment.breakdown.neutral / (sentiment.breakdown.positive + sentiment.breakdown.neutral + sentiment.breakdown.negative)) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gray-500 h-2 rounded-full"
                        style={{ 
                          width: `${(sentiment.breakdown.neutral / (sentiment.breakdown.positive + sentiment.breakdown.neutral + sentiment.breakdown.negative)) * 100}%` 
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-red-400">Negative</span>
                      <span className="text-white font-semibold">
                        {((sentiment.breakdown.negative / (sentiment.breakdown.positive + sentiment.breakdown.neutral + sentiment.breakdown.negative)) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full"
                        style={{ 
                          width: `${(sentiment.breakdown.negative / (sentiment.breakdown.positive + sentiment.breakdown.neutral + sentiment.breakdown.negative)) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-900/20 border border-blue-800/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Info className="text-blue-400 flex-shrink-0 mt-0.5" size={18} />
                    <p className="text-sm text-gray-300">
                      Sentiment analysis is derived from natural language processing of recent news headlines and articles. 
                      Scores range from -100 (extremely bearish) to +100 (extremely bullish).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* News Feed */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Live News Feed</h2>
            <span className="text-sm text-gray-400">
              {news.length} articles analyzed
            </span>
          </div>
          
          <div className="space-y-3">
            {news.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-800/50 p-4 rounded-lg hover:bg-gray-800 transition-all group border border-transparent hover:border-gray-700"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 text-xs font-semibold rounded ${
                        item.sentiment === 'positive' ? 'bg-green-900/30 text-green-400' :
                        item.sentiment === 'negative' ? 'bg-red-900/30 text-red-400' :
                        'bg-gray-900/30 text-gray-400'
                      }`}>
                        {item.sentiment}
                      </span>
                      <span className="text-xs text-gray-500">{item.source}</span>
                      {item.publishedAt && (
                        <span className="text-xs text-gray-600">
                          {new Date(item.publishedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <h3 className="text-white group-hover:text-blue-400 transition-colors font-medium mb-1">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-gray-400 line-clamp-2">{item.description}</p>
                    )}
                  </div>
                  <ChevronRight className="text-gray-600 group-hover:text-blue-400 flex-shrink-0 transition-colors" size={20} />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <AlertCircle size={16} />
              <span>
                Data sources: {data?.metadata.sources.join(', ')}
              </span>
            </div>
            <div className="text-gray-500">
              Last updated: {data?.metadata.lastUpdate ? new Date(data.metadata.lastUpdate).toLocaleString() : 'N/A'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysisPage;
