// generate-sitemap-advanced.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.lendatech.co.zw';

// Static routes
const staticRoutes = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },
  { path: '/core-banking', changefreq: 'monthly', priority: 0.9 },
  { path: '/ssb', changefreq: 'monthly', priority: 0.9 },
  { path: '/custom', changefreq: 'monthly', priority: 0.8 },
  { path: '/chatbots', changefreq: 'monthly', priority: 0.8 },
  { path: '/integration', changefreq: 'monthly', priority: 0.8 },
  { path: '/about', changefreq: 'monthly', priority: 0.7 },
  { path: '/contact', changefreq: 'monthly', priority: 0.7 },
  { path: '/quote', changefreq: 'monthly', priority: 0.6 },
  { path: '/blog', changefreq: 'weekly', priority: 0.8 },
];

// Function to get blog posts dynamically
const getBlogPosts = () => {
  const blogDataPath = path.join(__dirname, 'src', 'data', 'blog-posts.json');
  
  if (fs.existsSync(blogDataPath)) {
    try {
      const blogData = JSON.parse(fs.readFileSync(blogDataPath, 'utf8'));
      return blogData.map(post => ({
        path: `/blog/${post.slug}`,
        changefreq: 'monthly',
        priority: 0.6,
        lastmod: post.publishedDate || new Date().toISOString().split('T')[0]
      }));
    } catch (error) {
      console.log('⚠️  No blog posts found or error reading blog data');
      return [];
    }
  }
  return [];
};

const today = new Date().toISOString().split('T')[0];

const generateSitemap = () => {
  const blogRoutes = getBlogPosts();
  const allRoutes = [...staticRoutes, ...blogRoutes];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

  allRoutes.forEach((route) => {
    const lastmod = route.lastmod || today;
    xml += `
  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  });

  xml += `
</urlset>`;

  return xml;
};

// Write sitemap
try {
  const sitemap = generateSitemap();
  const publicDir = path.join(__dirname, 'public');

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);

  console.log('✅ Sitemap generated successfully!');
  console.log(`📍 Location: public/sitemap.xml`);
  console.log(`🔗 Total URLs: ${staticRoutes.length + getBlogPosts().length}`);
  console.log(`📝 Blog posts: ${getBlogPosts().length}`);
  console.log(`🌐 Base URL: ${BASE_URL}`);
} catch (e) {
  console.error('❌ Failed to generate sitemap', e);
}