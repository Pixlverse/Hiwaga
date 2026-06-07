import axios from 'axios'

const TOKEN_KEY = 'hiwaga_admin_token'
const USER_KEY = 'hiwaga_admin_user'

export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const setToken = (t) => localStorage.setItem(TOKEN_KEY, t)
export const clearToken = () => localStorage.removeItem(TOKEN_KEY)

export const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || 'null')
  } catch {
    return null
  }
}
export const setStoredUser = (u) =>
  localStorage.setItem(USER_KEY, JSON.stringify(u))
export const clearStoredUser = () => localStorage.removeItem(USER_KEY)

export const clearSession = () => {
  clearToken()
  clearStoredUser()
}

const adminApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 20000,
})

// Attach JWT on every request
adminApi.interceptors.request.use((config) => {
  const token = getToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Auto-redirect on 401 (expired / invalid token)
adminApi.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status
    if (status === 401) {
      clearSession()
      const onLogin = window.location.pathname.startsWith('/admin/login')
      if (!onLogin) {
        const next = encodeURIComponent(
          window.location.pathname + window.location.search,
        )
        window.location.href = `/admin/login?next=${next}`
      }
    }
    return Promise.reject(err)
  },
)

// Tiny helper for components — extracts API error message reliably.
export const apiError = (err) =>
  err?.response?.data?.message ||
  err?.message ||
  'Something went wrong'

export default adminApi
