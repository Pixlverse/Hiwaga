import { useEffect, useState } from 'react'
import {
  Search,
  Download,
  Mail,
  Phone,
  Eye,
  Trash2,
  Loader2,
} from 'lucide-react'
import AdminLayout from '@/components/admin/AdminLayout'
import adminApi, { apiError } from '@/lib/adminApi'

const statusStyles = {
  new: 'bg-[#FFD700]/15 text-[#FFD700]',
  reviewed: 'bg-blue-400/10 text-blue-300',
  shortlisted: 'bg-emerald-400/10 text-emerald-300',
  rejected: 'bg-rose-400/10 text-rose-300',
}

function initialsOf(name = '') {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() || '')
    .join('')
}

const API_BASE = import.meta.env.VITE_API_URL || '/api'
const ORIGIN = API_BASE.replace(/\/api$/, '')

function resumeHref(url) {
  if (!url) return '#'
  if (url.startsWith('http')) return url
  return `${ORIGIN}${url}`
}

export default function AdminCareers() {
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const { data } = await adminApi.get('/careers')
      setApps(data.data || [])
    } catch (err) {
      setError(apiError(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = apps.filter((a) => {
    if (filter !== 'all' && a.status !== filter) return false
    if (
      query &&
      !a.fullName?.toLowerCase().includes(query.toLowerCase()) &&
      !a.email?.toLowerCase().includes(query.toLowerCase()) &&
      !a.role?.toLowerCase().includes(query.toLowerCase())
    )
      return false
    return true
  })

  const handleStatusChange = async (id, newStatus) => {
    const prev = apps
    setApps((p) =>
      p.map((a) => (a._id === id ? { ...a, status: newStatus } : a)),
    )
    try {
      await adminApi.patch(`/careers/${id}/status`, { status: newStatus })
    } catch (err) {
      setApps(prev)
      alert(apiError(err))
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this application?')) return
    try {
      await adminApi.delete(`/careers/${id}`)
      setApps((p) => p.filter((a) => a._id !== id))
    } catch (err) {
      alert(apiError(err))
    }
  }

  const handleExport = () => {
    const headers = [
      'Name',
      'Email',
      'Phone',
      'Role',
      'Status',
      'Applied',
      'Portfolio',
      'Resume',
    ]
    const rows = filtered.map((a) =>
      [
        a.fullName,
        a.email,
        a.phone,
        a.role,
        a.status,
        new Date(a.createdAt).toISOString().split('T')[0],
        a.portfolioLinks || '',
        resumeHref(a.resumeUrl),
      ]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(','),
    )
    const csv = [headers.join(','), ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `applications-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <AdminLayout
      title="Career Applications"
      description="Review and manage incoming candidate applications."
      actions={
        <button
          type="button"
          onClick={handleExport}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-white/[0.06] sm:text-[13px]"
        >
          <Download className="h-4 w-4" strokeWidth={1.8} />
          Export
        </button>
      }
    >
      {error && (
        <div className="mb-5 rounded-md border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
          {error}
        </div>
      )}

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {[
          { label: 'Total', value: apps.length, color: 'text-white' },
          {
            label: 'New',
            value: apps.filter((a) => a.status === 'new').length,
            color: 'text-[#FFD700]',
          },
          {
            label: 'Shortlisted',
            value: apps.filter((a) => a.status === 'shortlisted').length,
            color: 'text-emerald-300',
          },
          {
            label: 'Reviewed',
            value: apps.filter((a) => a.status === 'reviewed').length,
            color: 'text-blue-300',
          },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-lg border border-white/10 bg-white/[0.02] p-4"
          >
            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
              {s.label}
            </p>
            <p className={`mt-1 text-2xl font-semibold ${s.color}`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <input
            type="search"
            placeholder="Search by name, email or role…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-neutral-500 focus:border-[#FFD700]/60 focus:bg-white/[0.06] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {['all', 'new', 'shortlisted', 'reviewed', 'rejected'].map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1.5 text-[11px] font-medium uppercase tracking-widest transition-colors ${
                filter === f
                  ? 'bg-[#FFD700] text-neutral-900'
                  : 'border border-white/10 bg-white/[0.03] text-neutral-300 hover:bg-white/[0.06]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-neutral-400">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading applications…
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
                  <th className="px-4 py-3 sm:px-6">Candidate</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="hidden px-4 py-3 md:table-cell">Applied</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right sm:px-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {filtered.map((app) => (
                  <tr
                    key={app._id}
                    className="transition-colors hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FFD700]/25 to-[#FFD700]/10 text-xs font-semibold text-[#FFD700]">
                          {initialsOf(app.fullName)}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-white">
                            {app.fullName}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-neutral-500">
                            {app.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm text-neutral-300">{app.role}</p>
                    </td>
                    <td className="hidden px-4 py-4 text-xs text-neutral-400 md:table-cell">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4">
                      <select
                        value={app.status}
                        onChange={(e) =>
                          handleStatusChange(app._id, e.target.value)
                        }
                        className={`cursor-pointer rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest focus:outline-none ${statusStyles[app.status]}`}
                      >
                        <option value="new">New</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={resumeHref(app.resumeUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Download resume"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 hover:bg-white/5 hover:text-white"
                        >
                          <Download className="h-3.5 w-3.5" strokeWidth={1.8} />
                        </a>
                        <a
                          href={`mailto:${app.email}`}
                          aria-label="Email"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 hover:bg-white/5 hover:text-white"
                        >
                          <Mail className="h-3.5 w-3.5" strokeWidth={1.8} />
                        </a>
                        <a
                          href={`tel:${(app.phone || '').replace(/\s/g, '')}`}
                          aria-label="Call"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 hover:bg-white/5 hover:text-white"
                        >
                          <Phone className="h-3.5 w-3.5" strokeWidth={1.8} />
                        </a>
                        <a
                          href={resumeHref(app.resumeUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="View"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 hover:bg-white/5 hover:text-white"
                        >
                          <Eye className="h-3.5 w-3.5" strokeWidth={1.8} />
                        </a>
                        <button
                          type="button"
                          onClick={() => handleDelete(app._id)}
                          aria-label="Delete"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 hover:bg-rose-400/10 hover:text-rose-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" strokeWidth={1.8} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-neutral-400">No applications found.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
