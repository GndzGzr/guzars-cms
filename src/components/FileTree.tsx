"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown, Folder, FileText, FolderOpen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export interface TreeNode {
  id: number;
  title: string;
  slug: string;
  parent_note: number | null;
  children: TreeNode[];
}

export function FileTree({ nodes }: { nodes: TreeNode[] }) {
  if (!nodes || nodes.length === 0) {
    return (
      <div className="px-4 py-2 text-sm text-zinc-400 italic">
        No notes found
      </div>
    );
  }

  return (
    <ul className="space-y-1 px-2">
      {nodes.map((node) => (
        <FileTreeNode key={node.id} node={node} level={0} />
      ))}
    </ul>
  );
}

function FileTreeNode({ node, level }: { node: TreeNode; level: number }) {
  const pathname = usePathname();
  const hasChildren = node.children && node.children.length > 0;
  
  // Automatically open folder if active, otherwise default to closed
  // Simplification: default to false, we can let user click
  const [isOpen, setIsOpen] = useState(false); 
  const href = `/notes/${node.slug}`;
  const isActive = pathname === href;

  return (
    <li className="my-0.5">
      <div
        className={clsx(
          "flex items-center gap-2 py-2 pr-3 text-sm rounded-lg transition-colors group",
          isActive
            ? "bg-zinc-200/60 dark:bg-zinc-800/80 text-zinc-950 dark:text-zinc-100 font-medium"
            : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-zinc-200"
        )}
        style={{ paddingLeft: `${level * 0.75 + 0.3}rem` }}
      >
        {/* Expand/Collapse Button */}
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(!isOpen);
            }}
            className="p-1 -ml-1 rounded-sm text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
          >
            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        ) : (
          <span className="w-5" /> // Alignment spacer
        )}
        
        {/* Node Link */}
        <Link href={href} className="flex-1 flex items-center gap-2.5 truncate">
          {hasChildren ? (
            isOpen ? (
              <FolderOpen size={16} className="text-zinc-500 dark:text-zinc-400 flex-shrink-0" />
            ) : (
              <Folder size={16} className="text-zinc-500 dark:text-zinc-400 flex-shrink-0" />
            )
          ) : (
            <FileText size={16} className={clsx("flex-shrink-0", isActive ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400")} />
          )}
          <span className="truncate tracking-wide">{node.title || node.slug}</span>
        </Link>
      </div>
      
      {/* Recursively render children */}
      {hasChildren && isOpen && (
        <ul className="mt-1 space-y-1 border-l border-zinc-200 dark:border-zinc-800 ml-[1.25rem]">
          {node.children.map((child) => (
            <FileTreeNode key={child.id} node={child} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}