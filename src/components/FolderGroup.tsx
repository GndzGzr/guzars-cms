"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown, Folder, FileText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface Note {
  slug: string;
  title: string;
}

interface FolderGroupProps {
  title: string;
  notes: Note[];
  defaultOpen?: boolean;
}

export function FolderGroup({ title, notes, defaultOpen = false }: FolderGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const pathname = usePathname();

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 w-full px-2 py-1.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
      >
        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        <Folder size={14} />
        {title}
      </button>

      {isOpen && (
        <ul className="space-y-0.5 mt-1 pl-4">
          {notes.length === 0 ? (
            <li className="px-3 py-1.5 text-zinc-400 dark:text-zinc-600 italic text-xs">
              No notes
            </li>
          ) : (
             notes.map((note) => {
              const href = `/notes/${note.slug}`;
              const isActive = pathname === href;

              return (
                <li key={note.slug}>
                  <Link
                    href={href}
                    className={clsx(
                      "flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors",
                      isActive
                        ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                    )}
                  >
                    <FileText size={16} className={isActive ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400"} />
                    <span className="truncate">{note.title || note.slug}</span>
                  </Link>
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}