import { FileText, Search, Settings, Network, Lock, FolderTree } from "lucide-react";
import Link from "next/link";
import { SearchModal } from "./SearchModal";
import { FileTree, TreeNode } from "./FileTree";
import { fetchAPI } from "@/lib/api";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function getNotesTree(): Promise<TreeNode[] | null> {
  try {
    const res = await fetchAPI('/api/notes/tree/');
    const flatNodes = Array.isArray(res) ? res : (res?.results || []);
    
    // Create a map to O(1) look up nodes by their id
    const nodeMap = new Map<number, TreeNode>();
    flatNodes.forEach((n: any) => {
      nodeMap.set(n.id, { ...n, children: [] });
    });

    const rootNodes: TreeNode[] = [];
    
    // Connect children to their parents directly
    nodeMap.forEach(node => {
      if (node.parent_note) {
        const parent = nodeMap.get(node.parent_note);
        if (parent) {
          parent.children.push(node);
        } else {
          // Fallback if parent missing
          rootNodes.push(node);
        }
      } else {
        rootNodes.push(node);
      }
    });

    return rootNodes;
  } catch (err) {
    console.error("Sidebar tree fetching failed - unauthorized or API down");
    return null;
  }
}

export default async function Sidebar() {
  const session = await getServerSession(authOptions);
  
  let treeNodes = null;
  if (session) {
    treeNodes = await getNotesTree();
  }

  return (
    <aside className="w-64 bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 flex flex-col h-full overflow-hidden transition-all duration-300">
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-black dark:bg-white flex items-center justify-center">
            <span className="text-white dark:text-black font-bold text-xs">G</span>
          </div>
          <span className="font-semibold text-sm tracking-tight text-zinc-900 dark:text-zinc-100">Guzars CMS</span>
        </div>
      </div>

      <div className="p-3">
        <SearchModal />
      </div>

      <div className="flex-grow overflow-y-auto px-1 py-2 space-y-4 text-sm">
        <div className="px-2">
          <ul className="space-y-0.5 mb-4">
            <li>
              <Link href="/notes" className="flex items-center gap-2 px-3 py-1.5 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md transition-colors">
                <FileText size={16} className="text-zinc-400" />
                All Notes
              </Link>
            </li>
            <li>
              <Link href="/graph" className="flex items-center gap-2 px-3 py-1.5 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md transition-colors">
                <Network size={16} className="text-zinc-400" />
                Graph View
              </Link>
            </li>
          </ul>
        </div>
        
        {session ? (
          treeNodes ? (
            <div className="px-1 space-y-1">
              <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-3 flex items-center gap-2">
                <FolderTree size={14} className="text-zinc-400" />
                File Explorer
              </h3>
              <FileTree nodes={treeNodes} />
            </div>
          ) : (
            <div className="px-4 py-2 text-xs text-red-500 dark:text-red-400 italic">
              Failed to connect to vault.
            </div>
          )
        ) : (
          <div className="px-4 py-8 flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-600 text-center space-y-3">
            <Lock size={24} className="opacity-50" />
            <p className="text-xs">Log in to view the vault folder structure.</p>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-zinc-200 dark:border-zinc-800">
        <button className="flex items-center gap-2 w-full px-3 py-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md transition-colors">
          <Settings size={16} />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
}
