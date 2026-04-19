"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { useSidebar } from "./SidebarContext";

export function ResizableSidebar({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar();
  const [width, setWidth] = useState(256); // Default 64 * 4 = 256px
  const [isResizing, setIsResizing] = useState(false);
  const isResizingRef = useRef(false);

  const startResizing = useCallback(() => {
    setIsResizing(true);
    isResizingRef.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
    isResizingRef.current = false;
    document.body.style.cursor = "default";
    document.body.style.userSelect = "auto";
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizingRef.current) return;
      let newWidth = e.clientX;
      if (newWidth < 200) newWidth = 200; // min width
      if (newWidth > 800) newWidth = 800; // max width
      setWidth(newWidth);
    };

    const handleMouseUp = () => {
      if (isResizingRef.current) {
        stopResizing();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    
    // Failsafe: if the mouse completely leaves the browser window
    window.addEventListener("mouseleave", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseUp);
      
      // Cleanup styles on unmount
      document.body.style.cursor = "default";
      document.body.style.userSelect = "auto";
    };
  }, [stopResizing]);

  return (
    <div 
      style={{ 
        width: isOpen ? `${width}px` : "0px", 
        flexShrink: 0, 
        opacity: isOpen ? 1 : 0 
      }} 
      className={`relative flex h-full group/sidebar z-20 bg-zinc-50 dark:bg-zinc-950 ${isOpen ? "border-r border-zinc-200 dark:border-zinc-800" : ""} ${isResizing ? "" : "transition-all duration-300"}`}
    >
      {/* Invisible overlay for capturing mouse events perfectly during resize */}
      {isResizing && (
        <div className="fixed inset-0 z-[9999] cursor-col-resize" />
      )}
      <div className="w-full h-full overflow-hidden" style={{ pointerEvents: isResizing ? "none" : "auto" }}>
        {children}
      </div>
      {/* Only show resize handle when sidebar is actually open */}
      {isOpen && (
        <div
          className={`absolute top-0 -right-2 w-4 h-full cursor-col-resize z-50 flex items-center justify-center transition-opacity hover:opacity-100 group-hover/sidebar:opacity-100 ${isResizing ? "opacity-100" : "opacity-0"}`}
          onMouseDown={(e) => {
            e.preventDefault();
            startResizing();
          }}
        >
          <div className="w-[3px] h-12 bg-purple-500/50 rounded-full" />
        </div>
      )}
    </div>
  );
}
