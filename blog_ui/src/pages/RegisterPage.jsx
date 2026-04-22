import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getApiErrorMessage } from '../api/errors'
import { registerUser } from '../api/auth'
import { FormSkeleton } from '../components/LoadingSkeleton'
import { ErrorState } from '../components/StateCard'
import { useToast } from '../hooks/useToast'

export default function RegisterPage() {
  const [values, setValues] = useState({ email: '', password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { showToast } = useToast()
  const navigate = useNavigate()

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (values.password !== values.confirm) {
      setError('Passwords do not match.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await registerUser({ email: values.email, password: values.password })
      showToast('Account created! Please log in.')
      navigate('/login')
    } catch (err) {
      const message = getApiErrorMessage(err, 'Registration failed.')
      setError(message)
      showToast(message, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-md rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Register</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Create an account to start writing posts.
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
            minLength={6}
            className="min-h-11 w-full rounded-lg border border-slate-300 px-3 text-sm dark:border-slate-700 dark:bg-slate-950"
          />
        </div>
        <div>
          <label htmlFor="confirm" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
            Confirm Password
          </label>
          <input
            id="confirm"
            type="password"
            name="confirm"
            value={values.confirm}
            onChange={onChange}
            required
            minLength={6}
            className="min-h-11 w-full rounded-lg border border-slate-300 px-3 text-sm dark:border-slate-700 dark:bg-slate-950"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="min-h-11 w-full rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-70"
        >
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-300">
        Already have an account?{' '}
        <Link to="/login" className="text-indigo-600 hover:underline">
          Login
        </Link>
      </p>
    </section>
  )
}
