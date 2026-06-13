import { supabase } from '../../lib/supabase'

const BASE_URL = 'https://anugerah-sports.vercel.app'

function generateSitemap(products) {
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/catalog', priority: '0.9', changefreq: 'daily' },
    { url: '/tentang', priority: '0.6', changefreq: 'monthly' },
  ]

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(p => `  <url>
    <loc>${BASE_URL}${p.url}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
${products.filter(p => p.slug).map(p => `  <url>
    <loc>${BASE_URL}/produk/${p.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <lastmod>${p.created_at ? new Date(p.created_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('\n')}
</urlset>`
}

export default async function handler(req, res) {
  const { data: products } = await supabase
    .from('products')
    .select('slug, created_at')
    .not('slug', 'is', null)

  const sitemap = generateSitemap(products || [])

  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate')
  res.status(200).send(sitemap)
}
