"use client"

import * as React from "react"
import { toast } from "sonner"

import { CategoriesDataTable } from "@/components/categories/categories-data-table/categories-data-table"
import { CategoriesEmptyState } from "@/components/categories/categories-empty-state"
import { CategoriesOverviewCards } from "@/components/categories/categories-overview-cards"
import { CategoriesPageHeader } from "@/components/categories/categories-page-header"
import { CategoriesRadialChart } from "@/components/categories/categories-radial-chart"
import { CategoryFormDialog } from "@/components/categories/category-form-dialog"
import { DeleteCategoryAlertDialog } from "@/components/categories/delete-category-alert-dialog"
import type { Category, CategoriesOverview, CategoryFormPayload, CategoryStatus } from "@/components/categories/types"

type CategoriesPageClientProps = {
  initialCategories: Category[]
}

function createCategoryId() {
  return `cat_${Math.random().toString(36).slice(2, 10)}`
}

export function CategoriesPageClient({ initialCategories }: CategoriesPageClientProps) {
  const [categories, setCategories] = React.useState<Category[]>(initialCategories)
  const [isFormOpen, setIsFormOpen] = React.useState(false)
  const [editingCategory, setEditingCategory] = React.useState<Category | null>(null)
  const [deletingCategory, setDeletingCategory] = React.useState<Category | null>(null)

  const overview = React.useMemo<CategoriesOverview>(() => {
    const total = categories.length
    const active = categories.filter((category) => category.status === "active").length
    const inactive = total - active
    const inUse = categories.filter((category) => category.usageCount > 0).length

    return { total, active, inactive, inUse }
  }, [categories])

  const isSlugTaken = React.useCallback(
    (slug: string, currentId?: string) => {
      const normalizedSlug = slug.toLowerCase()

      return categories.some((category) => {
        if (currentId && category.id === currentId) {
          return false
        }

        return category.slug.toLowerCase() === normalizedSlug
      })
    },
    [categories]
  )

  const handleOpenCreate = () => {
    setEditingCategory(null)
    setIsFormOpen(true)
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setIsFormOpen(true)
  }

  const handleCreateOrUpdate = async (payload: CategoryFormPayload, id?: string) => {
    if (!id) {
      const nextCategory: Category = {
        id: createCategoryId(),
        name: payload.name,
        slug: payload.slug,
        icon: payload.icon,
        status: payload.status,
        usageCount: 0,
        updatedAt: new Date(),
      }

      setCategories((current) => [nextCategory, ...current])
      toast.success("Categoria criada com sucesso.")
      return
    }

    setCategories((current) =>
      current.map((category) => {
        if (category.id !== id) {
          return category
        }

        return {
          ...category,
          name: payload.name,
          slug: payload.slug,
          icon: payload.icon,
          status: payload.status,
          updatedAt: new Date(),
        }
      })
    )

    toast.success("Categoria atualizada.")
  }

  const handleToggleStatus = (id: string, status: CategoryStatus) => {
    setCategories((current) =>
      current.map((category) => {
        if (category.id !== id) {
          return category
        }

        return {
          ...category,
          status,
          updatedAt: new Date(),
        }
      })
    )

    toast.success(status === "active" ? "Categoria ativada." : "Categoria inativada.")
  }

  const handleRequestDelete = (category: Category) => {
    setDeletingCategory(category)
  }

  const handleConfirmDelete = (id: string) => {
    setCategories((current) => current.filter((category) => category.id !== id))
    setDeletingCategory(null)
    toast.success("Categoria removida.")
  }

  return (
    <div className="@container/main flex flex-col p-4 md:p-6">
      <div className="flex flex-col gap-4">
        <section className="grid grid-cols-1 gap-4 lg:h-[20rem] lg:grid-cols-12">
          <section className="overflow-hidden lg:col-span-6">
            <CategoriesPageHeader overview={overview} onCreateClick={handleOpenCreate} />
          </section>

          <section className="overflow-hidden lg:col-span-6">
            <div className="h-full">
              <CategoriesRadialChart data={categories} />
            </div>
          </section>
        </section>

        {/* <CategoriesOverviewCards overview={overview} /> */}

        <section className="flex flex-col gap-4">
          {categories.length === 0 ? (
            <CategoriesEmptyState onCreateClick={handleOpenCreate} />
          ) : (
            <CategoriesDataTable
              data={categories}
              onCreateClick={handleOpenCreate}
              onEdit={handleEdit}
              onToggleStatus={handleToggleStatus}
              onRequestDelete={handleRequestDelete}
            />
          )}
        </section>
      </div>

      <CategoryFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        category={editingCategory}
        isSlugTaken={isSlugTaken}
        onSubmit={handleCreateOrUpdate}
      />

      <DeleteCategoryAlertDialog
        open={Boolean(deletingCategory)}
        onOpenChange={(open) => {
          if (!open) {
            setDeletingCategory(null)
          }
        }}
        category={deletingCategory}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  )
}
