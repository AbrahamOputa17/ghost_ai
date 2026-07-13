"use client";

import {
  X,
  Plus,
  FolderOpen,
  FolderPlus,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { type Project } from "@/hooks/use-project-dialogs";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onCreateProject: () => void;
  onRenameProject: (project: Project) => void;
  onDeleteProject: (project: Project) => void;
}

// ---------------------------------------------------------------------------
// Project list item
// ---------------------------------------------------------------------------

function ProjectItem({
  project,
  onRename,
  onDelete,
}: {
  project: Project;
  onRename: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="group flex items-center justify-between gap-2 rounded-lg px-3 py-2 hover:bg-zinc-800/60 transition-colors cursor-pointer">
      <div className="flex items-center gap-2 min-w-0">
        <FolderOpen className="size-3.5 text-zinc-500 shrink-0" />
        <span className="text-xs font-medium text-zinc-200 truncate">
          {project.name}
        </span>
      </div>

      {/* Actions — only for owned projects */}
      {project.owned && (
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRename();
            }}
            aria-label={`Rename ${project.name}`}
            className="p-1 rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            <Pencil className="size-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            aria-label={`Delete ${project.name}`}
            className="p-1 rounded-md text-zinc-500 hover:text-red-400 hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            <Trash2 className="size-3" />
          </button>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sidebar
// ---------------------------------------------------------------------------

export function ProjectSidebar({
  isOpen,
  onClose,
  projects,
  onCreateProject,
  onRenameProject,
  onDeleteProject,
}: ProjectSidebarProps) {
  const myProjects = projects.filter((p) => p.owned);
  const sharedProjects = projects.filter((p) => !p.owned);

  return (
    <>
      {/* Mobile backdrop scrim */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "absolute top-14 left-0 bottom-0 z-40 w-72 bg-zinc-950 border-r border-zinc-900 text-zinc-100 flex flex-col transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-900 shrink-0">
          <h2 className="text-sm font-semibold tracking-wide text-zinc-200">
            Projects
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close project sidebar"
            className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 size-7 border border-transparent hover:border-zinc-800"
          >
            <X className="size-4" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col min-h-0">
          <Tabs
            defaultValue="my-projects"
            className="w-full flex-1 flex flex-col gap-4"
          >
            <TabsList className="w-full grid grid-cols-2 bg-zinc-900 border border-zinc-800 p-0.5 rounded-lg shrink-0">
              <TabsTrigger value="my-projects" className="py-1.5 text-xs">
                My Projects
              </TabsTrigger>
              <TabsTrigger value="shared" className="py-1.5 text-xs">
                Shared
              </TabsTrigger>
            </TabsList>

            {/* My Projects */}
            <TabsContent value="my-projects" className="flex-1 flex flex-col">
              {myProjects.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center p-6 border border-dashed border-zinc-800 rounded-lg bg-zinc-900/10 min-h-[180px]">
                  <FolderOpen className="size-8 text-zinc-600 mb-2" />
                  <p className="text-xs font-medium text-zinc-400">
                    No projects yet
                  </p>
                  <p className="text-[10px] text-zinc-500 mt-1 max-w-[180px]">
                    Create your first project using the button below.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-0.5">
                  {myProjects.map((project) => (
                    <ProjectItem
                      key={project.id}
                      project={project}
                      onRename={() => onRenameProject(project)}
                      onDelete={() => onDeleteProject(project)}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Shared */}
            <TabsContent value="shared" className="flex-1 flex flex-col">
              {sharedProjects.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center p-6 border border-dashed border-zinc-800 rounded-lg bg-zinc-900/10 min-h-[180px]">
                  <FolderPlus className="size-8 text-zinc-600 mb-2" />
                  <p className="text-xs font-medium text-zinc-400">
                    No shared projects
                  </p>
                  <p className="text-[10px] text-zinc-500 mt-1 max-w-[180px]">
                    Projects shared with you by collaborators will appear here.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-0.5">
                  {sharedProjects.map((project) => (
                    <ProjectItem
                      key={project.id}
                      project={project}
                      onRename={() => onRenameProject(project)}
                      onDelete={() => onDeleteProject(project)}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer action */}
        <div className="p-3 border-t border-zinc-900 bg-zinc-950 shrink-0">
          <Button
            onClick={onCreateProject}
            className="w-full flex items-center justify-center gap-2 bg-zinc-100 text-zinc-950 hover:bg-zinc-200 border-none transition-colors cursor-pointer"
            size="lg"
          >
            <Plus className="size-4" />
            <span>New Project</span>
          </Button>
        </div>
      </aside>
    </>
  );
}
