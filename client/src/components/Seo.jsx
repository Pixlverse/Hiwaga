import { useEffect } from 'react'
import { SITE_NAME, SITE_URL } from '@/lib/site'

function setMeta(name, content) {
  let el = document.head.querySelector(`meta[name="${name}"]`)
  if (!content) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!href) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

// Sets the document title, meta description, canonical URL and robots
// directive for the current page. Renders nothing.
export default function Seo({ title, description, path, noindex = false }) {
  useEffect(() => {
    document.title = title?.includes(SITE_NAME)
      ? title
      : [title, SITE_NAME].filter(Boolean).join(' | ')
    setMeta('description', description)
    setMeta('robots', noindex ? 'noindex, nofollow' : null)
    setCanonical(noindex || path == null ? null : `${SITE_URL}${path === '/' ? '/' : path}`)
  }, [title, description, path, noindex])

  return null
}
