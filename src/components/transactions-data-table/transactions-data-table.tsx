"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";

import { transactionsDataTableColumns } from "@/components/transactions-data-table/transactions-data-table-columns";
import { TransactionsDataTablePagination } from "@/components/transactions-data-table/transactions-data-table-pagination";
import { TransactionsDataTableToolbar } from "@/components/transactions-data-table/transactions-data-table-toolbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Transaction } from "@/http/types/transaction";

type TransactionsDataTableProps = {
  data: Transaction[];
};

function getCreatedAtDate(value: Date | string) {
  return value instanceof Date ? value : new Date(value);
}

export function TransactionsDataTable({ data }: TransactionsDataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [category, setCategory] = React.useState("all");
  const [fromDate, setFromDate] = React.useState<Date>();
  const [toDate, setToDate] = React.useState<Date>();

  const filteredData = React.useMemo(() => {
    return data.filter((transaction) => {
      const transactionDate = getCreatedAtDate(transaction.createdAt);

      if (fromDate && transactionDate < fromDate) {
        return false;
      }

      if (toDate) {
        const endOfDay = new Date(toDate);
        endOfDay.setHours(23, 59, 59, 999);

        if (transactionDate > endOfDay) {
          return false;
        }
      }

      if (category !== "all") {
        const currentCategory = transaction.category?.slug ?? "uncategorized";
        return currentCategory === category;
      }

      return true;
    });
  }, [category, data, fromDate, toDate]);

  const table = useReactTable({
    data: filteredData,
    columns: transactionsDataTableColumns,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const handleResetFilters = () => {
    setCategory("all");
    setFromDate(undefined);
    setToDate(undefined);
  };

  return (
    <div className="flex flex-col gap-3">
      <TransactionsDataTableToolbar
        table={table}
        category={category}
        fromDate={fromDate}
        toDate={toDate}
        onCategoryChange={setCategory}
        onFromDateChange={setFromDate}
        onToDateChange={setToDate}
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
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={row.original.operation === "income" ? "bg-gradient-to-r from-cyan-500/10 via-cyan-500/4 to-transparent hover:from-cyan-500/12 hover:via-cyan-500/6" : undefined}
                >
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <TransactionsDataTablePagination table={table} />
    </div>
  );
}
