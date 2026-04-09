"use client"

import type { Table } from "@tanstack/react-table"
import { ChevronsLeft, ChevronsRight } from "lucide-react"

import type { CategoryTableRow } from "@/components/categories/categories-data-table/categories-data-table"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type CategoriesDataTablePaginationProps = {
  table: Table<CategoryTableRow>
}

const pageSizeOptions = [10, 20, 30, 50]

export function CategoriesDataTablePagination({ table }: CategoriesDataTablePaginationProps) {
  const filteredRows = table.getFilteredRowModel().rows.length
  const lastPageIndex = Math.max(0, table.getPageCount() - 1)

  return (
    <div className="flex flex-col gap-3 py-2 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">{filteredRows} category(ies) found.</p>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <Field orientation="horizontal" className="w-fit">
          <FieldLabel htmlFor="rows-per-page-categories">Rows per page</FieldLabel>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger id="rows-per-page-categories" className="h-8 w-[76px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="start">
              <SelectGroup>
                {pageSizeOptions.map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            aria-label="Go to first page"
          >
            <ChevronsLeft data-icon="inline-start" />
          </Button>

          <Pagination className="mx-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  aria-disabled={!table.getCanPreviousPage()}
                  className={!table.getCanPreviousPage() ? "pointer-events-none opacity-50" : undefined}
                  onClick={(event) => {
                    event.preventDefault()
                    table.previousPage()
                  }}
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  href="#"
                  aria-disabled={!table.getCanNextPage()}
                  className={!table.getCanNextPage() ? "pointer-events-none opacity-50" : undefined}
                  onClick={(event) => {
                    event.preventDefault()
                    table.nextPage()
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.setPageIndex(lastPageIndex)}
            disabled={!table.getCanNextPage()}
            aria-label="Go to last page"
          >
            <ChevronsRight data-icon="inline-start" />
          </Button>
        </div>
      </div>
    </div>
  )
}
