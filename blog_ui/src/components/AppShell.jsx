import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useTheme } from '../hooks/useTheme'
import { useToast } from '../hooks/useToast'

const navClass = ({ isActive }) =>
  `min-h-11 rounded-lg px-3 text-sm font-medium ${
    isActive
      ? 'bg-indigo-600 text-white'
      : 'text-slate-700 hover:bg-slate-200 dark:text-slate-200 dark:hover:bg-slate-800'
  }`

export default function AppShell({ children }) {
  const { isAuthenticated, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const onLogout = () => {
    logout()
    showToast('Logged out successfully.')
    navigate('/login')
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-4 md:px-6">
      <header className="mb-6 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link to="/posts" className="text-lg font-bold text-indigo-600">
            Blog UI
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="min-h-11 rounded-lg border border-slate-300 px-3 text-sm dark:border-slate-700"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
            {isAuthenticated ? (
              <button
                type="button"
                onClick={onLogout}
                className="min-h-11 rounded-lg bg-slate-900 px-4 text-sm text-white dark:bg-slate-100 dark:text-slate-900"
                aria-label="Logout"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex min-h-11 items-center rounded-lg bg-slate-900 px-4 text-sm text-white dark:bg-slate-100 dark:text-slate-900"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex min-h-11 items-center rounded-lg border border-slate-300 px-4 text-sm dark:border-slate-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        <nav className="mt-3 flex flex-wrap gap-2" aria-label="Main navigation">
          <NavLink to="/posts" className={navClass}>
            Posts
          </NavLink>
          <NavLink to="/posts/new" className={navClass}>
            Create Post
          </NavLink>
        </nav>
      </header>
      <main className="pb-6">{children}</main>
    </div>
  )
}
