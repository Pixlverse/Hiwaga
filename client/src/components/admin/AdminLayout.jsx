import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Menu, Bell } from 'lucide-react'
import Sidebar from './Sidebar'
import { getToken } from '@/lib/adminApi'

export default function AdminLayout({ children, title, description, actions }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  // Auth gate — checks for JWT in localStorage
  const token = getToken()
  if (!token) {
    const next = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/admin/login?next=${next}`} replace />
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-white/10 bg-neutral-950/85 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-white/80 hover:bg-white/5 hover:text-white lg:hidden"
            >
              <Menu aria-hidden="true" className="h-5 w-5" />
            </button>
            {title && (
              <div>
                <h1 className="text-sm font-semibold text-white sm:text-base">
                  {title}
                </h1>
                {description && (
                  <p className="hidden text-xs text-neutral-500 sm:block">
                    {description}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {actions}
            <button
              type="button"
              aria-label="Notifications"
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-white/80 transition-colors hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
            >
              <Bell aria-hidden="true" className="h-4 w-4" />
              <span
                aria-hidden="true"
                className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#FFD700]"
              />
            </button>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  )
}
