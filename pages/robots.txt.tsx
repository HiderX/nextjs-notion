import type { GetServerSideProps } from 'next'

import { host } from '@/lib/config'

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  if (req.method !== 'GET') {
    res.statusCode = 405
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify({ error: 'method not allowed' }))
    res.end()

    return {
      props: {}
    }
  }

  // cache for up to one day
  res.setHeader('Cache-Control', 'public, max-age=86400, immutable')
  res.setHeader('Content-Type', 'text/plain')

  // only allow the site to be crawlable on the production deployment
  if (process.env.VERCEL_ENV === 'production') {
    res.write(`User-agent: *
Disallow: /api/
Disallow: /index.html

User-agent: Googlebot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: Yisouspider
Allow: /

User-agent: Sogou web spider
Allow: /

User-agent: 360Spider
Allow: /

User-agent: Bytespider
Allow: /

User-agent: Applebot
Allow: /

User-agent: bingbot
Allow: /

User-agent: Googlebot-Extended
Disallow: /

Sitemap: ${host}/sitemap.xml
`)
  } else {
    res.write(`User-agent: *
Disallow: /

Sitemap: ${host}/sitemap.xml
`)
  }

  res.end()

  return {
    props: {}
  }
}

export default function noop() {
  return null
}
