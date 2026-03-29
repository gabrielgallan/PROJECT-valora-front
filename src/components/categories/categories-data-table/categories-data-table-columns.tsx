"use client"

import { ArrowUpDown, MoreHorizontal, PencilLine, Power, Trash2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import type { ColumnDef } from "@tanstack/react-table"

import { getCategoryIcon } from "@/components/categories/category-icons"
import type { Category, CategoryStatus } from "@/components/categories/types"
import { Badge } from "@/components/ui/badge"
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

type CategoriesDataTableColumnsOptions = {
  onEdit: (category: Category) => void
  onToggleStatus: (id: string, status: CategoryStatus) => void
  onRequestDelete: (category: Category) => void
}

function SortableHeader({ title, onClick }: SortableHeaderProps) {
  return (
    <Button variant="ghost" className="-ml-3 h-8" onClick={onClick}>
      {title}
      <ArrowUpDown data-icon="inline-end" />
    </Button>
  )
}

function getUpdatedAtDate(value: Date | string) {
  return value instanceof Date ? value : new Date(value)
}

export function categoriesDataTableColumns({
  onEdit,
  onToggleStatus,
  onRequestDelete,
}: CategoriesDataTableColumnsOptions): ColumnDef<Category>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <SortableHeader
          title="Nome"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      ),
      cell: ({ row }) => {
        const Icon = getCategoryIcon(row.original.icon)

        return (
          <div className="inline-flex items-center gap-2 font-medium">
            <Icon className="size-4 text-muted-foreground" />
            {row.original.name}
          </div>
        )
      },
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
      accessorKey: "status",
      header: ({ column }) => (
        <SortableHeader
          title="Status"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      ),
      cell: ({ row }) => {
        const isActive = row.original.status === "active"

        return <Badge variant={isActive ? "default" : "secondary"}>{isActive ? "Ativa" : "Inativa"}</Badge>
      },
    },
    {
      accessorKey: "usageCount",
      header: ({ column }) => (
        <div className="text-right">
          <SortableHeader
            title="Em uso"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      ),
      cell: ({ row }) => <p className="text-right font-medium">{row.original.usageCount}</p>,
    },
    {
      accessorKey: "updatedAt",
      sortingFn: (rowA, rowB, columnId) => {
        const left = getUpdatedAtDate(rowA.getValue(columnId) as Date | string).getTime()
        const right = getUpdatedAtDate(rowB.getValue(columnId) as Date | string).getTime()
        return left - right
      },
      header: ({ column }) => (
        <div className="text-right">
          <SortableHeader
            title="Atualizada"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </div>
      ),
      cell: ({ row }) => {
        const date = getUpdatedAtDate(row.original.updatedAt)

        return (
          <span className="block text-right text-muted-foreground">
            {formatDistanceToNow(date, { addSuffix: true })}
          </span>
        )
      },
    },
    {
      id: "actions",
      enableHiding: false,
      header: "",
      cell: ({ row }) => {
        const category = row.original
        const nextStatus = category.status === "active" ? "inactive" : "active"

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
                <DropdownMenuLabel>Acoes</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onEdit(category)}>
                  <PencilLine />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onToggleStatus(category.id, nextStatus)}>
                  <Power />
                  {nextStatus === "active" ? "Ativar" : "Inativar"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={() => onRequestDelete(category)}>
                  <Trash2 />
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]
}
