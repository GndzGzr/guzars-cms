"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// Dynamically import ForceGraph2D with ssr: false since it relies on window/canvas
const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

interface GraphData {
  nodes: { id: string; name: string; val: number; color?: string }[];
  links: { source: string; target: string }[];
}

export default function NoteGraph({
  graphData,
}: {
  graphData: GraphData;
}) {
  const router = useRouter();
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);

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
    (node: { id?: string }) => {
      if (node.id) {
        router.push(`/notes/${node.id}`);
      }
    },
    [router]
  );

  return (
    <div ref={containerRef} className="w-full h-full bg-[#111] overflow-hidden cursor-grab active:cursor-grabbing border border-[#333]">
      {graphData.nodes.length > 0 ? (
        <ForceGraph2D
        width={dimensions.width}
        height={dimensions.height}
        graphData={graphData}
        nodeColor={() => "#4ade80"}
        nodeAutoColorBy="group"
        nodeLabel="name"
        nodeRelSize={4}
        linkColor={() => "#444"}
        linkWidth={1}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        nodeCanvasObjectMode={() => "after"}
        nodeCanvasObject={(node: { name?: string; x?: number; y?: number }, ctx, globalScale) => {
          const label = node.name || "";
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#e4e4e7"; // zinc-200 for better visibility on dark background
          if (globalScale > 1.5 && node.x !== undefined && node.y !== undefined) {
            ctx.fillText(label, node.x, node.y + 8);
          }
        }}
        onNodeClick={handleNodeClick}
        d3VelocityDecay={0.3}
      />
      ) : (
        <p style={{ color: "white", padding: "1rem" }}>Loading the graph map...</p>
      )}
    </div>
  );
}