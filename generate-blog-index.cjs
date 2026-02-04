const fs = require('fs');
const path = require('path');

// Function to parse frontmatter and content from markdown
function parseMarkdown(filepath) {
  const content = fs.readFileSync(filepath, 'utf8');
  
  // Extract frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  
  if (!frontmatterMatch) {
    console.warn(`No frontmatter found in ${filepath}`);
    return null;
  }
  
  const frontmatterText = frontmatterMatch[1];
  const bodyContent = frontmatterMatch[2].trim();
  
  // Parse frontmatter fields
  const frontmatter = {};
  frontmatterText.split('\n').forEach(line => {
    const match = line.match(/^(\w+):\s*(.+)$/);
    if (match) {
      const key = match[1];
      let value = match[2].trim();
      
      // Remove quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      
      // Parse arrays (tags)
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(v => v.trim().replace(/"/g, ''));
      }
      
      frontmatter[key] = value;
    }
  });
  
  return { frontmatter, content: bodyContent };
}

// Function to generate excerpt from content
function generateExcerpt(content, maxLength = 200) {
  // Remove markdown headers and formatting
  let plainText = content
    .replace(/^#+\s+/gm, '') // Remove headers
    .replace(/\*\*/g, '') // Remove bold
    .replace(/\*/g, '') // Remove italic
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links, keep text
    .replace(/`([^`]+)`/g, '$1') // Remove code formatting
    .trim();
  
  // Get first paragraph or maxLength characters
  const firstParagraph = plainText.split('\n\n')[0];
  if (firstParagraph.length <= maxLength) {
    return firstParagraph + '...';
  }
  
  return plainText.substring(0, maxLength).trim() + '...';
}

// Function to estimate read time
function estimateReadTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min`;
}

// Main function to scan blog_posts and generate index
function generateBlogIndex() {
  const blogPostsDir = path.join(__dirname, 'blog_posts');
  const outputPath = path.join(__dirname, 'public', 'blog_posts.json');
  
  if (!fs.existsSync(blogPostsDir)) {
    console.error('blog_posts directory not found!');
    process.exit(1);
  }
  
  // Get all markdown files
  const files = fs.readdirSync(blogPostsDir)
    .filter(file => file.endsWith('.md'))
    .sort()
    .reverse(); // Most recent first
  
  const posts = [];
  
  files.forEach(file => {
    const filepath = path.join(blogPostsDir, file);
    const parsed = parseMarkdown(filepath);
    
    if (!parsed) return; // Skip files without proper frontmatter
    
    const { frontmatter, content } = parsed;
    
    // Generate slug from filename
    const slug = file.replace('.md', '');
    
    // Create post object
    const post = {
      id: slug,
      title: frontmatter.title || 'Untitled',
      excerpt: generateExcerpt(content),
      date: frontmatter.date || new Date().toISOString().split('T')[0],
      readTime: estimateReadTime(content),
      category: frontmatter.category || frontmatter.tags?.[0] || 'Analysis',
      tags: frontmatter.tags || [],
      author: frontmatter.author || 'The Neutral Bridge',
      slug: slug,
      content: content
    };
    
    posts.push(post);
  });
  
  // Ensure output directory exists
  const publicDir = path.join(__dirname, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  // Write JSON file
  fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2));
  
  console.log(`✅ Generated blog index with ${posts.length} posts`);
  console.log(`📝 Output: ${outputPath}`);
  
  return posts;
}

// Run the script
if (require.main === module) {
  generateBlogIndex();
}

module.exports = { generateBlogIndex };
