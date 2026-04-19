"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Breadcrumbs() {
  const pathname = usePathname();
  const [hierarchy, setHierarchy] = useState<string[]>([]);
  
  useEffect(() => {
    if (!pathname.startsWith('/notes/')) {
      setHierarchy([]);
      return;
    }
    
    const slug = pathname.split('/').pop();
    if (!slug) return;

    // Fetch the tree to find the file_path of the current note
    fetch('/api/local-search')
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        if (Array.isArray(results)) {
          const note = results.find(n => n.slug === slug);
          if (note && note.file_path) {
             const parts = note.file_path.split('/');
             parts.pop(); // Remove the note name itself if we just want folders, or keep it?
             // "top folder hierarch should show until selected page" -> let's keep the note name at the end
             setHierarchy(parts);
          } else {
             // Fallback
             setHierarchy([note?.title || slug]);
          }
        }
      })
      .catch(console.error);

  }, [pathname]);

  const segments = pathname.split('/').filter(Boolean);

  if (pathname === '/') {
    return (
      <nav className="hidden sm:flex items-center text-sm font-medium text-zinc-500">
        <span className="text-purple-600 dark:text-purple-400">Home</span>
      </nav>
    );
  }

  // Fallback for non-note pages (like /graph)
  if (!pathname.startsWith('/notes/')) {
    return (
      <nav className="hidden sm:flex items-center text-sm font-medium text-zinc-500">
        <Link href="/" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
          Home
        </Link>
        <span className="mx-2 text-zinc-300 dark:text-zinc-700">/</span>
        <span className="text-zinc-900 dark:text-zinc-100 capitalize">{segments[0]}</span>
      </nav>
    );
  }

  return (
    <nav className="hidden sm:flex items-center text-sm font-medium text-zinc-500">
      <Link href="/" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
        Home
      </Link>
      <span className="mx-2 text-zinc-300 dark:text-zinc-700">/</span>
      <Link href="/notes" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
        Guzars Vault
      </Link>
      
      {hierarchy.map((folder, idx) => (
        <div key={idx} className="flex items-center">
          <span className="mx-2 text-zinc-300 dark:text-zinc-700">/</span>
          {idx === hierarchy.length - 1 ? (
             <span className="text-zinc-900 dark:text-zinc-100 truncate max-w-[150px]">{folder}</span>
          ) : (
             <span className="text-zinc-600 dark:text-zinc-400 truncate max-w-[100px]">{folder}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
