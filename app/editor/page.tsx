"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { EditorNavbar } from "@/components/editor/editor-navbar";
import { ProjectSidebar } from "@/components/editor/project-sidebar";
import {
  CreateProjectDialog,
  RenameProjectDialog,
  DeleteProjectDialog,
} from "@/components/editor/project-dialogs";
import { useProjectDialogs } from "@/hooks/use-project-dialogs";
import { Button } from "@/components/ui/button";

export default function EditorPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const {
    projects,
    openDialog,
    targetProject,
    isLoading,
    createName,
    setCreateName,
    createSlug,
    renameName,
    setRenameName,
    openCreate,
    openRename,
    openDelete,
    closeDialog,
    handleCreate,
    handleRename,
    handleDelete,
  } = useProjectDialogs();

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
          projects={projects}
          onCreateProject={openCreate}
          onRenameProject={openRename}
          onDeleteProject={openDelete}
        />

        {/* Editor Home Canvas */}
        <main className="flex-1 flex items-center justify-center bg-zinc-900">
          <div className="flex flex-col items-center gap-4 text-center px-6">
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
              Create a project or open an existing one
            </h1>
            <p className="text-sm text-zinc-400 max-w-xs leading-relaxed">
              Start a new architecture workspace, or choose a project from the
              sidebar.
            </p>
            <Button
              onClick={openCreate}
              className="mt-2 flex items-center gap-2 bg-zinc-100 text-zinc-950 hover:bg-zinc-200 border-none cursor-pointer"
              size="lg"
            >
              <Plus className="size-4" />
              New Project
            </Button>
          </div>
        </main>
      </div>

      {/* Dialogs */}
      <CreateProjectDialog
        open={openDialog === "create"}
        name={createName}
        slug={createSlug}
        isLoading={isLoading}
        onNameChange={setCreateName}
        onSubmit={handleCreate}
        onClose={closeDialog}
      />

      <RenameProjectDialog
        open={openDialog === "rename"}
        currentName={targetProject?.name ?? ""}
        renameName={renameName}
        isLoading={isLoading}
        onRenameChange={setRenameName}
        onSubmit={handleRename}
        onClose={closeDialog}
      />

      <DeleteProjectDialog
        open={openDialog === "delete"}
        projectName={targetProject?.name ?? ""}
        isLoading={isLoading}
        onConfirm={handleDelete}
        onClose={closeDialog}
      />
    </div>
  );
}
