"use client"

import { ArrowUpDown } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import type { ColumnDef } from "@tanstack/react-table"

import type { CategoryTableRow } from "@/components/categories/categories-data-table/categories-data-table"
import { Button } from "@/components/ui/button"

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

function getUpdatedAtDate(value: Date | string) {
  return value instanceof Date ? value : new Date(value)
}

export function categoriesDataTableColumns(): ColumnDef<CategoryTableRow>[] {
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
      accessorKey: "updatedAt",
      sortingFn: (rowA, rowB, columnId) => {
        const left = getUpdatedAtDate(rowA.getValue(columnId) as Date | string).getTime()
        const right = getUpdatedAtDate(rowB.getValue(columnId) as Date | string).getTime()
        return left - right
      },
      header: ({ column }) => (
        <div className="text-right">
          <SortableHeader
            title="Updated"
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
  ]
}
