import { Link } from 'react-router-dom'
import { EmptyState } from '../components/StateCard'

export default function NotFoundPage() {
  return (
    <EmptyState
      title="Page not found"
      description="The page you are looking for does not exist."
      action={
        <Link
          to="/posts"
          className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Back to posts
        </Link>
      }
    />
  )
}
