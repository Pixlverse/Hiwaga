import axios from 'axios'

// Public site — no auth, no 401 redirect.
const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

export const apiError = (err) =>
  err?.response?.data?.message ||
  err?.message ||
  'Something went wrong'

export default publicApi
