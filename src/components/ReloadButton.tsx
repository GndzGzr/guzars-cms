"use client";

import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ReloadButton() {
  const [spinning, setSpinning] = useState(false);
  const router = useRouter();

  const handleReload = () => {
    setSpinning(true);
    // Refresh Server Components data
    router.refresh();
    setTimeout(() => setSpinning(false), 800);
  };

  return (
    <button
      onClick={handleReload}
      className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-500 hover:text-purple-600 dark:hover:text-purple-400"
      aria-label="Reload App Data"
    >
      <RefreshCw size={18} className={spinning ? "animate-spin" : ""} />
    </button>
  );
}
