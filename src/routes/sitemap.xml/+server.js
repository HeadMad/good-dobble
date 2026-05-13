export const prerender = true;

const siteUrl = 'https://good-dobble.ru';

export function GET() {
  const pages = [
    {
      url: `${siteUrl}/`,
      priority: '0.8'
    },
    {
      url: `${siteUrl}/baikal`,
      priority: '1.0'
    },
    {
      url: `${siteUrl}/baikal/rools`,
      priority: '0.9'
    }
  ];

  const body = `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}