import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, ChevronDown, ChevronUp, ExternalLink, Activity } from 'lucide-react';
import xrpMarketService from './xrpMarketService.js';

const XRPMarketWidget = () => {
  const [data, setData] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
    xrpMarketService.startAutoUpdate(60000); // Update every minute

    return () => xrpMarketService.stopAutoUpdate();
  }, []);

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

  if (loading && !data) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-800 rounded w-1/3 mb-4"></div>
          <div className="h-8 bg-gray-800 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="bg-red-900/20 border border-red-800 rounded-lg p-6">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  const price = data?.price;
  const sentiment = data?.sentiment;
  const news = data?.news || [];

  const formatNumber = (num, decimals = 2) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(decimals)}`;
  };

  const formatPercent = (num) => {
    const formatted = num.toFixed(2);
    return num >= 0 ? `+${formatted}%` : `${formatted}%`;
  };

  const PriceChangeIndicator = ({ value }) => {
    const isPositive = value >= 0;
    return (
      <span className={`flex items-center gap-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
        {formatPercent(value)}
      </span>
    );
  };

  return (
    <div className="bg-gradient-to-br from-matte-black to-charcoal border border-white/10 rounded-lg shadow-xl">
      {/* Compact View */}
      <div 
        className="p-6 cursor-pointer hover:bg-gray-800/30 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-electric-teal to-white/80 rounded-full flex items-center justify-center">
              <Activity className="text-black" size={20} />
              
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">XRP Live Analysis</h3>
              <p className="text-xs text-gray-400">Real-time market intelligence</p>
            </div>
          </div>
          {expanded ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-400 mb-1">Current Price</p>
            <p className="text-2xl font-bold text-white">${price?.price.toFixed(4)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">24h Change</p>
            <div className="text-lg font-semibold">
              <PriceChangeIndicator value={price?.priceChange24h || 0} />
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Market Cap</p>
            <p className="text-lg font-semibold text-white">{formatNumber(price?.marketCap)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Sentiment</p>
            <p className={`text-lg font-semibold ${
              sentiment?.score > 20 ? 'text-green-400' : 
              sentiment?.score < -20 ? 'text-red-400' : 
              'text-yellow-400'
            }`}>
              {sentiment?.interpretation || 'Neutral'}
            </p>
          </div>
        </div>
      </div>

      {/* Expanded View */}
      {expanded && (
        <div className="border-t border-gray-800 p-6 space-y-6">
          {/* Detailed Metrics */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Detailed Metrics</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 p-3 rounded">
                <p className="text-xs text-gray-400">7-Day Change</p>
                <div className="text-sm font-semibold mt-1">
                  <PriceChangeIndicator value={price?.priceChange7d || 0} />
                </div>
              </div>
              <div className="bg-gray-800/50 p-3 rounded">
                <p className="text-xs text-gray-400">30-Day Change</p>
                <div className="text-sm font-semibold mt-1">
                  <PriceChangeIndicator value={price?.priceChange30d || 0} />
                </div>
              </div>
              <div className="bg-gray-800/50 p-3 rounded">
                <p className="text-xs text-gray-400">24h Volume</p>
                <p className="text-sm font-semibold text-white mt-1">{formatNumber(price?.volume24h)}</p>
              </div>
              <div className="bg-gray-800/50 p-3 rounded">
                <p className="text-xs text-gray-400">Circulating Supply</p>
                <p className="text-sm font-semibold text-white mt-1">
                  {((price?.circulatingSupply || 0) / 1e9).toFixed(2)}B XRP
                </p>
              </div>
              <div className="bg-gray-800/50 p-3 rounded">
                <p className="text-xs text-gray-400">Market Rank</p>
                <p className="text-sm font-semibold text-white mt-1">#{price?.marketCapRank}</p>
              </div>
              <div className="bg-gray-800/50 p-3 rounded">
                <p className="text-xs text-gray-400">Data Source</p>
                <p className="text-sm font-semibold text-white mt-1">{price?.dataSource}</p>
              </div>
            </div>
          </div>

          {/* Sentiment Breakdown */}
          {sentiment && (
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-3">News Sentiment Analysis</h4>
              <div className="bg-gray-800/50 p-4 rounded">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-400">Sentiment Score</span>
                  <span className={`text-lg font-bold ${
                    sentiment.score > 20 ? 'text-green-400' : 
                    sentiment.score < -20 ? 'text-red-400' : 
                    'text-yellow-400'
                  }`}>
                    {sentiment.score.toFixed(1)}
                  </span>
                </div>
                <div className="flex gap-2 text-xs">
                  <div className="flex-1 bg-green-900/30 p-2 rounded text-center">
                    <p className="text-green-400 font-semibold">{sentiment.breakdown.positive}</p>
                    <p className="text-gray-400">Positive</p>
                  </div>
                  <div className="flex-1 bg-gray-900/30 p-2 rounded text-center">
                    <p className="text-gray-400 font-semibold">{sentiment.breakdown.neutral}</p>
                    <p className="text-gray-400">Neutral</p>
                  </div>
                  <div className="flex-1 bg-red-900/30 p-2 rounded text-center">
                    <p className="text-red-400 font-semibold">{sentiment.breakdown.negative}</p>
                    <p className="text-gray-400">Negative</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recent News */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-gray-300">Recent News</h4>
              <a 
                href="#/market-analysis" 
                className="text-xs text-electric-teal hover:text-white flex items-center gap-1"
              >
                View All <ExternalLink size={12} />
              </a>
            </div>
            <div className="space-y-2">
              {news.slice(0, 5).map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-gray-800/50 p-3 rounded hover:bg-gray-800 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-sm text-white group-hover:text-electric-teal transition-colors line-clamp-2">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-gray-400">{item.source}</p>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          item.sentiment === 'positive' ? 'bg-green-900/30 text-green-400' :
                          item.sentiment === 'negative' ? 'bg-red-900/30 text-red-400' :
                          'bg-gray-900/30 text-gray-400'
                        }`}>
                          {item.sentiment}
                        </span>
                      </div>
                    </div>
                    <ExternalLink size={14} className="text-gray-600 group-hover:text-electric-teal flex-shrink-0" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Last Update */}
          <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-800">
            Last updated: {new Date(data?.metadata.lastUpdate).toLocaleTimeString()}
          </div>
        </div>
      )}
    </div>
  );
};

export default XRPMarketWidget;
