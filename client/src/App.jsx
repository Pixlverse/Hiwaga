import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Team from '@/pages/Team'
import Works from '@/pages/Works'
import Services from '@/pages/Services'
import FAQ from '@/pages/FAQ'
import Careers from '@/pages/Careers'
import Contact from '@/pages/Contact'
import Blog from '@/pages/Blog'
import BlogDetail from '@/pages/BlogDetail'
import CaseStudies from '@/pages/CaseStudies'
import AdminLogin from '@/pages/admin/Login'
import AdminDashboard from '@/pages/admin/Dashboard'
import AdminWorks from '@/pages/admin/AdminWorks'
import AdminBlogs from '@/pages/admin/AdminBlogs'
import AdminCareers from '@/pages/admin/AdminCareers'
import AdminDOOH from '@/pages/admin/AdminDOOH'
import logo from '@/assets/hiwaga-logo.png'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // Wait for the target element to mount before scrolling to it.
      const id = hash.slice(1)
      const tryScroll = (attempt = 0) => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else if (attempt < 20) {
          setTimeout(() => tryScroll(attempt + 1), 50)
        }
      }
      tryScroll()
      return
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

function PageLoader({ visible }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-hidden={!visible}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-neutral-950 transition-opacity duration-500 ${
        visible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(255,215,0,0.10), rgba(255,215,0,0) 60%)',
        }}
      />

      <div className="relative flex flex-col items-center">
        <img
          src={logo}
          alt=""
          aria-hidden="true"
          className="h-14 w-auto sm:h-16 animate-[loader-pulse_1.6s_ease-in-out_infinite]"
        />

        <div className="mt-9 h-0.5 w-56 overflow-hidden rounded-full bg-white/10 sm:mt-10 sm:w-72">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#FFD700] via-[#FFE57A] to-[#FFD700]"
            style={{
              animation: 'loader-fill 1.25s cubic-bezier(0.4, 0, 0.2, 1) forwards',
            }}
          />
        </div>

        <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.32em] text-neutral-500 sm:text-xs">
          <span className="sr-only">Loading. </span>
          Hiwaga Makers
        </p>
      </div>
    </div>
  )
}

function RouteTransitions({ children }) {
  const { pathname } = useLocation()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <>
      <PageLoader visible={loading} />
      {children}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* Page-transition loader temporarily disabled — wrap <Routes> with <RouteTransitions> to re-enable */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/works" element={<Works />} />
        <Route path="/services" element={<Services />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/case-studies" element={<CaseStudies />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/works" element={<AdminWorks />} />
        <Route path="/admin/blogs" element={<AdminBlogs />} />
        <Route path="/admin/careers" element={<AdminCareers />} />
        <Route path="/admin/dooh" element={<AdminDOOH />} />
      </Routes>
    </BrowserRouter>
  )
}
