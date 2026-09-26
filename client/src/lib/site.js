// Public site origin — used for canonical URLs, sitemap and share links.
// Override per environment with VITE_SITE_URL (no trailing slash).
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || 'https://hiwagamakers.com'
).replace(/\/+$/, '')

export const SITE_NAME = 'Hiwaga Makers'
