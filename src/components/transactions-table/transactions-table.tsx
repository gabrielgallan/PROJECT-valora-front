"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

interface TransactionsTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function getTransactionRowToneClass(rowData: unknown) {
  if (!rowData || typeof rowData !== "object" || !("type" in rowData)) {
    return undefined;
  }

  const type = rowData.type;

  // if (type === "expense") {
  //     return "bg-gradient-to-r from-red-500/8 via-red-500/4 to-transparent hover:from-red-500/12 hover:via-red-500/6"
  // }

  if (type === "income") {
    return "bg-gradient-to-r from-cyan-500/10 via-cyan-500/4 to-transparent hover:from-cyan-500/12 hover:via-cyan-500/6";
  }

  return undefined;
}

export function TransactionsTable<TData, TValue>({
  columns,
  data,
}: TransactionsTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Card className="flex h-full min-h-0 flex-col bg-transparent py-0 gap-0">
      <CardHeader className="border-b p-4">
        <CardTitle>Recent transactions</CardTitle>
        <CardDescription>Track your recent cash flow activity</CardDescription>
      </CardHeader>
      <div className="min-h-0 flex-1 overflow-auto">
        <Table>
          {/* <TableHeader className="border-t-1">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const isDateColumn = header.column.id === "date"
                                const isActionsColumn = header.column.id === "actions"

                                return (
                                    <TableHead
                                        key={header.id}
                                        className={
                                            isDateColumn
                                                ? "pr-1"
                                                : isActionsColumn
                                                    ? "w-[1%] pl-0 [&:last-child]:pr-2"
                                                    : undefined
                                        }
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader> */}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={getTransactionRowToneClass(row.original)}
                >
                  {row.getVisibleCells().map((cell) => {
                    const isTitleColumn = cell.column.id === "title";
                    const isDateColumn = cell.column.id === "date";
                    const isActionsColumn = cell.column.id === "actions";

                    return (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          isTitleColumn && "max-w-0",
                          isDateColumn
                            ? "pr-1"
                            : isActionsColumn
                              ? "w-[1%] pl-0 [&:last-child]:pr-2"
                              : undefined,
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
