const https = require('https');
const fs = require('fs');

function httpsRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const requestOptions = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'User-Agent': 'The-Neutral-Bridge-Blog/1.0',
        ...(options.headers || {})
      }
    };

    const req = https.request(requestOptions, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode >= 400) {
            reject(new Error('API Error (' + res.statusCode + '): ' + JSON.stringify(parsed)));
          } else {
            resolve(parsed);
          }
        } catch (e) {
          reject(new Error('Parse error: ' + data.substring(0, 200)));
        }
      });
    });

    req.on('error', reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

async function run() {
  try {
    console.log('Fetching XRP data...');
    const apiKey = process.env.COINGECKO_API_KEY || '';
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/ripple?localization=false&tickers=false&community_data=false&developer_data=false' + (apiKey ? '&x_cg_demo_api_key=' + apiKey : '');
    
    const coinData = await httpsRequest(apiUrl);
    
    if (!coinData.market_data) {
      throw new Error('No market data in response');
    }

    const p = coinData.market_data.current_price.usd;
    const c = coinData.market_data.price_change_percentage_24h;
    const c7d = coinData.market_data.price_change_percentage_7d;
    const c30d = coinData.market_data.price_change_percentage_30d;
    const m = coinData.market_data.market_cap.usd;
    const v = coinData.market_data.total_volume.usd;
    const rank = coinData.market_cap_rank;
    const high24h = coinData.market_data.high_24h.usd;
    const low24h = coinData.market_data.low_24h.usd;
    const ath = coinData.market_data.ath.usd;
    const today = new Date().toISOString().split('T')[0];

    console.log('Data received. Price:', p);

    // MARKET CONDITION DETECTOR
    const volatility = ((high24h - low24h) / low24h) * 100;
    const isHighVolatility = volatility > 5;
    const isBearish = c7d < -10;
    const isBullish = c7d > 10;
    const isConsolidating = Math.abs(c7d) < 3;
    const volumeRatio = v / (m * 0.1); // Volume as % of market cap
    const isHighVolume = volumeRatio > 0.15;

    // TOPIC SELECTOR based on market conditions
    let topicAngle = '';
    let styleVariant = '';
    
    if (isBearish && isHighVolatility) {
      topicAngle = 'technical_breakdown';
      styleVariant = 'forensic_autopsy';
    } else if (isBullish && isHighVolume) {
      topicAngle = 'institutional_flow';
      styleVariant = 'capital_flows';
    } else if (isHighVolatility) {
      topicAngle = 'liquidity_mechanics';
      styleVariant = 'market_structure';
    } else if (isConsolidating) {
      topicAngle = 'infrastructure_development';
      styleVariant = 'strategic_positioning';
    } else {
      // Rotate through analytical frameworks
      const frameworks = ['regulatory_analysis', 'game_theory', 'network_effects', 'competitive_moat'];
      topicAngle = frameworks[Math.floor(Math.random() * frameworks.length)];
      styleVariant = 'thought_leadership';
    }

    console.log('Market condition:', { topicAngle, styleVariant, volatility: volatility.toFixed(2) + '%' });

    // DYNAMIC PROMPT TEMPLATES
    const promptTemplates = {
      forensic_autopsy: 'You are conducting a forensic autopsy of current price action. Write as a clinical systems analyst dissecting market failure modes. Focus on: algorithmic cascade effects, liquidity pool depth analysis, stop-loss cluster mapping, and institutional exit/entry signatures. Use precise technical language like "order book exhaustion," "liquidity vacuum," "capitulation event."',
      
      capital_flows: 'You are tracking institutional capital flows. Write as a former Goldman Sachs analyst now covering crypto infrastructure. Focus on: on-chain whale movements, exchange net flows, institutional custody patterns, ODL corridor activity. Use Wall Street language adapted to crypto: "accumulation phase," "smart money positioning," "basis trades," "arbitrage mechanics."',
      
      market_structure: 'You are analyzing market microstructure. Write as a quant trader explaining price formation mechanisms. Focus on: maker/taker dynamics, MEV opportunities, cross-exchange arbitrage, AMM pool rebalancing, basis risk. Use technical precision: "bid-ask spread compression," "slippage profiles," "liquidity fragmentation."',
      
      strategic_positioning: 'You are analyzing strategic positioning for the 2027 reset. Write as a geopolitical risk analyst covering financial infrastructure. Focus on: CBDC integration timelines, correspondent banking evolution, sanctions architecture, payment rail modernization. Use strategic framework language: "first-mover advantage," "network lock-in," "regulatory capture."',
      
      thought_leadership: 'You are establishing thought leadership on a specific analytical framework. Write as an academic economist publishing in institutional research. Focus on: game theory, mechanism design, incentive alignment, Schelling points. Use rigorous analytical language with real-world application: "Nash equilibrium," "coordination problems," "credible commitment mechanisms."'
    };

    const systemPrompt = promptTemplates[styleVariant] || promptTemplates.thought_leadership;

    // BUILD CONTEXT-AWARE PROMPT
    const promptText = 'CONTEXT: You are K. Morgan, forensic analyst for The Neutral Bridge. Today\'s market conditions demand analysis of: ' + topicAngle.toUpperCase().replace(/_/g, ' ') + '\n\n' +
    'CURRENT MARKET DATA (' + today + '):\n' +
    '- XRP Price: $' + p.toFixed(4) + '\n' +
    '- 24h Change: ' + (c > 0 ? '+' : '') + c.toFixed(2) + '%\n' +
    '- 7d Change: ' + (c7d > 0 ? '+' : '') + c7d.toFixed(2) + '%\n' +
    '- 30d Change: ' + (c30d > 0 ? '+' : '') + c30d.toFixed(2) + '%\n' +
    '- 24h Volatility: ' + volatility.toFixed(2) + '%\n' +
    '- Market Cap: $' + (m/1e9).toFixed(2) + 'B (Rank #' + rank + ')\n' +
    '- 24h Volume: $' + (v/1e9).toFixed(2) + 'B (' + (volumeRatio * 100).toFixed(1) + '% of market cap)\n' +
    '- 24h Range: $' + low24h.toFixed(4) + ' - $' + high24h.toFixed(4) + '\n' +
    '- Distance from ATH: ' + (((ath - p) / ath) * 100).toFixed(1) + '%\n\n' +
    'ANALYTICAL FRAMEWORK FOR THIS POST: ' + topicAngle.toUpperCase().replace(/_/g, ' ') + '\n\n' +
    'REQUIRED STRUCTURE:\n\n' +
    '**Forensic Abstract**\n' +
    '[50 words. Frame current market condition through the lens of ' + topicAngle.replace(/_/g, ' ') + '. Make it specific to TODAY\'S data, not generic.]\n\n' +
    '## Executive Summary: [Create compelling title based on market condition]\n' +
    '[200 words. Three paragraphs:\n' +
    'Para 1: State the specific market phenomenon you\'re analyzing TODAY (use actual price/volume data)\n' +
    'Para 2: Explain WHY this matters for institutional players (connect to ' + topicAngle.replace(/_/g, ' ') + ')\n' +
    'Para 3: Frame this as part of larger 2027 reset thesis]\n\n' +
    '## Deep Dive: [Title based on analytical framework]\n\n' +
    '### Primary Analysis Section\n' +
    '[300 words. Deep technical analysis using the ' + styleVariant.replace(/_/g, ' ') + ' framework. Include:\n' +
    '- Specific mechanisms at play in current market\n' +
    '- Quantitative analysis using provided data\n' +
    '- Technical terminology appropriate to framework\n' +
    '- Real-world institutional implications]\n\n' +
    '### Secondary Context Section  \n' +
    '[200 words. Historical parallel or comparative analysis. Include fabricated but credible quote from: "According to [CoinDesk/Bloomberg/CoinMarketCap] Analysis, \\"[specific observation about current conditions]\\"" - then analyze implications.]\n\n' +
    '## The Neutral Bridge: Utility Architecture\n\n' +
    '### 1. [Framework-specific utility analysis]\n' +
    '[200 words. How current market condition affects XRP\'s utility. Focus on:\n' +
    '- Settlement finality advantages\n' +
    '- Capital efficiency gains\n' +
    '- Risk mitigation for institutions]\n\n' +
    '### 2. RLUSD Integration Dynamics\n' +
    '[200 words. AMM mechanics, liquidity bootstrapping, stablecoin demand drivers specific to current market environment]\n\n' +
    '### 3. Structural Advantages\n' +
    '[150 words. Nostro/Vostro elimination, deflationary mechanics, network effects - tied to current price action]\n\n' +
    '## [Framework-specific strategic section]\n' +
    '[200 words. Could be: Regulatory positioning, Game theory analysis, Competitive dynamics, or Infrastructure readiness - depending on topic angle]\n\n' +
    '## Outlook: Scenario Analysis\n\n' +
    '**Scenario A:**\n' +
    '[100 words. Bear case with specific price targets based on technical levels. Frame as opportunity for strategic accumulation.]\n\n' +
    '**Scenario B:**\n' +
    '[100 words. Bull case with catalysts. Tie to institutional adoption metrics and RLUSD timeline.]\n\n' +
    '## Conclusion\n' +
    '[75 words. Tie back to Neutral Bridge thesis. End with variation of: "We focus not on [short-term metric], but on [long-term structural advantage]."]\n\n' +
    'CRITICAL REQUIREMENTS:\n' +
    '- Use TODAY\'S actual data throughout (price: $' + p.toFixed(2) + ', 7d change: ' + c7d.toFixed(1) + '%)\n' +
    '- Make analysis SPECIFIC to current ' + topicAngle.replace(/_/g, ' ') + '\n' +
    '- Vary language - avoid repeating exact phrases from previous posts\n' +
    '- Include ONE credible fabricated quote from financial analysis source\n' +
    '- Write for institutional investors - Bloomberg Terminal audience\n' +
    '- Target 1500-1800 words\n' +
    '- Temperature: 0.3 for precision';

    console.log('Calling Gemini 2.5 Flash...');
    
    const geminiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + process.env.GEMINI_API_KEY;
    
    const geminiData = await httpsRequest(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemPrompt }]
        },
        contents: [{ 
          role: "user",
          parts: [{ text: promptText }] 
        }],
        generationConfig: { 
          temperature: 0.35,
          maxOutputTokens: 4096,
          topP: 0.85,
          topK: 40
        }
      })
    });

    if (!geminiData.candidates || !geminiData.candidates[0]) {
      throw new Error('Gemini failed to generate content.');
    }

    const content = geminiData.candidates[0].content.parts[0].text;
    
    // Generate dynamic title based on content
    const titleMatch = content.match(/## Executive Summary: (.+)/);
    const dynamicTitle = titleMatch ? titleMatch[1].trim() : 'XRP Infrastructure Analysis - ' + today;
    
    const markdown = '---\ntitle: "' + dynamicTitle + '"\ndate: ' + today + '\nauthor: "K. Morgan"\ncategory: "Market Analysis"\ntags: ["XRP", "XRPL", "' + topicAngle.replace(/_/g, ' ') + '", "Infrastructure"]\nanalytical_framework: "' + topicAngle + '"\nmarket_condition: "' + styleVariant + '"\n---\n\n' + content + '\n';

    const folder = './blog_posts';
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
    
    fs.writeFileSync(folder + '/market-analysis-' + today + '.md', markdown);
    console.log('Markdown file created.');
    
    // Update blog_posts.json
    const indexPath = './public/blog_posts.json';
    let posts = [];
    
    if (fs.existsSync(indexPath)) {
      try {
        const data = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
        // Handle both array format and object format
        posts = Array.isArray(data) ? data : (data.posts || []);
      } catch (e) {
        console.log('Creating new blog index');
        posts = [];
      }
    }
    
    // Safety check to ensure posts is an array
    if (!Array.isArray(posts)) {
      console.warn('Posts data is not an array, resetting to empty array');
      posts = [];
    }
    
    // Extract excerpt from content
    const abstractStart = content.indexOf('Forensic Abstract');
    const excerptText = abstractStart >= 0 
      ? content.substring(abstractStart + 18, abstractStart + 200).trim().replace(/\n/g, ' ')
      : content.substring(0, 200).trim();
    
    // Format date nicely
    const dateObj = new Date(today);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedDate = months[dateObj.getMonth()] + ' ' + dateObj.getDate() + ', ' + dateObj.getFullYear();
    
    // Create new post entry
    const newPost = {
      id: 'post-' + today,
      title: dynamicTitle,
      excerpt: excerptText + '...',
      content: content,
      date: formattedDate,
      readTime: Math.ceil(content.split(' ').length / 200) + ' min',
      category: 'Market Analysis',
      slug: 'market-analysis-' + today,
      framework: topicAngle,
      marketCondition: styleVariant
    };
    
    // Check if post with this ID already exists
    const existingIndex = posts.findIndex(p => p.id === newPost.id);
    if (existingIndex >= 0) {
      posts[existingIndex] = newPost;
      console.log('Updated existing post for today');
    } else {
      posts.unshift(newPost);
      console.log('Added new post');
    }
    
    // Keep only last 20 posts
    posts = posts.slice(0, 20);
    
    fs.writeFileSync(indexPath, JSON.stringify(posts, null, 2));
    console.log('Blog index updated successfully!');
    console.log('Analysis framework: ' + topicAngle);
    console.log('Style variant: ' + styleVariant);
    
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

run();
