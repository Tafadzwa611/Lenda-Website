// generate-sitemap.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Your site's base URL
const BASE_URL = 'https://www.lendatech.co.zw';

// Define all your routes with their properties
const routes = [
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

// Get today's date in ISO format
const today = new Date().toISOString().split('T')[0];

// Generate XML
const generateSitemap = () => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

  routes.forEach((route) => {
    xml += `
  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  });

  xml += `
</urlset>`;

  return xml;
};

try {
  const sitemap = generateSitemap();
  const publicDir = path.join(__dirname, 'public');

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('✅ Basic sitemap generated successfully');
} catch (e) {
  console.error('❌ Failed to generate basic sitemap', e);
}