// blog_poster.js - Automated blog content management
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs/promises';
import path from 'path';

const config = {
  apiKey: process.env.GEMINI_API_KEY,
  topic: process.env.BLOG_TOPIC || 'XRP and the 2027 Financial Reset'
};

// Generate blog post content
async function generateBlogPost() {
  console.log('📝 Generating blog post with Gemini AI...');
  
  const genAI = new GoogleGenerativeAI(config.apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
  
  const prompt = `You are K. Morgan, a Systems Engineer analyzing global financial infrastructure.

Write a blog post about: ${config.topic}

Requirements:
- Title: Compelling, under 60 characters
- Length: 800-1200 words
- Tone: Professional, forensic, engineering-focused (not hype)
- Structure: 
  * Hook (1-2 paragraphs)
  * Core Analysis (3-4 sections with headers)
  * Conclusion with key takeaway
- Include specific data points and technical details
- End with: "For the full engineering analysis, read The Neutral Bridge at theneutralbridge.com"
- Category: Choose ONE from: Timeline Analysis, Technical Analysis, Privacy & Security, Economic Analysis
- Read Time: Estimate (e.g., "8 min")

Format as JSON:
{
  "title": "...",
  "category": "...",
  "readTime": "...",
  "excerpt": "...", (2-3 sentences summarizing the post)
  "content": "..." (full markdown content with ## headers)
}`;

  const response = await model.generateContent(prompt);
  
  const text = response.response.text().replace(/```json|```/g, '').trim();
  const post = JSON.parse(text);
  
  // Add metadata
  post.id = Date.now().toString();
  post.date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  post.slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  console.log(`✅ Generated: "${post.title}"`);
  return post;
}

// Read existing blog posts
async function readBlogPosts() {
  const blogFile = path.join(process.cwd(), 'blog-posts.json');
  try {
    const data = await fs.readFile(blogFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return { posts: [] };
  }
}

// Save blog posts
async function saveBlogPosts(data) {
  const blogFile = path.join(process.cwd(), 'blog-posts.json');
  await fs.writeFile(blogFile, JSON.stringify(data, null, 2));
  console.log(`💾 Saved to ${blogFile}`);
}

// Update BlogPage.tsx with new posts
async function updateBlogPage(posts) {
  const blogPagePath = path.join(process.cwd(), 'src/components/BlogPage.tsx');
  
  // Read current file
  let content = await fs.readFile(blogPagePath, 'utf-8');
  
  // Generate posts array code
  const postsCode = `  const posts: BlogPost[] = ${JSON.stringify(posts, null, 4)};`;
  
  // Replace posts array
  content = content.replace(
    /const posts: BlogPost\[\] = \[[\s\S]*?\];/,
    postsCode
  );
  
  await fs.writeFile(blogPagePath, content);
  console.log('📄 Updated BlogPage.tsx');
}

// Main function
async function main() {
  console.log('🚀 Blog Post Automation');
  console.log('━'.repeat(60));
  
  try {
    // 1. Generate new post
    const newPost = await generateBlogPost();
    
    // 2. Read existing posts
    const data = await readBlogPosts();
    
    // 3. Add new post to beginning
    data.posts.unshift(newPost);
    
    // 4. Keep only last 20 posts
    if (data.posts.length > 20) {
      data.posts = data.posts.slice(0, 20);
    }
    
    // 5. Save to JSON file
    await saveBlogPosts(data);
    
    // 6. Update BlogPage.tsx
    await updateBlogPage(data.posts);
    
    console.log('━'.repeat(60));
    console.log('✨ Blog post published successfully!');
    console.log(`   Title: ${newPost.title}`);
    console.log(`   Category: ${newPost.category}`);
    console.log(`   Total posts: ${data.posts.length}`);
    console.log('━'.repeat(60));
    
  } catch (error) {
    console.error('💥 ERROR:', error.message);
    process.exit(1);
  }
}

main();
