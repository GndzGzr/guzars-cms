export default function Home() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12 lg:px-8 prose prose-zinc dark:prose-invert">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          Next.js App Router Architecture
        </h1>
        <div className="flex gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
            Next.js
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
            Architecture
          </span>
        </div>
      </div>

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <p className="lead text-zinc-500 dark:text-zinc-400 text-lg">
          The App Router is a new paradigm in Next.js that brings server components, streaming, and advanced routing patterns. This note explores how React Server Components reshape our approach to data fetching.
        </p>

        <h2>What are React Server Components?</h2>
        <p>
          RSCs execute completely on the server, producing UI instead of JSON. 
          This means you can skip sending massive dependencies (like Markdown parsers or date libraries) to the client.
        </p>

        <pre><code>{`export default async function NotePage({ params }) {
  const note = await fetchNote(params.slug);
  return (
    <div>
      <h1>{note.title}</h1>
      <div>{parse(note.htmlContent)}</div>
    </div>
  );
}`}</code></pre>

        <h3>Client Components</h3>
        <p>
          Need interactivity? Add <code>"use client"</code> at the top of the file to boundary the client-side JavaScript execution.
        </p>
        
        <hr className="my-8 border-zinc-200 dark:border-zinc-800" />
        
        <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 mt-12">
          <h3 className="text-lg font-semibold mb-4 mt-0">References</h3>
          <ul className="space-y-2 m-0 p-0 list-none">
            <li>
              <a href="#" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors inline-block text-sm">
                [[React 18 Features]]
              </a>
            </li>
            <li>
              <a href="#" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors inline-block text-sm">
                [[Streaming UI]]
              </a>
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
}
