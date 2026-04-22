import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getApiErrorMessage } from '../api/errors'
import { getPosts } from '../api/posts'
import { PostListSkeleton } from '../components/LoadingSkeleton'
import PostCard from '../components/PostCard'
import { EmptyState, ErrorState, SuccessState } from '../components/StateCard'

const PAGE_SIZE = 6

const getErrorMessage = (error) =>
  error?.response?.data?.message || 'Failed to load posts.'

const normalizePostsResponse = (payload) => {
  if (Array.isArray(payload)) {
    return { items: payload, totalPages: 1 }
  }
  const data = payload?.data ?? payload?.posts ?? []
  const totalPages = payload?.totalPages ?? payload?.meta?.totalPages ?? 1
  return { items: Array.isArray(data) ? data : [], totalPages }
}

export default function PostsPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [tag, setTag] = useState('')
  const successMessage = 'Posts loaded successfully.'

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const response = await getPosts({
        page,
        limit: PAGE_SIZE,
        ...(tag ? { tag } : {}),
      })
      const normalized = normalizePostsResponse(response.data)
      setPosts(normalized.items)
      setTotalPages(Math.max(1, normalized.totalPages))
      setHasNextPage(normalized.totalPages > 1 ? page < normalized.totalPages : normalized.items.length === PAGE_SIZE)
    } catch (err) {
      setError(getApiErrorMessage(err, getErrorMessage(err)))
    } finally {
      setLoading(false)
    }
  }, [page, tag])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPosts()
  }, [fetchPosts])

  const allTags = useMemo(
    () => [...new Set(posts.flatMap((post) => post.tags ?? []))],
    [posts],
  )

  return (
    <section>
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Blog Posts
        </h1>
        <div className="flex flex-wrap gap-2">
          <label htmlFor="tag-filter" className="sr-only">
            Filter posts by tag
          </label>
          <select
            id="tag-filter"
            aria-label="Tag filter"
            value={tag}
            onChange={(event) => {
              setPage(1)
              setTag(event.target.value)
            }}
            className="min-h-11 rounded-lg border border-slate-300 px-3 text-sm dark:border-slate-700 dark:bg-slate-900"
          >
            <option value="">All tags</option>
            {allTags.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <Link
            to="/posts/new"
            className="inline-flex min-h-11 items-center rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white hover:bg-indigo-700"
          >
            New Post
          </Link>
        </div>
      </div>

      {!loading && !error ? <SuccessState message={successMessage} /> : null}

      <div className="mt-4">
        {loading ? <PostListSkeleton /> : null}
        {!loading && error ? (
          <ErrorState message={error} onRetry={fetchPosts} />
        ) : null}
        {!loading && !error && posts.length === 0 ? (
          <EmptyState
            title="No posts found"
            description="Create a post or clear filters to see content."
            action={
              <Link
                to="/posts/new"
                className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Create your first post
              </Link>
            }
          />
        ) : null}

        {!loading && !error && posts.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id ?? post._id} post={post} />
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <button
          type="button"
          disabled={page === 1 || loading}
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          className="min-h-11 rounded-lg border border-slate-300 px-4 text-sm disabled:opacity-50 dark:border-slate-700"
          aria-label="Go to previous page"
        >
          Prev
        </button>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Page {page} of {totalPages}
        </p>
        <button
          type="button"
          disabled={(!hasNextPage && page >= totalPages) || loading}
          onClick={() => setPage((prev) => prev + 1)}
          className="min-h-11 rounded-lg border border-slate-300 px-4 text-sm disabled:opacity-50 dark:border-slate-700"
          aria-label="Go to next page"
        >
          Next
        </button>
      </div>
    </section>
  )
}
