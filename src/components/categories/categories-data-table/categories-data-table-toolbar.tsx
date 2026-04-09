"use client"

import type { Table } from "@tanstack/react-table"
import { ChevronDown, Plus, SlidersHorizontal, X } from "lucide-react"

import type { CategoryTableRow } from "@/components/categories/categories-data-table/categories-data-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

type CategoriesDataTableToolbarProps = {
  table: Table<CategoryTableRow>
  search: string
  onSearchChange: (search: string) => void
  onResetFilters: () => void
  onCreateClick: () => void
}

export function CategoriesDataTableToolbar({
  table,
  search,
  onSearchChange,
  onResetFilters,
  onCreateClick,
}: CategoriesDataTableToolbarProps) {
  const hasActiveFilters = search.trim().length > 0

  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 items-center gap-2 overflow-x-auto pb-1">
        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by name or slug"
          className="h-9 min-w-[220px] max-w-[320px]"
        />

        {hasActiveFilters ? (
          <Button variant="ghost" onClick={onResetFilters} className="h-9 px-2 lg:px-3">
            Reset
            <X data-icon="inline-end" />
          </Button>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2">
        <Button onClick={onCreateClick} className="group relative flex items-center px-3 pr-3 hover:pr-32 transition-all duration-300 overflow-hidden">
          <Plus />

          <span
            className="
                            absolute left-8
                            opacity-0
                            translate-x-[-10px]
                            whitespace-nowrap
                            transition-all duration-300 ease-out
                            group-hover:opacity-100
                            group-hover:translate-x-0
                          "
          >
            New Category
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-9 bg-transparent dark:bg-transparent">
              <SlidersHorizontal data-icon="inline-start" />
              Columns
              <ChevronDown data-icon="inline-end" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
