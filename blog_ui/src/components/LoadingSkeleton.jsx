export function PostListSkeleton() {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div
          key={idx}
          className="animate-pulse rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="h-5 w-2/3 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="mt-3 h-4 w-full rounded bg-slate-200 dark:bg-slate-700" />
          <div className="mt-2 h-4 w-5/6 rounded bg-slate-200 dark:bg-slate-700" />
        </div>
      ))}
    </div>
  )
}

export function FormSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="h-5 w-32 rounded bg-slate-200 dark:bg-slate-700" />
      <div className="mt-4 h-11 rounded bg-slate-200 dark:bg-slate-700" />
      <div className="mt-3 h-24 rounded bg-slate-200 dark:bg-slate-700" />
      <div className="mt-4 h-11 w-32 rounded bg-slate-200 dark:bg-slate-700" />
    </div>
  )
}
