"use client"

import type { Table } from "@tanstack/react-table"
import { ChevronDown, Plus, SlidersHorizontal, X } from "lucide-react"

import type { Category, CategoryStatus } from "@/components/categories/types"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type CategoriesDataTableToolbarProps = {
  table: Table<Category>
  search: string
  status: "all" | CategoryStatus
  onSearchChange: (search: string) => void
  onStatusChange: (status: "all" | CategoryStatus) => void
  onResetFilters: () => void
  onCreateClick: () => void
}

export function CategoriesDataTableToolbar({
  table,
  search,
  status,
  onSearchChange,
  onStatusChange,
  onResetFilters,
  onCreateClick,
}: CategoriesDataTableToolbarProps) {
  const hasActiveFilters = search.trim().length > 0 || status !== "all"

  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 items-center gap-2 overflow-x-auto pb-1">
        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar por nome ou slug"
          className="h-9 min-w-[220px] max-w-[320px]"
        />

        <Select value={status} onValueChange={(value) => onStatusChange(value as "all" | CategoryStatus)}>
          <SelectTrigger className="h-9 w-[170px] shrink-0 bg-transparent dark:bg-transparent">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="active">Ativas</SelectItem>
            <SelectItem value="inactive">Inativas</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters ? (
          <Button variant="ghost" onClick={onResetFilters} className="h-9 px-2 lg:px-3">
            Resetar
            <X data-icon="inline-end" />
          </Button>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2">
        <Button variant="outline" className="h-9 bg-transparent dark:bg-transparent" onClick={onCreateClick}>
          <Plus data-icon="inline-start" />
          Criar rapido
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-9 bg-transparent dark:bg-transparent">
              <SlidersHorizontal data-icon="inline-start" />
              Colunas
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
