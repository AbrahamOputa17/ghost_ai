"use client";

import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EditorNavbarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function EditorNavbar({ isSidebarOpen, onToggleSidebar }: EditorNavbarProps) {
  return (
    <header className="h-14 border-b border-border bg-zinc-950 text-zinc-100 flex items-center justify-between px-4 select-none shrink-0">
      {/* Left Section */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 border border-transparent hover:border-zinc-800"
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="size-4.5" />
          ) : (
            <PanelLeftOpen className="size-4.5" />
          )}
        </Button>
        <span className="font-semibold text-zinc-100 tracking-tight">ghost AI</span>
      </div>

      {/* Center Section */}
      <div className="flex items-center justify-center">
        {/* Placeholder for center content */}
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-end">
        {/* Empty for now */}
      </div>
    </header>
  );
}
