export function ErrorState({ message, onRetry }) {
  return (
    <section className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/40">
      <h2 className="text-lg font-semibold text-red-700 dark:text-red-300">
        Something went wrong
      </h2>
      <p className="mt-2 text-sm text-red-600 dark:text-red-400">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 min-h-11 rounded-lg bg-red-600 px-4 text-sm font-medium text-white hover:bg-red-700"
          aria-label="Retry request"
        >
          Retry
        </button>
      ) : null}
    </section>
  )
}

export function EmptyState({ title, description, action }) {
  return (
    <section className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center dark:border-slate-700 dark:bg-slate-900">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
        {title}
      </h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        {description}
      </p>
      {action}
    </section>
  )
}

export function SuccessState({ message }) {
  return (
    <p
      role="status"
      className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300"
    >
      {message}
    </p>
  )
}
