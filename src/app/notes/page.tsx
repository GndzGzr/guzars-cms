import { fetchAPI } from '@/lib/api';
import { Note } from '@/types';
import Link from 'next/link';

export const metadata = {
  title: 'All Notes - Guzars CMS',
  description: 'A complete index of all digital garden notes.',
};

export default async function NotesIndex({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10);
  const pageSize = 20;

  let allNotes: Note[] = [];
  let error = null;

  try {
    const data = await fetchAPI('/api/notes/');
    // If paginated response, handle inner results
    allNotes = data.results || data;
  } catch (e: any) {
    error = e.message;
  }

  const totalNotes = allNotes.length;
  const totalPages = Math.ceil(totalNotes / pageSize);
  const notes = allNotes.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 lg:px-8">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-zinc-900 dark:text-zinc-50">
          Guzars Vault
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
                    <span key={tag.slug} className="text-purple-600 dark:text-purple-400 before:content-['#']">
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

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              {currentPage > 1 ? (
                <Link 
                  href={`/notes?page=${currentPage - 1}`}
                  className="px-4 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 transition-colors"
                >
                  Previous
                </Link>
              ) : (
                <span className="px-4 py-2 text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-400 dark:text-zinc-600 cursor-not-allowed">
                  Previous
                </span>
              )}
              
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                Page {currentPage} of {totalPages}
              </span>

              {currentPage < totalPages ? (
                <Link 
                  href={`/notes?page=${currentPage + 1}`}
                  className="px-4 py-2 text-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 transition-colors"
                >
                  Next
                </Link>
              ) : (
                <span className="px-4 py-2 text-sm bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md text-zinc-400 dark:text-zinc-600 cursor-not-allowed">
                  Next
                </span>
              )}
            </div>
          )}
        </ul>
      )}
    </div>
  );
}