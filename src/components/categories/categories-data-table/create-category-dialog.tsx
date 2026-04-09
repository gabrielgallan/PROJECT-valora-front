"use client"

import * as React from "react"

import type { CategoryActionState } from "@/app/(private)/(sidebar)/categories/actions"
import { useFormState } from "@/hooks/use-form-state"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export interface CreateCategoryFormData {
  name: string
  description?: string
}

interface CreateCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  action: (formData: FormData) => Promise<CategoryActionState>
  onCreated: (data: CreateCategoryFormData) => void
}

export function CreateCategoryDialog({
  open,
  onOpenChange,
  action,
  onCreated,
}: CreateCategoryDialogProps) {
  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    action,
    () => {
      onCreated({
        name: name.trim(),
        description: description.trim() || undefined,
      })
      onOpenChange(false)
    },
    { success: false, message: null, errors: null }
  )

  React.useEffect(() => {
    if (!open) {
      setName("")
      setDescription("")
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New category</DialogTitle>
          <DialogDescription>Fill out the fields below to create a category.</DialogDescription>
        </DialogHeader>

        {success === false && message ? (
          <p className="text-sm text-destructive">{message}</p>
        ) : null}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="category-create-name">Name</Label>
            <Input
              name="name"
              id="category-create-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Housing"
              required
              disabled={isPending}
            />
            {errors?.name ? <p className="text-xs text-destructive">{errors.name[0]}</p> : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category-create-description">Description (optional)</Label>
            <Textarea
              name="description"
              id="category-create-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Add a short description"
              rows={3}
              disabled={isPending}
            />
            {errors?.description ? <p className="text-xs text-destructive">{errors.description[0]}</p> : null}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
