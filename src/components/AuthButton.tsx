"use client";

import { LogIn, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="w-20 h-8 animate-pulse bg-zinc-200 dark:bg-zinc-800 rounded-md" />;
  }

  if (session) {
    return (
      <button
        onClick={() => signOut()}
        className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
      >
        <span className="hidden sm:inline">Sign Out</span>
        <LogOut size={16} />
      </button>
    );
  }

  return (
    <Link
      href="/login"
      className="flex items-center gap-2 text-sm font-medium bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 px-3 py-1.5 rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm"
    >
      <span className="hidden sm:inline">Sign In</span>
      <LogIn size={16} />
    </Link>
  );
}