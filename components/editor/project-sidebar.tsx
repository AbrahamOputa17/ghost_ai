"use client";

import { X, Plus, FolderPlus, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  return (
    <aside
      className={`absolute top-14 left-0 bottom-0 z-40 w-80 bg-zinc-950 border-r border-zinc-900 text-zinc-100 flex flex-col transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-900 shrink-0">
        <h2 className="text-sm font-semibold tracking-wide text-zinc-200">Projects</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close project sidebar"
          className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 size-7 border border-transparent hover:border-zinc-850"
        >
          <X className="size-4" />
        </Button>
      </div>

      {/* Tabs / Projects List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col min-h-0">
        <Tabs defaultValue="my-projects" className="w-full flex-1 flex flex-col gap-4">
          <TabsList className="w-full grid grid-cols-2 bg-zinc-900 border border-zinc-800 p-0.5 rounded-lg shrink-0">
            <TabsTrigger value="my-projects" className="py-1.5 text-xs">My Projects</TabsTrigger>
            <TabsTrigger value="shared" className="py-1.5 text-xs">Shared</TabsTrigger>
          </TabsList>

          <TabsContent value="my-projects" className="flex-1 flex flex-col items-center justify-center text-center p-6 border border-dashed border-zinc-800 rounded-lg bg-zinc-900/10 min-h-[200px]">
            <FolderOpen className="size-8 text-zinc-655 mb-2" />
            <p className="text-xs font-medium text-zinc-400">No projects yet</p>
            <p className="text-[10px] text-zinc-500 mt-1 max-w-[180px]">
              Create your first project using the button below to get started.
            </p>
          </TabsContent>

          <TabsContent value="shared" className="flex-1 flex flex-col items-center justify-center text-center p-6 border border-dashed border-zinc-800 rounded-lg bg-zinc-900/10 min-h-[200px]">
            <FolderPlus className="size-8 text-zinc-655 mb-2" />
            <p className="text-xs font-medium text-zinc-400">No shared projects</p>
            <p className="text-[10px] text-zinc-500 mt-1 max-w-[180px]">
              Projects shared with you by other collaborators will appear here.
            </p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-zinc-900 bg-zinc-950 shrink-0">
        <Button 
          className="w-full flex items-center justify-center gap-2 bg-zinc-100 text-zinc-950 hover:bg-zinc-200 border-none transition-colors cursor-pointer"
          size="lg"
        >
          <Plus className="size-4" />
          <span>New Project</span>
        </Button>
      </div>
    </aside>
  );
}
