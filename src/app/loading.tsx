export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 lg:px-8 w-full animate-pulse">
      <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded-md w-3/4 mb-6"></div>
      <div className="flex gap-2 mb-10">
         <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded-full w-20"></div>
         <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded-full w-24"></div>
      </div>
      
      <div className="space-y-4">
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-full"></div>
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-full"></div>
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-5/6"></div>
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-full"></div>
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-4/5"></div>
      </div>
    </div>
  )
}