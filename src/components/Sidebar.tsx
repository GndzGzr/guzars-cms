import { Folder, FileText, Search, Settings, Hash } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 flex flex-col h-full overflow-hidden transition-all duration-300">
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-black dark:bg-white flex items-center justify-center">
          <span className="text-white dark:text-black font-bold text-xs">G</span>
        </div>
        <span className="font-semibold text-sm tracking-tight">Guzars CMS</span>
      </div>

      <div className="p-3">
        <button className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md transition-colors">
          <Search size={16} />
          <span>Search...</span>
          <kbd className="ml-auto text-xs bg-zinc-200 dark:bg-zinc-800 px-1.5 rounded text-zinc-500">⌘K</kbd>
        </button>
      </div>

      <div className="flex-grow overflow-y-auto px-3 py-2 space-y-4 text-sm">
        <div>
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-3">Topics</h3>
          <ul className="space-y-0.5">
            <li>
              <Link href="#" className="flex items-center gap-2 px-3 py-1.5 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md transition-colors">
                <Hash size={16} className="text-zinc-400" />
                Engineering
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center gap-2 px-3 py-1.5 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md transition-colors">
                <Hash size={16} className="text-zinc-400" />
                Philosophy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-3">Recent Notes</h3>
          <ul className="space-y-0.5">
            <li>
              <Link href="#" className="flex items-center gap-2 px-3 py-1.5 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 bg-zinc-100 dark:bg-zinc-900 rounded-md transition-colors">
                <FileText size={16} className="text-zinc-400" />
                <span>Next.js App Router Architecture</span>
              </Link>
            </li>
            <li>
              <Link href="#" className="flex items-center gap-2 px-3 py-1.5 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md transition-colors">
                <FileText size={16} className="text-zinc-400" />
                <span>Minimal UI Design</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="p-3 border-t border-zinc-200 dark:border-zinc-800">
        <button className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md transition-colors">
          <Settings size={16} />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}
