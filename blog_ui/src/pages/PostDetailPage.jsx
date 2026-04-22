import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deletePost, getPostById } from '../api/posts'
import { FormSkeleton } from '../components/LoadingSkeleton'
import { EmptyState, ErrorState, SuccessState } from '../components/StateCard'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'

const getErrorMessage = (error) =>
  error?.response?.data?.message || 'Unable to fetch post details.'

export default function PostDetailPage() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const success = 'Post loaded successfully.'
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { isAuthenticated } = useAuth()

  const fetchPost = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const response = await getPostById(id)
      setPost(response.data)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPost()
  }, [fetchPost])

  const handleDelete = async () => {
    const ok = window.confirm('Delete this post permanently?')
    if (!ok) return

    try {
      await deletePost(id)
      showToast('Post deleted successfully.')
      navigate('/posts')
    } catch (err) {
      const message = err?.response?.data?.message || 'Delete failed.'
      setError(message)
      showToast(message, 'error')
    }
  }

  if (loading) return <FormSkeleton />
  if (error) return <ErrorState message={error} onRetry={fetchPost} />
  if (!post) {
    return (
      <EmptyState
        title="Post not available"
        description="This post does not exist or was removed."
      />
    )
  }

  return (
    <article className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <SuccessState message={success} />
      <h1 className="mt-4 text-2xl font-bold text-slate-900 dark:text-slate-100">
        {post.title}
      </h1>
      <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-700 dark:text-slate-300">
        {post.content}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {(post.tags ?? []).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-indigo-100 px-2 py-1 text-xs text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-200"
          >
            #{tag}
          </span>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {isAuthenticated ? (
          <>
            <Link
              to={`/posts/${id}/edit`}
              className="inline-flex min-h-11 items-center rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white hover:bg-indigo-700"
              aria-label="Edit post"
            >
              Edit
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              className="min-h-11 rounded-lg bg-red-600 px-4 text-sm font-medium text-white hover:bg-red-700"
              aria-label="Delete post"
            >
              Delete
            </button>
          </>
        ) : null}
      </div>
    </article>
  )
}
