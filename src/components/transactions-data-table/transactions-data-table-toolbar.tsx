"use client";

import { Table } from "@tanstack/react-table";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";

import { TransactionsDateRangeFilter } from "@/components/transactions-data-table/transactions-date-range-filter";
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
import { Transaction } from "@/http/types/transaction";

const categoryOptions = [
  { value: "all", label: "All categories" },
  { value: "income", label: "Renda" },
  { value: "food", label: "Alimentacao" },
  { value: "housing", label: "Moradia" },
  { value: "services", label: "Servicos" },
  { value: "sales", label: "Vendas" },
  { value: "transport", label: "Transporte" },
  { value: "health", label: "Saude" },
  { value: "investments", label: "Investimentos" },
  { value: "extra-income", label: "Extra" },
  { value: "uncategorized", label: "Sem categoria" },
];

type TransactionsDataTableToolbarProps = {
  table: Table<Transaction>;
  category: string;
  fromDate?: Date;
  toDate?: Date;
  onCategoryChange: (value: string) => void;
  onFromDateChange: (date?: Date) => void;
  onToDateChange: (date?: Date) => void;
  onResetFilters: () => void;
};

export function TransactionsDataTableToolbar({
  table,
  category,
  fromDate,
  toDate,
  onCategoryChange,
  onFromDateChange,
  onToDateChange,
  onResetFilters,
}: TransactionsDataTableToolbarProps) {
  const hasActiveFilters = category !== "all" || Boolean(fromDate) || Boolean(toDate);

  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-1 items-center gap-2 overflow-x-auto pb-1">
        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger className="h-9 w-[200px] shrink-0 bg-transparent dark:bg-transparent">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectGroup>
              {categoryOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <TransactionsDateRangeFilter label="From date" value={fromDate} onChange={onFromDateChange} />
        <TransactionsDateRangeFilter label="To date" value={toDate} onChange={onToDateChange} />

        {hasActiveFilters ? (
          <Button variant="ghost" onClick={onResetFilters} className="h-9 px-2 lg:px-3">
            Reset
            <X data-icon="inline-end" />
          </Button>
        ) : null}
      </div>

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
