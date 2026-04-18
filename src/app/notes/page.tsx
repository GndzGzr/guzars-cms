import { fetchAPI } from '@/lib/api';
import { Note } from '@/types';
import Link from 'next/link';

export const metadata = {
  title: 'All Notes - Guzars CMS',
  description: 'A complete index of all digital garden notes.',
};

export default async function NotesIndex() {
  let notes: Note[] = [];
  let error = null;

  try {
    const data = await fetchAPI('/notes/');
    // If paginated response, handle inner results
    notes = data.results || data;
  } catch (e: any) {
    error = e.message;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 lg:px-8">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-zinc-900 dark:text-zinc-50">
          My Digital Garden
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400">
          A collection of thoughts, references, and permanent notes.
        </p>
      </div>

      {error ? (
        <div className="bg-red-50 text-red-800 border border-red-200 p-4 rounded-lg">
          Failed to load notes: {error}
        </div>
      ) : (
        <ul className="space-y-4">
          {notes.map((note) => (
            <li key={note.id} className="p-5 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:shadow-sm transition-shadow bg-zinc-50 dark:bg-zinc-900">
              <Link href={`/notes/${note.slug}`} className="block group">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 group-hover:underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-600">
                  {note.title}
                </h2>
                <div className="text-sm mt-3 flex items-center flex-wrap gap-2">
                  <span className="bg-white dark:bg-zinc-950 px-2.5 py-0.5 rounded shadow-sm border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {note.note_type}
                  </span>
                  {note.tags?.map((tag) => (
                    <span key={tag.slug} className="text-zinc-500 dark:text-zinc-400 before:content-['#']">
                      {tag.name}
                    </span>
                  ))}
                  <span className="text-zinc-400 dark:text-zinc-600 ml-auto">
                    {new Date(note.updated_at || note.created_at).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            </li>
          ))}
          {notes.length === 0 && (
            <p className="text-zinc-500 italic">No notes found. Create some in Obsidian!</p>
          )}
        </ul>
      )}
    </div>
  );
}