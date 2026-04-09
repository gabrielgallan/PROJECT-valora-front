"use client"

import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import type { ColumnDef } from "@tanstack/react-table"

import type { CategoryTableRow } from "@/components/categories/categories-data-table/categories-data-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type SortableHeaderProps = {
  title: string
  onClick: () => void
}

function SortableHeader({ title, onClick }: SortableHeaderProps) {
  return (
    <Button variant="ghost" className="-ml-3 h-8" onClick={onClick}>
      {title}
      <ArrowUpDown data-icon="inline-end" />
    </Button>
  )
}

type CategoriesDataTableColumnsOptions = {
  onEdit: (category: CategoryTableRow) => void
  onDelete: (category: CategoryTableRow) => void
}

export function categoriesDataTableColumns({
  onEdit,
  onDelete,
}: CategoriesDataTableColumnsOptions): ColumnDef<CategoryTableRow>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <SortableHeader
          title="Name"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      ),
      cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
    },
    {
      accessorKey: "slug",
      header: ({ column }) => (
        <SortableHeader
          title="Slug"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      ),
      cell: ({ row }) => <span className="text-muted-foreground">{row.original.slug}</span>,
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <SortableHeader
          title="Description"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      ),
      cell: ({ row }) => {
        const description = row.original.description?.trim() || "-"

        return (
          <div className="max-w-[22rem] truncate text-muted-foreground" title={description}>
            {description}
          </div>
        )
      },
    },
    {
      accessorKey: "usageCount",
      header: ({ column }) => (
        <div className="text-right">
          <SortableHeader
            title="In Use"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      ),
      cell: ({ row }) => <p className="text-right font-medium">{row.original.usageCount}</p>,
    },
    {
      id: "actions",
      enableHiding: false,
      header: "",
      cell: ({ row }) => {
        const category = row.original

        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onEdit(category)}>Edit</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={() => onDelete(category)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]
}
