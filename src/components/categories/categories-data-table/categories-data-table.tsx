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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export interface CategoryTableRow {
  id: string
  name: string
  slug: string
  usageCount: number
  updatedAt: Date | string
}

type CategoriesDataTableProps = {
  data: CategoryTableRow[]
}

export function CategoriesDataTable({ data }: CategoriesDataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [search, setSearch] = React.useState("")

  const filteredData = React.useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return data.filter((category) => {
      if (!normalizedSearch) {
        return true
      }

      return (
        category.name.toLowerCase().includes(normalizedSearch) ||
        category.slug.toLowerCase().includes(normalizedSearch)
      )
    })
  }, [data, search])

  const columns = React.useMemo(() => categoriesDataTableColumns(), [])

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

  return (
    <div className="flex flex-col gap-3">
      <CategoriesDataTableToolbar
        table={table}
        search={search}
        onSearchChange={setSearch}
        onResetFilters={handleResetFilters}
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
    </div>
  )
}
