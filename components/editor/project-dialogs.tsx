"use client"

import { useEffect, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

// ---------------------------------------------------------------------------
// Shared types (re-declared locally to avoid circular deps)
// ---------------------------------------------------------------------------

interface DialogSharedProps {
  isLoading: boolean
  onClose: () => void
}

// ---------------------------------------------------------------------------
// Create Project Dialog
// ---------------------------------------------------------------------------

interface CreateProjectDialogProps extends DialogSharedProps {
  open: boolean
  name: string
  slug: string
  onNameChange: (v: string) => void
  onSubmit: () => void
}

export function CreateProjectDialog({
  open,
  name,
  slug,
  isLoading,
  onNameChange,
  onSubmit,
  onClose,
}: CreateProjectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md" showCloseButton>
        <DialogHeader>
          <DialogTitle>New project</DialogTitle>
          <DialogDescription>
            Give your architecture workspace a name to get started.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 py-1">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="create-project-name"
              className="text-xs font-medium text-muted-foreground"
            >
              Project name
            </label>
            <Input
              id="create-project-name"
              placeholder="My awesome project"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSubmit()}
              autoFocus
              autoComplete="off"
            />
          </div>

          {/* Slug preview */}
          <p className="text-[11px] text-muted-foreground">
            <span className="font-medium text-foreground/60">Slug:&nbsp;</span>
            <span className="font-mono">
              {slug || <span className="italic opacity-50">will appear as you type</span>}
            </span>
          </p>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={!name.trim() || isLoading}
          >
            {isLoading && <Loader2 className="size-4 animate-spin" />}
            Create project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ---------------------------------------------------------------------------
// Rename Project Dialog
// ---------------------------------------------------------------------------

interface RenameProjectDialogProps extends DialogSharedProps {
  open: boolean
  currentName: string
  renameName: string
  onRenameChange: (v: string) => void
  onSubmit: () => void
}

export function RenameProjectDialog({
  open,
  currentName,
  renameName,
  isLoading,
  onRenameChange,
  onSubmit,
  onClose,
}: RenameProjectDialogProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-focus when opened
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 60)
      return () => clearTimeout(t)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md" showCloseButton>
        <DialogHeader>
          <DialogTitle>Rename project</DialogTitle>
          <DialogDescription>
            Currently named{" "}
            <span className="font-medium text-foreground">&quot;{currentName}&quot;</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-1.5 py-1">
          <label
            htmlFor="rename-project-name"
            className="text-xs font-medium text-muted-foreground"
          >
            New name
          </label>
          <Input
            ref={inputRef}
            id="rename-project-name"
            value={renameName}
            onChange={(e) => onRenameChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSubmit()}
            autoComplete="off"
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={!renameName.trim() || isLoading}
          >
            {isLoading && <Loader2 className="size-4 animate-spin" />}
            Rename
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ---------------------------------------------------------------------------
// Delete Project Dialog
// ---------------------------------------------------------------------------

interface DeleteProjectDialogProps extends DialogSharedProps {
  open: boolean
  projectName: string
  onConfirm: () => void
}

export function DeleteProjectDialog({
  open,
  projectName,
  isLoading,
  onConfirm,
  onClose,
}: DeleteProjectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md" showCloseButton>
        <DialogHeader>
          <DialogTitle>Delete project</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-medium text-foreground">&quot;{projectName}&quot;</span>?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="size-4 animate-spin" />}
            Delete project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
