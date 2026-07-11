"use client";

import { useState } from "react";
import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProjectSidebar } from "@/components/editor/project-sidebar";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="relative flex flex-col h-screen w-screen overflow-hidden bg-zinc-950 text-zinc-100 select-none">
      {/* Top Navigation Bar */}
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Work Area */}
      <div className="relative flex-1 flex overflow-hidden">
        {/* Project Left Sidebar */}
        <ProjectSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Editor Main Canvas */}
        <main className="flex-1 flex items-center justify-center bg-zinc-900 transition-all duration-300">
          <div className="text-center p-8 bg-zinc-950/40 border border-zinc-800/50 rounded-2xl max-w-sm backdrop-blur-sm shadow-xl">
            <h1 className="text-xl font-bold tracking-tight text-zinc-100 mb-2">ghost AI</h1>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Press the menu toggle icon in the top left navbar or click below to view/hide your projects list.
            </p>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mt-4 px-3.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 active:scale-95 text-xs text-zinc-200 border border-zinc-700/50 rounded-lg transition-all cursor-pointer"
            >
              Toggle Projects Sidebar
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
