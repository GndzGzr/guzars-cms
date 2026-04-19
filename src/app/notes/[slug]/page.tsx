import { fetchAPI } from '@/lib/api';
import { Note } from '@/types';
import parse, { domToReact, Element } from 'html-react-parser';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const slug = (await params).slug;
    const note: Note = await fetchAPI(`/api/notes/${slug}/`);
    return { title: `${note.title} | Guzars CMS` };
  } catch {
    return { title: 'Note Not Found' };
  }
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  let note: Note;
  try {
    const slug = (await params).slug;
    note = await fetchAPI(`/api/notes/${slug}/`);
  } catch (error) {
    notFound();
  }

  const options = {
    replace: (domNode: any) => {
      // 1. Intercept Internal Wikilinks
      if (domNode instanceof Element && domNode.name === 'a' && domNode.attribs?.class === 'internal-link') {
        // Assume API yields `/api/notes/my-slug`, replace with safe frontend path `/notes/my-slug`
        let localPath = domNode.attribs.href.replace('/api/notes/', '/notes/');
        // Fallback constraint just in case it doesn't have an absolute path:
        if (!localPath.startsWith('/')) {
            localPath = `/notes/${localPath}`;
        }
        
        return (
          <Link href={localPath} className="text-zinc-900 dark:text-zinc-100 font-medium underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700 hover:decoration-zinc-900 dark:hover:decoration-zinc-100 transition-colors">
            {domToReact(domNode.children as any, options)}
          </Link>
        );
      }

      // 2. Intercept Embedded Images & PDFs
      if (domNode instanceof Element && domNode.name === 'img' && domNode.attribs?.class === 'obsidian-embed-image') {
        const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:8000';
        const src = domNode.attribs.src.startsWith('http') ? domNode.attribs.src : `${apiBase}${domNode.attribs.src}`;
        
        return (
          <span className="block my-6">
            <img 
              src={src} 
              alt={domNode.attribs.alt || 'Obsidian Embed'} 
              className="rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800"
              loading="lazy"
            />
          </span>
        );
      }
    }
  };

  return (
    <article className="max-w-3xl mx-auto px-6 py-12 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 text-zinc-900 dark:text-zinc-50">
          {note.title}
        </h1>
        <div className="flex gap-2 mb-6 flex-wrap">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-50 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">
            {note.note_type}
          </span>
          {note.tags.map((t) => (
            <span key={t.slug} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
              #{t.name}
            </span>
          ))}
        </div>
      </div>
      
      <div className="prose prose-zinc dark:prose-invert max-w-none prose-a:text-zinc-900 prose-a:dark:text-zinc-100 prose-a:decoration-zinc-300 prose-a:dark:decoration-zinc-700 prose-a:underline-offset-4 hover:prose-a:decoration-zinc-900 hover:prose-a:dark:decoration-zinc-100 prose-headings:font-semibold">
        {parse(note.content_html, options)}
      </div>
      
      {note.incoming_links && note.incoming_links.length > 0 && (
        <div className="mt-16 border-t border-zinc-200 dark:border-zinc-800 pt-8">
          <h3 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-zinc-100">
            Linked References
          </h3>
          <ul className="space-y-4 m-0 p-0 list-none">
            {note.incoming_links.map((link) => (
              <li key={link.id} className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
                <Link href={`/notes/${link.source.slug}`} className="font-medium text-zinc-900 dark:text-zinc-100 hover:underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700 block mb-2">
                  {link.source.title}
                </Link>
                {link.context_text && (
                  <blockquote className="text-sm text-zinc-500 dark:text-zinc-400 italic border-l-2 border-zinc-300 dark:border-zinc-700 pl-3 m-0">
                    "{link.context_text}"
                  </blockquote>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}