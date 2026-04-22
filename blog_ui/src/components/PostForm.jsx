export default function PostForm({
  values,
  errors,
  loading,
  onChange,
  onSubmit,
  submitLabel,
  showAuthorId = false,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          Title
        </label>
        <input
          id="title"
          name="title"
          value={values.title}
          onChange={onChange}
          required
          aria-label="Post title"
          className="min-h-11 w-full rounded-lg border border-slate-300 px-3 text-sm dark:border-slate-700 dark:bg-slate-950"
        />
        {errors.title ? (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>
        ) : null}
      </div>

      <div className="mt-4">
        <label
          htmlFor="tags"
          className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          Tags (comma separated)
        </label>
        <input
          id="tags"
          name="tags"
          value={values.tags}
          onChange={onChange}
          aria-label="Post tags"
          className="min-h-11 w-full rounded-lg border border-slate-300 px-3 text-sm dark:border-slate-700 dark:bg-slate-950"
        />
        {errors.tags ? (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.tags}</p>
        ) : null}
      </div>

      {showAuthorId ? (
        <div className="mt-4">
          <label
            htmlFor="author_id"
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Author ID
          </label>
          <input
            id="author_id"
            name="author_id"
            type="number"
            min="1"
            value={values.author_id}
            onChange={onChange}
            aria-label="Author ID"
            className="min-h-11 w-full rounded-lg border border-slate-300 px-3 text-sm dark:border-slate-700 dark:bg-slate-950"
          />
          {errors.author_id ? (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.author_id}
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="mt-4">
        <label
          htmlFor="content"
          className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          Content
        </label>
        <textarea
          id="content"
          name="content"
          rows="7"
          value={values.content}
          onChange={onChange}
          required
          aria-label="Post content"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
        />
        {errors.content ? (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.content}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={loading}
        aria-label={submitLabel}
        className="mt-4 min-h-11 rounded-lg bg-indigo-600 px-5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-70"
      >
        {loading ? 'Saving...' : submitLabel}
      </button>
    </form>
  )
}
