"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { type DateRange } from "react-day-picker";
import { toast } from "sonner";

import type { TransactionActionState } from "@/app/(private)/(sidebar)/transactions/actions";
import { transactionsDataTableColumns } from "@/components/transactions/data-table/transactions-data-table-columns";
import { TransactionsDataTableToolbar } from "@/components/transactions/data-table/transactions-data-table-toolbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CategoryItem } from "@/http/list-categories";
import { TransactionItem } from "@/http/list-transactions";
import { type TransactionsFilters } from "@/app/(private)/(sidebar)/transactions/types";
import { CreateTransactionDialog, type CreateTransactionFormData } from "./create-transaction-dialog";
import { SkeletonTable } from "./transactions-data-table-skeleton";
import { TrasactionsEmpty } from "./transactions-empty";

type TransactionsDataTableData = {
  transactions: TransactionItem[];
  categories: CategoryItem[]
};

type TransactionsDataTableProps = {
  data: TransactionsDataTableData;
  onFiltersChange: (filter: TransactionsFilters) => void;
  createAction: (formData: FormData) => Promise<TransactionActionState>;
  isLoading?: boolean;
};

function createTempTransactionId() {
  return `temp_tx_${Math.random().toString(36).slice(2, 10)}`;
}

export function TransactionsDataTable({
  data,
  onFiltersChange,
  createAction,
  isLoading = false,
}: TransactionsDataTableProps) {
  const [rows, setRows] = React.useState<TransactionItem[]>(data.transactions);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
  const [category, setCategory] = React.useState<'all' | string>('all');
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();

  const { categories } = data;

  React.useEffect(() => {
    setRows(data.transactions);
  }, [data.transactions]);

  const columns = React.useMemo(() => transactionsDataTableColumns, []);

  function handleCategoryChange(data: string) {
    setCategory(data);

    onFiltersChange({
      category: data,
      dateRange,
    });
  }

  function handleSetDateRange(data: DateRange | undefined) {
    setDateRange(data);

    onFiltersChange({
      category,
      dateRange: data,
    });
  }

  function handleResetFilters() {
    setCategory('all');
    setDateRange(undefined);

    onFiltersChange({
      category: 'all',
      dateRange: undefined,
    });
  }

  const table = useReactTable({
    data: rows,
    columns,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
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

  React.useEffect(() => {
    table.setPageIndex(0);
  }, [category, dateRange, table, rows]);

  function handleCreateSubmit(formData: CreateTransactionFormData) {
    const selectedCategory = formData.categoryId
      ? categories.find((categoryItem) => categoryItem.id === formData.categoryId)
      : undefined;

    const nextTransaction: TransactionItem = {
      id: createTempTransactionId(),
      title: formData.title,
      amount: formData.amount,
      operation: formData.operation,
      method: formData.method,
      createdAt: new Date().toISOString(),
      category: selectedCategory
        ? {
          name: selectedCategory.name,
          slug: selectedCategory.slug,
        }
        : null,
    };

    setRows((current) => [nextTransaction, ...current]);
    setIsCreateDialogOpen(false);
    toast.success("Transaction created successfully.");
  }

  const hasFilters = category !== 'all' || dateRange !== undefined;
  const hasRows = table.getRowModel().rows.length;

  return (
    <>
      {!hasRows && !hasFilters ? (
        <TrasactionsEmpty onCreateClick={() => setIsCreateDialogOpen(true)} />
      ) : (
        <div className="flex flex-col gap-3">
          <TransactionsDataTableToolbar
            table={table}
            categorySelected={category}
            categories={categories}
            dateRange={dateRange}
            isLoading={isLoading}
            onCategoryChange={handleCategoryChange}
            onDateRangeChange={handleSetDateRange}
            onResetFilters={handleResetFilters}
            onCreateClick={() => setIsCreateDialogOpen(true)}
          />

          {isLoading ? <SkeletonTable /> :
            (<div className="overflow-hidden rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
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
                        className={
                          row.original.operation === "income"
                            ? "bg-gradient-to-r from-cyan-500/10 via-cyan-500/4 to-transparent hover:from-cyan-500/12 hover:via-cyan-500/6"
                            : undefined
                        }
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
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
            </div>)
          }
          {/* <TransactionsDataTablePagination table={table} /> */}
        </div>
      )}

      <CreateTransactionDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        categories={categories}
        action={createAction}
        onCreated={handleCreateSubmit}
      />
    </>
  );
}
