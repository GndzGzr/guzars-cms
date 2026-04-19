import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
import { Lock } from "lucide-react";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] bg-zinc-50 dark:bg-zinc-950 px-4 text-center">
        <div className="max-w-lg mb-8">
           <div className="mx-auto bg-zinc-100 dark:bg-zinc-800 w-16 h-16 flex items-center justify-center rounded-full mb-6 shadow-sm border border-zinc-200 dark:border-zinc-700">
              <Lock className="text-zinc-600 dark:text-zinc-400" size={32} />
           </div>
           <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
             Guzars Vault
           </h1>
           <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
             This is a private, headless CMS representing a synced Obsidian vault. You must be an authorized admin to view the internal graph and permanent notes.
           </p>
           <Link href="/login" className="inline-flex items-center gap-2 font-medium bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 px-6 py-3 rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm text-lg">
             Go to Login
           </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-12 lg:px-8 prose prose-zinc dark:prose-invert">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          Guzars Obsidian CMS (Admin View)
        </h1>
        <div className="flex gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
            Guzars Vault
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            Superuser
          </span>
        </div>
      </div>

      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <p className="lead text-zinc-500 dark:text-zinc-400 text-lg">
          Welcome back. You are currently logged in with Superuser Privileges.
        </p>

        <h2>Architecture Recap</h2>
        <p>
          This Next.js instance interfaces with the Django backend using a master Admin Token. This grants unrestricted read access to unpublished drafts, configuration payloads, and backend-only metrics.
        </p>
        
        <h3>Current Access Methods</h3>
        <ul>
          <li><strong>Permanent Notes:</strong> <code>GET /api/notes/?note_type=PRM</code></li>
          <li><strong>Graph Data:</strong> Relational parsing of <code>incoming_links</code> and <code>outgoing_links</code> via Mistune.</li>
          <li><strong>Asset Proxy:</strong> Secure retrieval via <code>GET /api/assets/?file=...</code> avoiding raw GitHub repository exposure.</li>
        </ul>
        
        <hr className="my-8 border-zinc-200 dark:border-zinc-800" />
        
        <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 mt-12">
          <h3 className="text-lg font-semibold mb-4 mt-0">Explore Backend Data</h3>
          <ul className="space-y-2 m-0 p-0 list-none">
            <li>
              <a href="/notes" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors inline-block text-sm">
                📚 Browse Internal Vault
              </a>
            </li>
            <li>
              <a href="/graph" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors inline-block text-sm">
                🕸️ Explore the Connection Graph
              </a>
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
}
