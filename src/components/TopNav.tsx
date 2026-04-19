"use client";

import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { AuthButton } from "./AuthButton";
import { ReloadButton } from "./ReloadButton";
import { Breadcrumbs } from "./Breadcrumbs";
import { useSidebar } from "./SidebarContext";

export default function TopNav() {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <header className="h-14 flex-shrink-0 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4 bg-white dark:bg-zinc-950 sticky top-0 z-10 transition-colors">
      <div className="flex items-center gap-4">
        <button 
          type="button"
          onClick={toggleSidebar}
          className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors sm:hidden"
        >
          <Menu size={20} />
        </button>
        <button 
          type="button"
          onClick={toggleSidebar}
          className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors hidden sm:block"
        >
          {isOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
        </button>
        
        <Breadcrumbs />
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <ReloadButton />
        <ThemeToggle />
        <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 hidden sm:block"></div>
        <AuthButton />
      </div>
    </header>
  );
}
