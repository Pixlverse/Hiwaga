import { useEffect, useMemo, useState } from 'react'
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Download,
  MapPin,
  Monitor,
  IndianRupee,
  Percent,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  RotateCw,
  Loader2,
  X,
} from 'lucide-react'
import AdminLayout from '@/components/admin/AdminLayout'
import adminApi, { apiError } from '@/lib/adminApi'

function addDaysISO(base, days) {
  const d = new Date(base)
  d.setDate(d.getDate() + days)
  return d.toISOString().split('T')[0]
}

const TODAY_ISO = new Date().toISOString().split('T')[0]

function inr(n) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(n) || 0)
}

const statusStyles = {
  paid: 'bg-emerald-400/10 text-emerald-300 border border-emerald-400/20',
  pending: 'bg-amber-400/10 text-amber-300 border border-amber-400/20',
}

const frequencyOpts = [
  { value: 'daily', label: 'Daily', defaultDays: 1 },
  { value: 'weekly', label: 'Weekly', defaultDays: 7 },
  { value: 'monthly', label: 'Monthly', defaultDays: 30 },
  { value: 'one-time', label: 'One-time', defaultDays: 30 },
]

function getDueInfo(checkoutDate, status) {
  if (status === 'paid') {
    return {
      label: 'Paid',
      icon: CheckCircle2,
      cls: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
    }
  }
  if (!checkoutDate) {
    return {
      label: 'No due date',
      icon: Clock,
      cls: 'border-white/10 bg-white/[0.03] text-neutral-500',
    }
  }
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(checkoutDate)
  due.setHours(0, 0, 0, 0)
  const diff = Math.round((due - today) / 86400000)

  if (diff > 7)
    return {
      label: `Due in ${diff} days`,
      icon: Clock,
      cls: 'border-white/15 bg-white/[0.04] text-neutral-300',
    }
  if (diff > 1)
    return {
      label: `Due in ${diff} days`,
      icon: Clock,
      cls: 'border-amber-400/30 bg-amber-400/10 text-amber-300',
    }
  if (diff === 1)
    return {
      label: 'Due tomorrow',
      icon: AlertTriangle,
      cls: 'border-amber-400/40 bg-amber-400/15 text-amber-200',
    }
  if (diff === 0)
    return {
      label: 'Due today',
      icon: AlertTriangle,
      cls: 'border-rose-400/40 bg-rose-400/15 text-rose-200',
    }
  const overdue = -diff
  return {
    label: `Overdue by ${overdue} day${overdue === 1 ? '' : 's'}`,
    icon: AlertTriangle,
    cls: 'border-rose-500/40 bg-rose-500/20 text-rose-200',
  }
}

const emptyForm = () => ({
  place: '',
  placeType: '',
  ad: '',
  date: TODAY_ISO,
  paymentFrequency: 'monthly',
  checkoutDate: addDaysISO(TODAY_ISO, 30),
  totalAmount: '',
  sharePct: '20',
  status: 'pending',
  notes: '',
})

export default function AdminDOOH() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [form, setForm] = useState(emptyForm())

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const { data } = await adminApi.get('/dooh')
      setEntries(data.data || [])
    } catch (err) {
      setError(apiError(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const stats = useMemo(() => {
    const totalCollected = entries.reduce(
      (s, e) => s + Number(e.totalAmount || 0),
      0,
    )
    const totalVenueShare = entries.reduce(
      (s, e) =>
        s + (Number(e.totalAmount) * Number(e.sharePct)) / 100,
      0,
    )
    const pendingShare = entries
      .filter((e) => e.status === 'pending')
      .reduce(
        (s, e) =>
          s + (Number(e.totalAmount) * Number(e.sharePct)) / 100,
        0,
      )
    const venues = new Set(entries.map((e) => e.place)).size
    return { totalCollected, totalVenueShare, pendingShare, venues }
  }, [entries])

  const filtered = entries.filter((e) => {
    if (filter !== 'all' && e.status !== filter) return false
    if (
      query &&
      !e.place?.toLowerCase().includes(query.toLowerCase()) &&
      !e.ad?.toLowerCase().includes(query.toLowerCase())
    )
      return false
    return true
  })

  const resetForm = () => {
    setForm(emptyForm())
    setEditingId(null)
    setShowForm(false)
  }

  const handleEdit = (entry) => {
    setEditingId(entry._id)
    setForm({
      place: entry.place || '',
      placeType: entry.placeType || '',
      ad: entry.ad || '',
      date: entry.date ? entry.date.split('T')[0] : TODAY_ISO,
      paymentFrequency: entry.paymentFrequency || 'monthly',
      checkoutDate: entry.checkoutDate
        ? entry.checkoutDate.split('T')[0]
        : addDaysISO(TODAY_ISO, 30),
      totalAmount: String(entry.totalAmount || ''),
      sharePct: String(entry.sharePct || '20'),
      status: entry.status || 'pending',
      notes: entry.notes || '',
    })
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const total = Number(form.totalAmount)
    const pct = Number(form.sharePct)
    if (!form.place || !form.ad || !total || isNaN(pct)) {
      alert('Please fill all required fields.')
      return
    }

    const payload = {
      place: form.place,
      placeType: form.placeType,
      ad: form.ad,
      date: form.date,
      paymentFrequency: form.paymentFrequency,
      checkoutDate: form.checkoutDate,
      totalAmount: total,
      sharePct: pct,
      status: form.status,
      notes: form.notes,
    }

    setSubmitting(true)
    try {
      if (editingId) {
        const { data } = await adminApi.patch(`/dooh/${editingId}`, payload)
        setEntries((p) =>
          p.map((e) => (e._id === editingId ? data.data : e)),
        )
      } else {
        const { data } = await adminApi.post('/dooh', payload)
        setEntries((p) => [data.data, ...p])
      }
      resetForm()
    } catch (err) {
      alert(apiError(err))
    } finally {
      setSubmitting(false)
    }
  }

  const handleFrequencyChange = (val) => {
    const opt = frequencyOpts.find((o) => o.value === val)
    setForm((p) => ({
      ...p,
      paymentFrequency: val,
      checkoutDate: addDaysISO(p.date || TODAY_ISO, opt?.defaultDays || 30),
    }))
  }

  const handleStartDateChange = (val) => {
    setForm((p) => {
      const opt = frequencyOpts.find((o) => o.value === p.paymentFrequency)
      return {
        ...p,
        date: val,
        checkoutDate: addDaysISO(val, opt?.defaultDays || 30),
      }
    })
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this entry?')) return
    try {
      await adminApi.delete(`/dooh/${id}`)
      setEntries((p) => p.filter((e) => e._id !== id))
    } catch (err) {
      alert(apiError(err))
    }
  }

  const handleStatusToggle = async (id) => {
    const prev = entries
    setEntries((p) =>
      p.map((e) =>
        e._id === id
          ? { ...e, status: e.status === 'paid' ? 'pending' : 'paid' }
          : e,
      ),
    )
    try {
      const { data } = await adminApi.post(`/dooh/${id}/toggle-status`)
      setEntries((p) => p.map((e) => (e._id === id ? data.data : e)))
    } catch (err) {
      setEntries(prev)
      alert(apiError(err))
    }
  }

  return (
    <AdminLayout
      title="DOOH Overview"
      description="Track outdoor ad campaigns and revenue splits with venues."
      actions={
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-white/[0.06] sm:px-4 sm:text-[13px]"
          >
            <Download className="h-4 w-4" strokeWidth={1.8} />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button
            type="button"
            onClick={() => {
              if (showForm) resetForm()
              else setShowForm(true)
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-neutral-900 transition-colors hover:bg-[#FFE57A] sm:text-[13px]"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            New Entry
          </button>
        </div>
      }
    >
      {error && (
        <div className="mb-5 rounded-md border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        <StatTile
          icon={IndianRupee}
          label="Total Ad Revenue"
          value={inr(stats.totalCollected)}
          accent="text-white"
        />
        <StatTile
          icon={Percent}
          label="Venue Share Owed"
          value={inr(stats.totalVenueShare)}
          accent="text-[#FFD700]"
        />
        <StatTile
          icon={Clock}
          label="Pending Payouts"
          value={inr(stats.pendingShare)}
          accent="text-amber-300"
        />
        <StatTile
          icon={MapPin}
          label="Active Venues"
          value={stats.venues}
          accent="text-emerald-300"
        />
      </div>

      {showForm && (
        <div className="mt-6 rounded-xl border border-[#FFD700]/30 bg-[#FFD700]/[0.04] p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">
              {editingId ? 'Edit entry' : 'Add a new entry'}
            </h2>
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 hover:bg-white/5 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
          >
            <FormField label="Place / Venue" required>
              <input
                type="text"
                required
                value={form.place}
                onChange={(e) =>
                  setForm((p) => ({ ...p, place: e.target.value }))
                }
                placeholder="e.g. Alisha Tours & Travels"
                className="input"
              />
            </FormField>

            <FormField label="Place Type">
              <input
                type="text"
                value={form.placeType}
                onChange={(e) =>
                  setForm((p) => ({ ...p, placeType: e.target.value }))
                }
                placeholder="Restaurant, Retail, Clinic…"
                className="input"
              />
            </FormField>

            <FormField label="Ad / Campaign" required>
              <input
                type="text"
                required
                value={form.ad}
                onChange={(e) =>
                  setForm((p) => ({ ...p, ad: e.target.value }))
                }
                className="input"
              />
            </FormField>

            <FormField label="Start Date">
              <input
                type="date"
                value={form.date}
                onChange={(e) => handleStartDateChange(e.target.value)}
                className="input"
              />
            </FormField>

            <FormField label="Payment Frequency" required>
              <select
                required
                value={form.paymentFrequency}
                onChange={(e) => handleFrequencyChange(e.target.value)}
                className="input"
              >
                {frequencyOpts.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Checkout / Payment Due" required>
              <input
                type="date"
                required
                value={form.checkoutDate}
                onChange={(e) =>
                  setForm((p) => ({ ...p, checkoutDate: e.target.value }))
                }
                className="input"
              />
            </FormField>

            <FormField label="Total Ad Amount (₹)" required>
              <input
                type="number"
                required
                min="0"
                value={form.totalAmount}
                onChange={(e) =>
                  setForm((p) => ({ ...p, totalAmount: e.target.value }))
                }
                className="input"
              />
            </FormField>

            <FormField label="Venue Share (%)" required>
              <input
                type="number"
                required
                min="0"
                max="100"
                step="0.5"
                value={form.sharePct}
                onChange={(e) =>
                  setForm((p) => ({ ...p, sharePct: e.target.value }))
                }
                className="input"
              />
            </FormField>

            <FormField label="Status">
              <select
                value={form.status}
                onChange={(e) =>
                  setForm((p) => ({ ...p, status: e.target.value }))
                }
                className="input"
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
              </select>
            </FormField>

            <FormField label="Notes" className="sm:col-span-2 lg:col-span-3">
              <input
                type="text"
                value={form.notes}
                onChange={(e) =>
                  setForm((p) => ({ ...p, notes: e.target.value }))
                }
                placeholder="Optional note"
                className="input"
              />
            </FormField>

            {form.totalAmount && form.sharePct && (
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3 text-xs sm:col-span-2 lg:col-span-3">
                <p className="text-neutral-400">
                  Venue gets{' '}
                  <span className="font-semibold text-[#FFD700]">
                    {inr(
                      (Number(form.totalAmount) * Number(form.sharePct)) / 100,
                    )}
                  </span>{' '}
                  ({form.sharePct}% of {inr(Number(form.totalAmount) || 0)})
                </p>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 sm:col-span-2 lg:col-span-3">
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-neutral-300 transition-colors hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-lg bg-[#FFD700] px-5 py-2 text-xs font-semibold uppercase tracking-widest text-neutral-900 transition-colors hover:bg-[#FFE57A] disabled:opacity-60"
              >
                {submitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                {editingId ? 'Update Entry' : 'Save Entry'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          <input
            type="search"
            placeholder="Search venue or ad…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-neutral-500 focus:border-[#FFD700]/60 focus:bg-white/[0.06] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          {['all', 'pending', 'paid'].map((f) => (
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

      <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-neutral-400">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading DOOH entries…
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
                  <th className="px-4 py-3 sm:px-6">Venue</th>
                  <th className="px-4 py-3">Ad / Campaign</th>
                  <th className="hidden px-4 py-3 lg:table-cell">Ran on</th>
                  <th className="px-4 py-3 text-right">Ad Amount</th>
                  <th className="hidden px-4 py-3 text-right sm:table-cell">
                    Share
                  </th>
                  <th className="px-4 py-3 text-right">Venue Gets</th>
                  <th className="px-4 py-3">Due</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right sm:px-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {filtered.map((e) => {
                  const venueAmount =
                    (Number(e.totalAmount) * Number(e.sharePct)) / 100
                  const due = getDueInfo(e.checkoutDate, e.status)
                  const DIcon = due.icon
                  return (
                    <tr
                      key={e._id}
                      className="transition-colors hover:bg-white/[0.02]"
                    >
                      <td className="px-4 py-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-neutral-300">
                            <Monitor
                              strokeWidth={1.6}
                              className="h-4 w-4"
                            />
                          </span>
                          <div className="min-w-0">
                            <p className="truncate font-medium text-white">
                              {e.place}
                            </p>
                            {e.placeType && (
                              <p className="mt-0.5 text-xs text-neutral-500">
                                {e.placeType}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-neutral-300">
                        <p className="line-clamp-1">{e.ad}</p>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          {e.paymentFrequency && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-neutral-400">
                              <RotateCw
                                className="h-2.5 w-2.5"
                                strokeWidth={1.8}
                              />
                              {e.paymentFrequency}
                            </span>
                          )}
                          {e.notes && (
                            <p className="line-clamp-1 text-xs text-neutral-500">
                              {e.notes}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="hidden px-4 py-4 text-xs text-neutral-400 lg:table-cell">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-3 w-3" strokeWidth={1.8} />
                          {e.date && new Date(e.date).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right font-medium tabular-nums text-white">
                        {inr(e.totalAmount)}
                      </td>
                      <td className="hidden px-4 py-4 text-right text-neutral-400 sm:table-cell">
                        {e.sharePct}%
                      </td>
                      <td className="px-4 py-4 text-right font-semibold tabular-nums text-[#FFD700]">
                        {inr(venueAmount)}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-1">
                          <span
                            className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest ${due.cls}`}
                          >
                            <DIcon className="h-3 w-3" strokeWidth={2} />
                            {due.label}
                          </span>
                          {e.checkoutDate && e.status !== 'paid' && (
                            <span className="text-[10px] tabular-nums text-neutral-500">
                              {new Date(
                                e.checkoutDate,
                              ).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          type="button"
                          onClick={() => handleStatusToggle(e._id)}
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest transition-colors ${statusStyles[e.status]}`}
                        >
                          {e.status === 'paid' ? (
                            <CheckCircle2
                              className="h-3 w-3"
                              strokeWidth={2}
                            />
                          ) : (
                            <Clock className="h-3 w-3" strokeWidth={2} />
                          )}
                          {e.status}
                        </button>
                      </td>
                      <td className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleEdit(e)}
                            aria-label="Edit"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 hover:bg-white/5 hover:text-white"
                          >
                            <Pencil className="h-3.5 w-3.5" strokeWidth={1.8} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(e._id)}
                            aria-label="Delete"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-400 hover:bg-rose-400/10 hover:text-rose-400"
                          >
                            <Trash2 className="h-3.5 w-3.5" strokeWidth={1.8} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-neutral-400">No entries found.</p>
          </div>
        )}
      </div>

      <style>{`
        .input {
          margin-top: 0.5rem;
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid rgba(255,255,255,0.10);
          background-color: rgba(255,255,255,0.03);
          padding: 0.625rem 1rem;
          font-size: 0.875rem;
          color: white;
          outline: none;
          transition: border-color .3s, background-color .3s;
        }
        .input::placeholder { color: rgb(115 115 115); }
        .input:focus {
          border-color: rgba(255,215,0,0.6);
          background-color: rgba(255,255,255,0.06);
        }
      `}</style>
    </AdminLayout>
  )
}

function StatTile({ icon: Icon, label, value, accent }) {
  return (
    <article className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center justify-between">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#FFD700]/25 bg-[#FFD700]/10 text-[#FFD700]">
          <Icon strokeWidth={1.6} className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-5 text-xs font-medium uppercase tracking-widest text-neutral-400">
        {label}
      </p>
      <p className={`mt-1 text-2xl font-semibold tabular-nums ${accent}`}>
        {value}
      </p>
    </article>
  )
}

function FormField({ label, required, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="block text-[11px] font-semibold uppercase tracking-widest text-neutral-400 sm:text-xs">
        {label}
        {required && <span className="ml-1 text-[#FFD700]">*</span>}
      </span>
      {children}
    </label>
  )
}
