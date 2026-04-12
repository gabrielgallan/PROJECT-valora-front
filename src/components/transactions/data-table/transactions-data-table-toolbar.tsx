"use client";

import { Table } from "@tanstack/react-table";
import { ChevronDown, Plus, SlidersHorizontal, X } from "lucide-react";
import { type DateRange } from "react-day-picker";

import { DateRangePicker } from "@/components/date-range-picker";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CategoryItem } from "@/http/list-categories";
import { type TransactionItem } from "@/http/list-transactions";

type TransactionsDataTableToolbarProps = {
  table: Table<TransactionItem>;
  categorySelected: string;
  categories: CategoryItem[];
  dateRange?: DateRange;
  isLoading?: boolean;
  onCategoryChange: (value: string) => void;
  onDateRangeChange: (range?: DateRange) => void;
  onResetFilters: () => void;
  onCreateClick: () => void;
};

export function TransactionsDataTableToolbar({
  table,
  categorySelected,
  categories,
  dateRange,
  isLoading = false,
  onCategoryChange,
  onDateRangeChange,
  onResetFilters,
  onCreateClick,
}: TransactionsDataTableToolbarProps) {
  const hasFilters = categorySelected !== "all" || Boolean(dateRange?.from || dateRange?.to);

  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 items-center gap-2 overflow-x-auto pb-1">
        <DateRangePicker
          value={dateRange}
          onChange={onDateRangeChange}
          placeholder="Date range"
          className="h-9 w-[260px] shrink-0"
          disabled={isLoading}
        />

        <Select value={categorySelected} onValueChange={onCategoryChange}>
          <SelectTrigger
            className="h-9 w-[200px] shrink-0 bg-transparent dark:bg-transparent"
            disabled={isLoading}
          >
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectGroup>
              <SelectItem value={'all'}>All categories</SelectItem>
              {categories.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {hasFilters ? (
          <Button variant="ghost" onClick={onResetFilters} className="h-9 px-2 lg:px-3" disabled={isLoading}>
            Reset
            <X data-icon="inline-end" />
          </Button>
        ) : null}
      </div>

      <Button
        onClick={onCreateClick}
        className="group relative flex items-center px-3 pr-3 hover:pr-32 transition-all duration-300 overflow-hidden"
      >
        <Plus />

        <span className="absolute left-8 opacity-0 translate-x-[-10px] whitespace-nowrap transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0">
          New Transaction
        </span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-9 w-fit self-end bg-transparent lg:self-auto dark:bg-transparent">
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
  );
}
