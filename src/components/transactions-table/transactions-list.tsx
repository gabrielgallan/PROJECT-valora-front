"use client";


import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Card,
    CardContent,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface TransactionsListProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    layoutMode?: "fixed" | "auto";
    isLoading?: boolean;
    emptyTitle?: string;
}

function getTransactionRowToneClass(rowData: unknown) {
    if (!rowData || typeof rowData !== "object" || !("operation" in rowData)) {
        return undefined;
    }

    const { operation } = rowData;

    // if (operation === "expense") {
    //     return "bg-gradient-to-r from-red-500/8 via-red-500/4 to-transparent hover:from-red-500/12 hover:via-red-500/6"
    // }

    if (operation === "income") {
        return "bg-gradient-to-r from-cyan-500/10 via-cyan-500/4 to-transparent hover:from-cyan-500/12 hover:via-cyan-500/6";
    }

    return undefined;
}

export function TransactionsList<TData, TValue>({
    columns,
    layoutMode = "fixed",
    data,
    isLoading = false,
    emptyTitle = "No results.",
}: TransactionsListProps<TData, TValue>) {
    const isFixedLayout = layoutMode === "fixed";

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <section className={cn("flex flex-col", isFixedLayout && "h-full min-h-0")}>
            <Card
                className={cn(
                    "flex min-h-0 flex-col gap-0 bg-transparent py-0",
                    isFixedLayout && "min-h-0 flex-1 overflow-hidden",
                )}
            >
                <div
                    className={cn(
                        isFixedLayout ? "min-h-0 flex-1 overflow-auto" : "overflow-visible",
                    )}
                >
                    {isLoading ? (
                        <CardContent className="space-y-3 p-4">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <Skeleton key={index} className="h-8 w-full" />
                            ))}
                        </CardContent>
                    ) : (
                        <Table>
                            <TableHeader className="sticky top-0 z-10">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            const isDateColumn = header.column.id === "createdAt"
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
                            </TableHeader>
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
                                                const isDateColumn = cell.column.id === "createdAt";
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
                                        <TableCell colSpan={columns.length} className="h-25 text-center">
                                            <div className="flex flex-col items-center gap-1">
                                                <p className="font-medium">{emptyTitle}</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </Card>
        </section>
    );
}
