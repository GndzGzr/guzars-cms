import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Link from "next/link";

export default function TopNav() {
  return (
    <header className="h-14 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4 bg-white dark:bg-zinc-950 sticky top-0 z-10 transition-colors">
      <div className="flex items-center gap-4">
        <button className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors sm:hidden">
          <Menu size={20} />
        </button>
        <button className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors hidden sm:block">
          <PanelLeftClose size={20} />
        </button>
        
        <nav className="hidden sm:flex items-center text-sm font-medium text-zinc-500">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            Home
          </Link>
          <span className="mx-2 text-zinc-300 dark:text-zinc-700">/</span>
          <span className="text-zinc-900 dark:text-zinc-100">Engineering</span>
          <span className="mx-2 text-zinc-300 dark:text-zinc-700">/</span>
          <span className="text-zinc-900 dark:text-zinc-100">Next.js App Router Architecture</span>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {/* Placeholder for future Actions like View Graph, Theme Toggle */}
      </div>
    </header>
  );
}
