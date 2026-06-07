import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Film,
  FileText,
  Briefcase,
  Monitor,
  LogOut,
  X,
} from 'lucide-react'
import logo from '@/assets/hiwaga-logo.png'
import { clearSession, getStoredUser } from '@/lib/adminApi'

const navItems = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Works', to: '/admin/works', icon: Film },
  { label: 'Blogs', to: '/admin/blogs', icon: FileText },
  { label: 'Careers', to: '/admin/careers', icon: Briefcase },
  { label: 'DOOH', to: '/admin/dooh', icon: Monitor },
]

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate()
  const user = getStoredUser()

  const handleLogout = () => {
    clearSession()
    navigate('/admin/login')
  }

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/10 bg-neutral-950 transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo + close */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Hiwaga Makers" className="h-7 w-auto" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#FFD700]/90">
              Admin
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-white/70 hover:bg-white/5 hover:text-white lg:hidden"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav aria-label="Admin" className="flex-1 overflow-y-auto px-3 py-6">
          <ul role="list" className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.label}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? 'bg-[#FFD700]/10 text-[#FFD700]'
                          : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    <Icon
                      aria-hidden="true"
                      strokeWidth={1.8}
                      className="h-4 w-4"
                    />
                    {item.label}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer / logout */}
        <div className="border-t border-white/10 p-4">
          <div className="mb-3 rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <p className="text-xs font-medium text-white">
              {user?.name || 'Admin User'}
            </p>
            <p className="mt-0.5 truncate text-[11px] text-neutral-500">
              {user?.email || 'admin@hiwagamakers.com'}
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold uppercase tracking-widest text-neutral-300 transition-colors hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
          >
            <LogOut aria-hidden="true" strokeWidth={1.8} className="h-3.5 w-3.5" />
            Log out
          </button>
        </div>
      </aside>
    </>
  )
}
