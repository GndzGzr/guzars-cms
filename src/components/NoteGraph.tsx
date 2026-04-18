"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Note } from "@/types";

// Dynamically import ForceGraph2D with ssr: false since it relies on window/canvas
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

interface GraphData {
  nodes: { id: string; name: string; val: number; color?: string }[];
  links: { source: string; target: string }[];
}

export default function NoteGraph({
  notes,
}: {
  notes: Note[];
}) {
  const router = useRouter();
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate nodes and links from notes
    const nodes = notes.map((note) => ({
      id: note.slug,
      name: note.title,
      val: Math.min(20, (note.incoming_links?.length || 0) * 2 + 10), // Node size based on connections
      color: "#a1a1aa", // zinc-400
    }));

    const links: { source: string; target: string }[] = [];
    notes.forEach((note) => {
      if (note.outgoing_links) {
        note.outgoing_links.forEach((link) => {
          // ensure target exists in nodes to prevent graph crashes
          if (nodes.find((n) => n.id === link.target.slug)) {
            links.push({
              source: note.slug,
              target: link.target.slug,
            });
          }
        });
      }
    });

    setGraphData({ nodes, links });
  }, [notes]);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const handleNodeClick = useCallback(
    (node: any) => {
      router.push(`/notes/${node.id}`);
    },
    [router]
  );

  return (
    <div ref={containerRef} className="w-full h-[calc(100vh-3.5rem)] bg-zinc-50 dark:bg-zinc-950 overflow-hidden cursor-grab active:cursor-grabbing">
      <ForceGraph2D
        width={dimensions.width}
        height={dimensions.height}
        graphData={graphData}
        nodeLabel="name"
        nodeColor={(node: any) => node.color}
        nodeRelSize={4}
        linkColor={() => "#e4e4e7"} // zinc-200
        linkWidth={1}
        nodeCanvasObjectMode={() => "after"}
        nodeCanvasObject={(node: any, ctx, globalScale) => {
          const label = node.name;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#18181b"; // zinc-900
          if (globalScale > 1.5) {
            ctx.fillText(label, node.x, node.y + 8);
          }
        }}
        onNodeClick={handleNodeClick}
        d3VelocityDecay={0.3}
      />
    </div>
  );
}