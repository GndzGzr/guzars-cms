"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown, Folder, FileText, FolderOpen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export interface TreeNode {
  id: number | string;
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
          "flex items-center gap-2 py-2 pr-3 text-sm rounded-lg transition-colors group cursor-pointer",
          isActive
            ? "bg-purple-100/80 dark:bg-purple-500/20 text-purple-900 dark:text-purple-200 font-medium"
            : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-purple-700 dark:hover:text-purple-300"
        )}
        style={{ paddingLeft: `${level * 0.75 + 0.3}rem` }}
      >
        {/* Expand/Collapse Button */}
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className={clsx(
              "p-1 -ml-1 rounded-sm transition-colors",
              isActive 
                ? "text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-500/30" 
                : "text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 hover:text-purple-600 dark:hover:text-purple-300"
            )}
          >
            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        ) : (
          <span className="w-5" /> // Alignment spacer
        )}
        
        {/* Node Link */}
        {!node.slug || hasChildren && node.slug === '' ? (
          // Just a folder wrapper toggle instead of navigating
          <div className="flex-1 flex items-center gap-2.5 truncate" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <FolderOpen size={16} className={isActive ? "text-purple-700 dark:text-purple-300" : "text-zinc-500 dark:text-zinc-400 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors flex-shrink-0"} />
            ) : (
              <Folder size={16} className={isActive ? "text-purple-700 dark:text-purple-300" : "text-zinc-500 dark:text-zinc-400 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors flex-shrink-0"} />
            )}
            <span className="truncate tracking-wide">{node.title}</span>
          </div>
        ) : (
          // Actual Note Link
          <Link href={href} className="flex-1 flex items-center gap-2.5 truncate">
            {hasChildren ? (
              isOpen ? (
                <FolderOpen size={16} className={isActive ? "text-purple-700 dark:text-purple-300" : "text-zinc-500 dark:text-zinc-400 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors flex-shrink-0"} />
              ) : (
                <Folder size={16} className={isActive ? "text-purple-700 dark:text-purple-300" : "text-zinc-500 dark:text-zinc-400 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors flex-shrink-0"} />
              )
            ) : (
              <FileText size={16} className={clsx("flex-shrink-0 transition-colors", isActive ? "text-purple-700 dark:text-purple-300" : "text-zinc-400 group-hover:text-purple-600 dark:group-hover:text-purple-300")} />
            )}
            <span className="truncate tracking-wide">{node.title || node.slug}</span>
          </Link>
        )}
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