import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || 'http://127.0.0.1:8000'

const client = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default client
