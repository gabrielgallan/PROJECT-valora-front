"use client"

import * as React from "react"

import { CATEGORY_ICON_OPTIONS, getCategoryIcon } from "@/components/categories/category-icons"
import type { Category, CategoryFormPayload, CategoryStatus } from "@/components/categories/types"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type CategoryFormDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: Category | null
  isSlugTaken: (slug: string, currentId?: string) => boolean
  onSubmit: (payload: CategoryFormPayload, id?: string) => Promise<void> | void
}

type FieldErrors = Partial<Record<keyof CategoryFormPayload, string>>

function normalizeSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

function getInitialFormState(category: Category | null): CategoryFormPayload {
  if (category) {
    return {
      name: category.name,
      slug: category.slug,
      icon: category.icon,
      status: category.status,
    }
  }

  return {
    name: "",
    slug: "",
    icon: CATEGORY_ICON_OPTIONS[0]?.value ?? "shopping-basket",
    status: "active",
  }
}

export function CategoryFormDialog({
  open,
  onOpenChange,
  category,
  isSlugTaken,
  onSubmit,
}: CategoryFormDialogProps) {
  const [formValues, setFormValues] = React.useState<CategoryFormPayload>(getInitialFormState(category))
  const [errors, setErrors] = React.useState<FieldErrors>({})
  const [isSaving, setIsSaving] = React.useState(false)
  const [slugManuallyChanged, setSlugManuallyChanged] = React.useState(Boolean(category))

  React.useEffect(() => {
    if (!open) {
      return
    }

    setFormValues(getInitialFormState(category))
    setErrors({})
    setSlugManuallyChanged(Boolean(category))
  }, [category, open])

  const SelectedIcon = getCategoryIcon(formValues.icon)
  const title = category ? "Editar categoria" : "Nova categoria"
  const description = category
    ? "Atualize os dados mantendo o slug unico."
    : "Crie uma categoria com nome, slug e icone."

  const handleNameChange = (value: string) => {
    setFormValues((current) => {
      const next = { ...current, name: value }
      if (!slugManuallyChanged) {
        next.slug = normalizeSlug(value)
      }
      return next
    })
  }

  const handleSlugChange = (value: string) => {
    setSlugManuallyChanged(true)
    setFormValues((current) => ({ ...current, slug: normalizeSlug(value) }))
  }

  const handleStatusChange = (status: CategoryStatus) => {
    setFormValues((current) => ({ ...current, status }))
  }

  const handleIconChange = (icon: string) => {
    setFormValues((current) => ({ ...current, icon }))
  }

  const validate = () => {
    const nextErrors: FieldErrors = {}

    if (formValues.name.trim().length < 2 || formValues.name.trim().length > 40) {
      nextErrors.name = "Nome deve ter entre 2 e 40 caracteres."
    }

    if (!formValues.slug || formValues.slug.length < 2 || formValues.slug.length > 50) {
      nextErrors.slug = "Slug deve ter entre 2 e 50 caracteres."
    } else if (!/^[a-z0-9-]+$/.test(formValues.slug)) {
      nextErrors.slug = "Slug aceita apenas letras minusculas, numeros e hifen."
    } else if (isSlugTaken(formValues.slug, category?.id)) {
      nextErrors.slug = "Slug ja esta em uso. Escolha outro."
    }

    if (!formValues.icon) {
      nextErrors.icon = "Selecione um icone."
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validate()) {
      return
    }

    setIsSaving(true)

    try {
      await onSubmit(
        {
          ...formValues,
          name: formValues.name.trim(),
          slug: normalizeSlug(formValues.slug),
        },
        category?.id
      )
      onOpenChange(false)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="category-name">Nome</Label>
            <Input
              id="category-name"
              value={formValues.name}
              onChange={(event) => handleNameChange(event.target.value)}
              placeholder="Ex: Alimentacao"
            />
            {errors.name ? <p className="text-xs text-destructive">{errors.name}</p> : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category-slug">Slug</Label>
            <Input
              id="category-slug"
              value={formValues.slug}
              onChange={(event) => handleSlugChange(event.target.value)}
              placeholder="ex: alimentacao"
            />
            {errors.slug ? <p className="text-xs text-destructive">{errors.slug}</p> : null}
          </div>

          <div className="space-y-2">
            <Label>Icone</Label>
            <Select value={formValues.icon} onValueChange={handleIconChange}>
              <SelectTrigger className="bg-transparent dark:bg-transparent">
                <SelectValue placeholder="Selecione um icone" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_ICON_OPTIONS.map((option) => {
                  const Icon = option.icon

                  return (
                    <SelectItem key={option.value} value={option.value}>
                      <span className="inline-flex items-center gap-2">
                        <Icon className="size-4" />
                        {option.label}
                      </span>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
            <p className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <SelectedIcon className="size-4" />
              Icone selecionado
            </p>
            {errors.icon ? <p className="text-xs text-destructive">{errors.icon}</p> : null}
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={formValues.status} onValueChange={(value) => handleStatusChange(value as CategoryStatus)}>
              <SelectTrigger className="bg-transparent dark:bg-transparent">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Ativa</SelectItem>
                <SelectItem value="inactive">Inativa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Salvando..." : category ? "Salvar alteracoes" : "Criar categoria"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
