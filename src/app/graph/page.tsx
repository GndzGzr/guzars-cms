import { fetchAPI } from '@/lib/api';
import NoteGraph from '@/components/NoteGraph';

export const metadata = {
  title: 'Graph View - Guzars CMS',
  description: 'Visual map of your digital garden.',
};

export default async function GraphPage() {
  let graphData = { nodes: [], links: [] };
  try {
    graphData = await fetchAPI('/api/notes/graph/');
  } catch (e: any) {
    console.error("Graph fetch failed:", e.message);
  }

  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-6 z-10 pointer-events-none">
         <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
           Knowledge Graph
         </h1>
      </div>
      <NoteGraph graphData={graphData} />
    </div>
  );
}