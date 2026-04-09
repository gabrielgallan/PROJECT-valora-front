"use client"

import * as React from "react"

import type { CategoryActionState } from "@/app/(private)/(sidebar)/categories/actions"
import type { CategoryTableRow } from "@/components/categories/categories-data-table/categories-data-table"
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

export interface EditCategoryFormData {
  name: string
  description?: string
}

interface EditCategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: CategoryTableRow | null
  action: (formData: FormData) => Promise<CategoryActionState>
  onUpdated: (id: string, data: EditCategoryFormData) => void
}

export function EditCategoryDialog({
  open,
  onOpenChange,
  category,
  action,
  onUpdated,
}: EditCategoryDialogProps) {
  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    action,
    () => {
      if (!category) {
        return
      }

      onUpdated(category.id, {
        name: name.trim(),
        description: description.trim() || undefined,
      })
      onOpenChange(false)
    },
    { success: false, message: null, errors: null }
  )

  React.useEffect(() => {
    if (!open || !category) {
      return
    }

    setName(category.name)
    setDescription(category.description ?? "")
  }, [open, category])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit category</DialogTitle>
          <DialogDescription>Update the category information below.</DialogDescription>
        </DialogHeader>

        {success === false && message ? (
          <p className="text-sm text-destructive">{message}</p>
        ) : null}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input type="hidden" name="categoryId" value={category?.id ?? ""} />

          <div className="space-y-2">
            <Label htmlFor="category-edit-name">Name</Label>
            <Input
              name="name"
              id="category-edit-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Housing"
              required
              disabled={isPending}
            />
            {errors?.name ? <p className="text-xs text-destructive">{errors.name[0]}</p> : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category-edit-description">Description (optional)</Label>
            <Textarea
              name="description"
              id="category-edit-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Add a short description"
              rows={3}
              disabled={isPending}
            />
            {errors?.description ? <p className="text-xs text-destructive">{errors.description[0]}</p> : null}
            {errors?.categoryId ? <p className="text-xs text-destructive">{errors.categoryId[0]}</p> : null}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
