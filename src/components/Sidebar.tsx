import { Folder, FileText, Search, Settings, Hash, Network } from "lucide-react";
import Link from "next/link";
import { SearchModal } from "./SearchModal";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 flex flex-col h-full overflow-hidden transition-all duration-300">
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-black dark:bg-white flex items-center justify-center">
          <span className="text-white dark:text-black font-bold text-xs">G</span>
        </div>
        <span className="font-semibold text-sm tracking-tight text-zinc-900 dark:text-zinc-100">Guzars CMS</span>
      </div>

      <div className="p-3">
        <SearchModal />
      </div>

      <div className="flex-grow overflow-y-auto px-3 py-2 space-y-4 text-sm">
        <div>
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-3">Explore</h3>
          <ul className="space-y-0.5">
            <li>
              <Link href="/notes" className="flex items-center gap-2 px-3 py-1.5 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md transition-colors">
                <FileText size={16} className="text-zinc-400" />
                All Notes
              </Link>
            </li>
            <li>
              <Link href="/graph" className="flex items-center gap-2 px-3 py-1.5 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md transition-colors">
                <Network size={16} className="text-zinc-400" />
                Graph View
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
                <span className="truncate">Next.js App Router Architecture</span>
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
