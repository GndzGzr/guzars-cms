export default function Home() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12 lg:px-8 prose prose-zinc dark:prose-invert">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          Guzars Obsidian CMS
        </h1>
        <div className="flex gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
            Digital Garden
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
            Next.js
          </span>
        </div>
      </div>

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <p className="lead text-zinc-500 dark:text-zinc-400 text-lg">
          Welcome to my second brain. This platform is a headless CMS built on top of my local Obsidian vault, allowing me to publish interconnected thoughts, engineering notes, and philosophical musings dynamically.
        </p>

        <h2>How it Works</h2>
        <p>
          I write locally in <strong>Obsidian</strong> using standard Markdown. Those files are synced to a private repository via the Obsidian Git plugin. A Webhook triggers a Django backend parsing job that converts Markdown wikilinks into relational database entries, finally surfacing here through a Next.js App Router frontend.
        </p>

        <h3>Core Features</h3>
        <ul>
          <li><strong>Wikilinks:</strong> Intercepted and mapped seamlessly into native <code>&lt;Link&gt;</code> components.</li>
          <li><strong>Graph View:</strong> A D3-powered force graph (accessible via the sidebar) models the neural connections of my notes.</li>
          <li><strong>Command Palette:</strong> Hit <kbd>Cmd+K</kbd> anywhere to fuzzy-search across the entire knowledge base.</li>
        </ul>

        <h2>Authorization Roadmap</h2>
        <p>
          Currently rolling out a secure authentication layer to manage public vs. private notes. Soon, logging in will verify access tokens against the Django backend, ensuring draft or private entries never leak to public endpoints.
        </p>
        
        <hr className="my-8 border-zinc-200 dark:border-zinc-800" />
        
        <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 mt-12">
          <h3 className="text-lg font-semibold mb-4 mt-0">Getting Started</h3>
          <ul className="space-y-2 m-0 p-0 list-none">
            <li>
              <a href="/notes" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors inline-block text-sm">
                📚 Browse All Notes
              </a>
            </li>
            <li>
              <a href="/graph" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors inline-block text-sm">
                🕸️ Explore the Graph
              </a>
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
}
