import { useEffect, useState } from 'react'
import {
  Plus,
  Trash2,
  ExternalLink,
  GripVertical,
  Film,
  Loader2,
} from 'lucide-react'
import AdminLayout from '@/components/admin/AdminLayout'
import adminApi, { apiError } from '@/lib/adminApi'

function getReelId(url) {
  const match = String(url || '').match(/(?:reel|p)\/([^/?]+)/)
  return match ? match[1] : null
}

export default function AdminWorks() {
  const [reels, setReels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    url: '',
    title: '',
    category: 'Client Work',
    featured: false,
  })
  const [submitting, setSubmitting] = useState(false)

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const { data } = await adminApi.get('/works')
      setReels(data.data || [])
    } catch (err) {
      setError(apiError(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.url || !getReelId(form.url)) {
      alert('Please enter a valid Instagram reel URL')
      return
    }
    try {
      setSubmitting(true)
      const { data } = await adminApi.post('/works', form)
      setReels((p) => [data.data, ...p])
      setForm({ url: '', title: '', category: 'Client Work', featured: false })
      setShowForm(false)
    } catch (err) {
      alert(apiError(err))
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this reel?')) return
    try {
      await adminApi.delete(`/works/${id}`)
      setReels((p) => p.filter((r) => r._id !== id))
    } catch (err) {
      alert(apiError(err))
    }
  }

  return (
    <AdminLayout
      title="Works"
      description="Manage Instagram reels shown on the public Works page."
      actions={
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-neutral-900 transition-colors hover:bg-[#FFE57A] sm:text-[13px]"
        >
          <Plus aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
          Add Reel
        </button>
      }
    >
      {showForm && (
        <div className="mb-6 rounded-xl border border-[#FFD700]/30 bg-[#FFD700]/[0.04] p-5 sm:p-6">
          <h2 className="text-sm font-semibold text-white">Add a new reel</h2>
          <form
            onSubmit={handleSubmit}
            className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5"
          >
            <label className="block sm:col-span-2">
              <span className="block text-[11px] font-semibold uppercase tracking-widest text-neutral-400 sm:text-xs">
                Instagram Reel URL <span className="text-[#FFD700]">*</span>
              </span>
              <input
                type="url"
                required
                placeholder="https://www.instagram.com/reel/…"
                value={form.url}
                onChange={(e) =>
                  setForm((p) => ({ ...p, url: e.target.value }))
                }
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-[#FFD700]/60 focus:bg-white/[0.06] focus:outline-none"
              />
            </label>

            <label className="block">
              <span className="block text-[11px] font-semibold uppercase tracking-widest text-neutral-400 sm:text-xs">
                Title
              </span>
              <input
                type="text"
                placeholder="Display title"
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-[#FFD700]/60 focus:bg-white/[0.06] focus:outline-none"
              />
            </label>

            <label className="block">
              <span className="block text-[11px] font-semibold uppercase tracking-widest text-neutral-400 sm:text-xs">
                Category
              </span>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm((p) => ({ ...p, category: e.target.value }))
                }
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white focus:border-[#FFD700]/60 focus:bg-white/[0.06] focus:outline-none"
              >
                <option>Showreel</option>
                <option>Client Work</option>
                <option>Brand Film</option>
                <option>Personal Branding</option>
              </select>
            </label>

            <div className="flex items-center justify-between gap-4 sm:col-span-2">
              <label className="inline-flex items-center gap-2 text-sm text-neutral-300">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, featured: e.target.checked }))
                  }
                  className="h-4 w-4 rounded border-white/20 bg-white/[0.03] accent-[#FFD700]"
                />
                Mark as featured (Showreel)
              </label>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-lg border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-neutral-300 transition-colors hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-5 py-2 text-xs font-semibold uppercase tracking-widest text-neutral-900 transition-colors hover:bg-[#FFE57A] disabled:opacity-60"
                >
                  {submitting && (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  )}
                  Add Reel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {error && (
        <div className="mb-5 rounded-md border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
        <div className="grid grid-cols-12 items-center gap-4 border-b border-white/10 px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-neutral-400 sm:px-6">
          <span className="col-span-6 sm:col-span-5">Reel</span>
          <span className="col-span-3 sm:col-span-2">Category</span>
          <span className="hidden sm:col-span-2 sm:block">Added</span>
          <span className="col-span-3 text-right">Actions</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-neutral-400">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading reels…
          </div>
        ) : reels.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-neutral-400">
              No reels yet. Add your first Instagram reel above.
            </p>
          </div>
        ) : (
          <ul role="list" className="divide-y divide-white/[0.06]">
            {reels.map((reel) => {
              const reelId = reel.reelId || getReelId(reel.url)
              return (
                <li
                  key={reel._id}
                  className="grid grid-cols-12 items-center gap-4 px-4 py-4 transition-colors hover:bg-white/[0.02] sm:px-6"
                >
                  <div className="col-span-6 flex min-w-0 items-center gap-3 sm:col-span-5">
                    <GripVertical
                      aria-hidden="true"
                      className="hidden h-4 w-4 shrink-0 cursor-grab text-neutral-600 sm:block"
                    />
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black text-neutral-500">
                      <Film
                        aria-hidden="true"
                        className="h-5 w-5"
                        strokeWidth={1.6}
                      />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-white">
                        {reel.title}
                        {reel.featured && (
                          <span className="ml-2 inline-flex items-center rounded-full bg-[#FFD700]/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-[#FFD700]">
                            Featured
                          </span>
                        )}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-neutral-500">
                        {reelId}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-3 sm:col-span-2">
                    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[11px] font-medium text-neutral-300">
                      {reel.category}
                    </span>
                  </div>

                  <div className="hidden text-xs text-neutral-400 sm:col-span-2 sm:block">
                    {new Date(reel.createdAt).toLocaleDateString()}
                  </div>

                  <div className="col-span-3 flex items-center justify-end gap-1.5">
                    <a
                      href={reel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open on Instagram"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 hover:bg-white/5 hover:text-white"
                    >
                      <ExternalLink
                        aria-hidden="true"
                        className="h-3.5 w-3.5"
                        strokeWidth={1.8}
                      />
                    </a>
                    <button
                      type="button"
                      onClick={() => handleDelete(reel._id)}
                      aria-label="Delete"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 hover:bg-rose-400/10 hover:text-rose-400"
                    >
                      <Trash2
                        aria-hidden="true"
                        className="h-3.5 w-3.5"
                        strokeWidth={1.8}
                      />
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </AdminLayout>
  )
}
