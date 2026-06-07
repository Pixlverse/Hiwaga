import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Lock, Mail, ArrowRight, Eye, EyeOff, Loader2 } from 'lucide-react'
import logo from '@/assets/hiwaga-logo.png'
import adminApi, {
  setToken,
  setStoredUser,
  apiError,
} from '@/lib/adminApi'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const next = searchParams.get('next') || '/admin'

  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [forgotOpen, setForgotOpen] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotSent, setForgotSent] = useState(false)
  const [forgotLoading, setForgotLoading] = useState(false)
  const [forgotError, setForgotError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.email || !form.password) {
      setError('Please enter your email and password.')
      return
    }
    try {
      setLoading(true)
      const { data } = await adminApi.post('/auth/login', form)
      setToken(data.token)
      setStoredUser(data.user)
      navigate(next, { replace: true })
    } catch (err) {
      setError(apiError(err))
    } finally {
      setLoading(false)
    }
  }

  const handleForgot = async (e) => {
    e.preventDefault()
    setForgotError('')
    if (!forgotEmail) {
      setForgotError('Please enter your email.')
      return
    }
    try {
      setForgotLoading(true)
      await adminApi.post('/auth/forgot-password', { email: forgotEmail })
      setForgotSent(true)
    } catch (err) {
      setForgotError(apiError(err))
    } finally {
      setForgotLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#FFD700]/[0.10] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#FFD700]/[0.06] blur-3xl"
      />

      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6">
        <div className="mb-8 flex flex-col items-center">
          <img src={logo} alt="Hiwaga Makers" className="h-10 w-auto sm:h-12" />
          <span className="mt-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#FFD700]/85 sm:text-xs">
            Admin Portal
          </span>
        </div>

        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-6 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)] sm:p-8">
          {!forgotOpen ? (
            <>
              <div className="text-center">
                <h1 className="text-2xl font-semibold text-white sm:text-3xl">
                  Welcome back
                </h1>
                <p className="mt-2 text-sm text-neutral-400">
                  Sign in to manage Hiwaga Makers.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <label className="block">
                  <span className="block text-[11px] font-semibold uppercase tracking-widest text-neutral-400 sm:text-xs">
                    Email
                  </span>
                  <div className="relative mt-2">
                    <Mail
                      aria-hidden="true"
                      className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
                    />
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      placeholder="admin@hiwagamakers.com"
                      className="w-full rounded-lg border border-white/10 bg-white/[0.03] py-3 pl-10 pr-4 text-sm text-white placeholder:text-neutral-500 transition-colors duration-300 focus:border-[#FFD700]/60 focus:bg-white/[0.06] focus:outline-none"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="block text-[11px] font-semibold uppercase tracking-widest text-neutral-400 sm:text-xs">
                    Password
                  </span>
                  <div className="relative mt-2">
                    <Lock
                      aria-hidden="true"
                      className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
                    />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete="current-password"
                      value={form.password}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, password: e.target.value }))
                      }
                      placeholder="••••••••"
                      className="w-full rounded-lg border border-white/10 bg-white/[0.03] py-3 pl-10 pr-12 text-sm text-white placeholder:text-neutral-500 transition-colors duration-300 focus:border-[#FFD700]/60 focus:bg-white/[0.06] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                      className="absolute right-3 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-neutral-400 hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff aria-hidden="true" className="h-4 w-4" />
                      ) : (
                        <Eye aria-hidden="true" className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </label>

                {error && (
                  <p
                    className="rounded-md border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-300"
                    role="alert"
                  >
                    {error}
                  </p>
                )}

                <div className="flex items-center justify-between text-xs">
                  <label className="inline-flex items-center gap-2 text-neutral-400">
                    <input
                      type="checkbox"
                      className="h-3.5 w-3.5 rounded border-white/20 bg-white/[0.03] accent-[#FFD700]"
                    />
                    Remember me
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotOpen(true)
                      setForgotEmail(form.email)
                    }}
                    className="font-medium text-neutral-400 underline-offset-4 transition-colors hover:text-[#FFD700] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#FFD700] px-5 py-3 text-xs font-semibold uppercase tracking-widest text-neutral-900 transition-all duration-300 hover:bg-[#FFE57A] hover:shadow-[0_10px_30px_-10px_rgba(255,215,0,0.5)] disabled:opacity-60 sm:text-[13px]"
                >
                  {loading ? (
                    <>
                      <Loader2
                        aria-hidden="true"
                        className="h-4 w-4 animate-spin"
                      />
                      Signing in…
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                      />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="text-center">
                <h1 className="text-2xl font-semibold text-white sm:text-3xl">
                  Reset password
                </h1>
                <p className="mt-2 text-sm text-neutral-400">
                  Enter your email and we&apos;ll send a reset link.
                </p>
              </div>

              {forgotSent ? (
                <div className="mt-8 rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-200">
                  If the email is registered, a reset link has been sent.
                </div>
              ) : (
                <form onSubmit={handleForgot} className="mt-8 space-y-5">
                  <label className="block">
                    <span className="block text-[11px] font-semibold uppercase tracking-widest text-neutral-400 sm:text-xs">
                      Email
                    </span>
                    <div className="relative mt-2">
                      <Mail
                        aria-hidden="true"
                        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500"
                      />
                      <input
                        type="email"
                        required
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="admin@hiwagamakers.com"
                        className="w-full rounded-lg border border-white/10 bg-white/[0.03] py-3 pl-10 pr-4 text-sm text-white placeholder:text-neutral-500 focus:border-[#FFD700]/60 focus:bg-white/[0.06] focus:outline-none"
                      />
                    </div>
                  </label>

                  {forgotError && (
                    <p
                      className="rounded-md border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-300"
                      role="alert"
                    >
                      {forgotError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#FFD700] px-5 py-3 text-xs font-semibold uppercase tracking-widest text-neutral-900 transition-colors hover:bg-[#FFE57A] disabled:opacity-60 sm:text-[13px]"
                  >
                    {forgotLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      'Send reset link'
                    )}
                  </button>
                </form>
              )}

              <button
                type="button"
                onClick={() => {
                  setForgotOpen(false)
                  setForgotSent(false)
                  setForgotError('')
                }}
                className="mt-4 inline-flex w-full items-center justify-center text-xs text-neutral-400 underline-offset-4 hover:text-white hover:underline"
              >
                ← Back to sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
