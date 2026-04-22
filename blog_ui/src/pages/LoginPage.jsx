import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { getApiErrorMessage } from '../api/errors'
import { loginUser } from '../api/auth'
import { FormSkeleton } from '../components/LoadingSkeleton'
import { ErrorState } from '../components/StateCard'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'

export default function LoginPage() {
  const [values, setValues] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from || '/posts'

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await loginUser(values)
      const token = response.data?.access_token
      if (!token) throw new Error('Missing token')
      login(token)
      showToast('Welcome back!')
      navigate(from, { replace: true })
    } catch (err) {
      const message = getApiErrorMessage(err, 'Invalid email or password.')
      setError(message)
      showToast(message, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-md rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Login</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Sign in to manage your blog posts.
      </p>

      {loading ? <FormSkeleton /> : null}
      {error ? <ErrorState message={error} /> : null}

      <form onSubmit={onSubmit} className="mt-4 space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={values.email}
            onChange={onChange}
            required
            className="min-h-11 w-full rounded-lg border border-slate-300 px-3 text-sm dark:border-slate-700 dark:bg-slate-950"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={values.password}
            onChange={onChange}
            required
            className="min-h-11 w-full rounded-lg border border-slate-300 px-3 text-sm dark:border-slate-700 dark:bg-slate-950"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="min-h-11 w-full rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-70"
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-300">
        Don't have an account?{' '}
        <Link to="/register" className="text-indigo-600 hover:underline">
          Register
        </Link>
      </p>
    </section>
  )
}
