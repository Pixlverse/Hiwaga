import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Film,
  FileText,
  Briefcase,
  Monitor,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Loader2,
} from 'lucide-react'
import AdminLayout from '@/components/admin/AdminLayout'
import adminApi, { apiError } from '@/lib/adminApi'

function inr(n) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(n) || 0)
}

function StatCard({ label, value, delta, deltaPositive, Icon }) {
  const TrendIcon = deltaPositive === false ? ArrowDownRight : ArrowUpRight
  return (
    <article className="rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.05]">
      <div className="flex items-start justify-between">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#FFD700]/25 bg-[#FFD700]/10 text-[#FFD700]">
          <Icon aria-hidden="true" strokeWidth={1.6} className="h-5 w-5" />
        </span>
        {delta != null && (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
              deltaPositive === false
                ? 'bg-rose-400/10 text-rose-300'
                : 'bg-emerald-400/10 text-emerald-300'
            }`}
          >
            <TrendIcon
              aria-hidden="true"
              className="h-3 w-3"
              strokeWidth={2}
            />
            {delta}
          </span>
        )}
      </div>
      <p className="mt-5 text-xs font-medium uppercase tracking-widest text-neutral-400">
        {label}
      </p>
      <p className="mt-1 text-3xl font-semibold text-white sm:text-4xl">
        {value}
      </p>
    </article>
  )
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [activity, setActivity] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const [s, a] = await Promise.all([
          adminApi.get('/dashboard/stats'),
          adminApi.get('/dashboard/activity'),
        ])
        if (!alive) return
        setStats(s.data)
        setActivity(a.data.data || [])
      } catch (err) {
        if (!alive) return
        setError(apiError(err))
      } finally {
        if (alive) setLoading(false)
      }
    }
    load()
    return () => {
      alive = false
    }
  }, [])

  return (
    <AdminLayout
      title="Dashboard"
      description="An overview of your Hiwaga Makers admin."
    >
      {loading && (
        <div className="flex items-center justify-center py-20 text-neutral-400">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading dashboard…
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-md border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
          {error}
        </div>
      )}

      {stats && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            <StatCard
              label="Reels Published"
              value={stats.works.total}
              delta={`+${stats.works.last7d}`}
              Icon={Film}
            />
            <StatCard
              label="Blog Posts"
              value={stats.blogs.total}
              delta={`+${stats.blogs.last7d}`}
              Icon={FileText}
            />
            <StatCard
              label="Career Applications"
              value={stats.careers.total}
              delta={`+${stats.careers.last7d}`}
              Icon={Briefcase}
            />
            <StatCard
              label="Active DOOH Venues"
              value={stats.dooh.activeVenues}
              delta={`${stats.dooh.entries} entries`}
              Icon={Monitor}
            />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
            <section className="lg:col-span-2">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-white">
                    Recent Activity
                  </h2>
                  <span className="text-xs text-neutral-500">Latest 10</span>
                </div>

                {activity.length === 0 ? (
                  <p className="mt-5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-6 text-center text-sm text-neutral-500">
                    No activity yet.
                  </p>
                ) : (
                  <ul role="list" className="mt-5 space-y-3">
                    {activity.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-4 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 sm:px-5"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFD700]"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-neutral-200">
                            {item.text}
                          </p>
                          <p className="mt-0.5 text-xs text-neutral-500">
                            {new Date(item.at).toLocaleString()}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>

            <section>
              <div className="h-full rounded-xl border border-[#FFD700]/25 bg-gradient-to-br from-[#FFD700]/[0.06] via-neutral-900 to-black p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-white">
                    DOOH Revenue
                  </h2>
                  <TrendingUp
                    aria-hidden="true"
                    className="h-4 w-4 text-[#FFD700]"
                    strokeWidth={1.8}
                  />
                </div>

                <p className="mt-6 text-xs font-medium uppercase tracking-widest text-neutral-400">
                  Paid this month
                </p>
                <p className="mt-1 text-3xl font-semibold text-white sm:text-4xl">
                  {inr(stats.dooh.paidThisMonth)}
                </p>
                {stats.dooh.monthOverMonthPct != null && (
                  <p
                    className={`mt-1 text-xs ${
                      stats.dooh.monthOverMonthPct >= 0
                        ? 'text-[#FFD700]/80'
                        : 'text-rose-300/80'
                    }`}
                  >
                    {stats.dooh.monthOverMonthPct >= 0 ? '+' : ''}
                    {stats.dooh.monthOverMonthPct.toFixed(1)}% from last month
                  </p>
                )}

                <div className="mt-6 space-y-2">
                  <Row
                    label="Pending to venues"
                    value={inr(stats.dooh.pendingShare)}
                  />
                  <Row
                    label="Total collected"
                    value={inr(stats.dooh.totalCollected)}
                  />
                  <Row
                    label="Total share owed"
                    value={inr(stats.dooh.totalVenueShare)}
                  />
                  {stats.dooh.overdue > 0 && (
                    <Row
                      label="Overdue payouts"
                      value={`${stats.dooh.overdue}`}
                      accent="text-rose-300"
                    />
                  )}
                  {stats.dooh.dueSoon > 0 && (
                    <Row
                      label="Due within 7 days"
                      value={`${stats.dooh.dueSoon}`}
                      accent="text-amber-300"
                    />
                  )}
                </div>

                <Link
                  to="/admin/dooh"
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#FFD700] hover:text-[#FFE57A]"
                >
                  View full DOOH
                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                </Link>
              </div>
            </section>
          </div>
        </>
      )}
    </AdminLayout>
  )
}

function Row({ label, value, accent = 'text-white' }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-neutral-400">{label}</span>
      <span className={`font-medium tabular-nums ${accent}`}>{value}</span>
    </div>
  )
}
