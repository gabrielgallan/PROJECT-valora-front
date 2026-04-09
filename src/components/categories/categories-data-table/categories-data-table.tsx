"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table"

import { categoriesDataTableColumns } from "@/components/categories/categories-data-table/categories-data-table-columns"
import { CategoriesDataTablePagination } from "@/components/categories/categories-data-table/categories-data-table-pagination"
import { CategoriesDataTableToolbar } from "@/components/categories/categories-data-table/categories-data-table-toolbar"
import {
  CreateCategoryDialog,
  CreateCategoryFormData,
} from "@/components/categories/categories-data-table/create-category-dialog"
import {
  DeleteCategoryDialog,
} from "@/components/categories/categories-data-table/delete-category-dialog"
import {
  EditCategoryDialog,
  EditCategoryFormData,
} from "@/components/categories/categories-data-table/edit-category-dialog"
import type { CategoryActionState } from "@/app/(private)/(sidebar)/categories/actions"
import { toast } from "sonner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export interface CategoryTableRow {
  id: string
  name: string
  slug: string
  description?: string | null
  usageCount: number
}

type CategoriesDataTableProps = {
  data: CategoryTableRow[]
  createAction: (formData: FormData) => Promise<CategoryActionState>
  updateAction: (formData: FormData) => Promise<CategoryActionState>
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

function createTempCategoryId() {
  return `temp_cat_${Math.random().toString(36).slice(2, 10)}`
}

export function CategoriesDataTable({ data, createAction, updateAction }: CategoriesDataTableProps) {
  const [rows, setRows] = React.useState<CategoryTableRow[]>(data)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [search, setSearch] = React.useState("")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false)
  const [editingCategory, setEditingCategory] = React.useState<CategoryTableRow | null>(null)
  const [deletingCategory, setDeletingCategory] = React.useState<CategoryTableRow | null>(null)

  React.useEffect(() => {
    setRows(data)
  }, [data])

  const filteredData = React.useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return rows.filter((category) => {
      if (!normalizedSearch) {
        return true
      }

      return (
        category.name.toLowerCase().includes(normalizedSearch) ||
        category.slug.toLowerCase().includes(normalizedSearch)
      )
    })
  }, [rows, search])

  const handleOpenEdit = React.useCallback((category: CategoryTableRow) => {
    setEditingCategory(category)
  }, [])

  const handleOpenDelete = React.useCallback((category: CategoryTableRow) => {
    setDeletingCategory(category)
  }, [])

  const columns = React.useMemo(
    () => categoriesDataTableColumns({ onEdit: handleOpenEdit, onDelete: handleOpenDelete }),
    [handleOpenDelete, handleOpenEdit]
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnVisibility,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  const handleResetFilters = () => {
    setSearch("")
  }

  const handleCreateSubmit = (formData: CreateCategoryFormData) => {
    const nextRow: CategoryTableRow = {
      id: createTempCategoryId(),
      name: formData.name,
      slug: slugify(formData.name),
      description: formData.description,
      usageCount: 0,
    }

    setRows((current) => [nextRow, ...current])
    setIsCreateDialogOpen(false)
    toast.success("Category created successfully.")
  }

  const handleEditSubmit = (id: string, formData: EditCategoryFormData) => {
    setRows((current) =>
      current.map((category) => {
        if (category.id !== id) {
          return category
        }

        return {
          ...category,
          name: formData.name,
          description: formData.description,
        }
      })
    )

    setEditingCategory(null)
    toast.success("Category updated successfully.")
  }

  const handleDeleteConfirm = () => {
    // Frontend-only placeholder for future API integration.
  }

  return (
    <div className="flex flex-col gap-3">
      <CategoriesDataTableToolbar
        table={table}
        search={search}
        onSearchChange={setSearch}
        onResetFilters={handleResetFilters}
        onCreateClick={() => setIsCreateDialogOpen(true)}
      />

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={table.getVisibleLeafColumns().length} className="h-24 text-center">
                  No results found for the current filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <CategoriesDataTablePagination table={table} />

      <CreateCategoryDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        action={createAction}
        onCreated={handleCreateSubmit}
      />

      <EditCategoryDialog
        open={Boolean(editingCategory)}
        onOpenChange={(open) => {
          if (!open) {
            setEditingCategory(null)
          }
        }}
        category={editingCategory}
        action={updateAction}
        onUpdated={handleEditSubmit}
      />

      <DeleteCategoryDialog
        open={Boolean(deletingCategory)}
        onOpenChange={(open) => {
          if (!open) {
            setDeletingCategory(null)
          }
        }}
        category={deletingCategory}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
