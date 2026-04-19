"use client";

import { Search, FolderTree, Settings, Network, FileText } from "lucide-react";

export function SidebarSkeleton() {
  return (
    <aside className="w-full flex flex-col h-full overflow-hidden transition-all duration-300">
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-black dark:bg-zinc-800 animate-pulse flex items-center justify-center">
            <span className="text-white dark:text-zinc-600 font-bold text-xs opacity-50">G</span>
          </div>
          <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
        </div>
      </div>

      <div className="p-3">
        {/* Search Input Skeleton */}
        <div className="h-9 w-full bg-zinc-200 dark:bg-zinc-800/80 rounded-md animate-pulse flex items-center px-3">
          <Search size={16} className="text-zinc-400 dark:text-zinc-600" />
        </div>
      </div>

      <div className="flex-grow overflow-y-auto px-1 py-2 space-y-4 text-sm">
        <div className="px-2">
          <ul className="space-y-0.5 mb-4">
            <li>
              <div className="flex items-center gap-2 px-3 py-1.5 opacity-50">
                <FileText size={16} className="text-zinc-400" />
                <div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-2 px-3 py-1.5 opacity-50">
                <Network size={16} className="text-zinc-400" />
                <div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="px-1 space-y-1">
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-3 flex items-center gap-2">
            <FolderTree size={14} className="text-zinc-400" />
            <div className="h-3 w-20 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
          </h3>
          
          <div className="space-y-2 px-3 pt-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-4 h-4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
                <div 
                  className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" 
                  style={{ width: `${30 + (i * 7)}%` }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-3 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 w-full px-3 py-1.5 text-sm opacity-50">
          <Settings size={16} className="text-zinc-400" />
          <div className="h-4 w-14 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
        </div>
      </div>
    </aside>
  );
}