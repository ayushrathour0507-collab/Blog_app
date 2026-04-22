import { Link } from 'react-router-dom'

export default function PostCard({ post }) {
  const postId = post.id ?? post._id
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
        {post.title}
      </h2>
      <p className="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">
        {post.content}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {(post.tags ?? []).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-indigo-100 px-2 py-1 text-xs text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-200"
          >
            #{tag}
          </span>
        ))}
      </div>
      <Link
        to={`/posts/${postId}`}
        className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white hover:bg-indigo-700"
        aria-label={`View ${post.title}`}
      >
        View details
      </Link>
    </article>
  )
}
