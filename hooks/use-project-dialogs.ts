"use client"

import { useState, useCallback } from "react"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Project {
  id: string
  name: string
  slug: string
  owned: boolean
}

type DialogType = "create" | "rename" | "delete" | null

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const INITIAL_PROJECTS: Project[] = [
  { id: "1", name: "E-commerce Platform", slug: "e-commerce-platform", owned: true },
  { id: "2", name: "Mobile Banking App", slug: "mobile-banking-app", owned: true },
  { id: "3", name: "Shared Design System", slug: "shared-design-system", owned: false },
]

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useProjectDialogs() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS)

  // Dialog visibility
  const [openDialog, setOpenDialog] = useState<DialogType>(null)

  // Target project for rename / delete
  const [targetProject, setTargetProject] = useState<Project | null>(null)

  // Create form
  const [createName, setCreateName] = useState("")
  const createSlug = toSlug(createName)

  // Rename form
  const [renameName, setRenameName] = useState("")

  // Loading (mock)
  const [isLoading, setIsLoading] = useState(false)

  // -------------------------------------------------------------------------
  // Open helpers
  // -------------------------------------------------------------------------

  const openCreate = useCallback(() => {
    setCreateName("")
    setOpenDialog("create")
  }, [])

  const openRename = useCallback((project: Project) => {
    setTargetProject(project)
    setRenameName(project.name)
    setOpenDialog("rename")
  }, [])

  const openDelete = useCallback((project: Project) => {
    setTargetProject(project)
    setOpenDialog("delete")
  }, [])

  const closeDialog = useCallback(() => {
    setOpenDialog(null)
    setTargetProject(null)
  }, [])

  // -------------------------------------------------------------------------
  // Submit handlers (mock — no API calls)
  // -------------------------------------------------------------------------

  const handleCreate = useCallback(async () => {
    if (!createName.trim()) return
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 400))
    setProjects((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: createName.trim(),
        slug: toSlug(createName),
        owned: true,
      },
    ])
    setIsLoading(false)
    closeDialog()
  }, [createName, closeDialog])

  const handleRename = useCallback(async () => {
    if (!renameName.trim() || !targetProject) return
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 400))
    setProjects((prev) =>
      prev.map((p) =>
        p.id === targetProject.id
          ? { ...p, name: renameName.trim(), slug: toSlug(renameName) }
          : p
      )
    )
    setIsLoading(false)
    closeDialog()
  }, [renameName, targetProject, closeDialog])

  const handleDelete = useCallback(async () => {
    if (!targetProject) return
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 400))
    setProjects((prev) => prev.filter((p) => p.id !== targetProject.id))
    setIsLoading(false)
    closeDialog()
  }, [targetProject, closeDialog])

  return {
    // Data
    projects,
    // Dialog state
    openDialog,
    targetProject,
    isLoading,
    // Create
    createName,
    setCreateName,
    createSlug,
    // Rename
    renameName,
    setRenameName,
    // Actions
    openCreate,
    openRename,
    openDelete,
    closeDialog,
    handleCreate,
    handleRename,
    handleDelete,
  }
}
