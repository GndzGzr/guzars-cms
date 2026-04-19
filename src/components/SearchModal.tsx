"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { fetchAPI } from "@/lib/api";

export function SearchModal() {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState<{ id: number; title: string; slug: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Fetch notes on open
  useEffect(() => {
    if (open && notes.length === 0) {
      setLoading(true);
      fetch('/api/local-search')
        .then(res => res.json())
        .then(data => {
            const results = data.results || data;
            if (Array.isArray(results)) {
                setNotes(results);
            } else {
                setNotes([]);
            }
            setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [open, notes.length]);

  return (
    <>
      <button 
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md transition-colors"
      >
        <Search size={16} />
        <span>Search...</span>
        <kbd className="ml-auto text-xs bg-zinc-200 dark:bg-zinc-800 px-1.5 rounded text-zinc-500">⌘K</kbd>
      </button>

      <Command.Dialog 
        open={open} 
        onOpenChange={setOpen}
        label="Search Notes"
        className="fixed top-[20%] left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl p-2 w-[90vw] max-w-md z-50 overflow-hidden outline-none"
      >
        <div className="flex items-center border-b border-zinc-200 dark:border-zinc-800 px-3 pb-2 mb-2">
            <Search size={18} className="text-zinc-400 mr-2 shrink-0" />
            <Command.Input 
                autoFocus
                placeholder="Search your knowledge base..." 
                className="w-full bg-transparent outline-none border-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 py-2 sm:text-sm"
            />
        </div>

        <Command.List className="max-h-[300px] overflow-y-auto outline-none transition-all">
          <Command.Empty className="py-6 text-center text-sm text-zinc-500">
             {loading ? 'Loading notes...' : 'No notes found.'}
          </Command.Empty>
          
          <Command.Group heading="Notes" className="text-xs text-zinc-500 font-medium px-2 py-1">
            {notes.map((note) => (
              <Command.Item
                key={note.id}
                value={note.title}
                onSelect={() => {
                  setOpen(false);
                  router.push(`/notes/${note.slug}`);
                }}
                className="flex items-center px-2 py-2 rounded-md cursor-pointer text-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 aria-selected:bg-zinc-100 dark:aria-selected:bg-zinc-800 transition-colors"
              >
                {note.title}
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command.Dialog>
      
      {/* Overlay background */}
      {open && (
        <div className="fixed inset-0 bg-black/20 dark:bg-black/50 z-40 backdrop-blur-sm transition-opacity" onClick={() => setOpen(false)} />
      )}
    </>
  );
}