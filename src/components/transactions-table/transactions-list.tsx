"use client";

import Link from "next/link";

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
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Download, ExternalLink } from "lucide-react";
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
    title?: string;
    description?: string;
    isLoading?: boolean;
    emptyTitle?: string;
    emptyDescription?: string;
    viewAllHref?: string;
    onExportCsv?: () => void;
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
    data,
    title = "Recent transactions",
    description = "Track your recent cash flow activity",
    isLoading = false,
    emptyTitle = "No results.",
    emptyDescription,
    viewAllHref,
    onExportCsv,
}: TransactionsListProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <Card className="flex h-full min-h-0 flex-col bg-transparent py-0 gap-0">
            <div className="min-h-0 flex-1 overflow-auto">
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
                                            {emptyDescription ? (
                                                <p className="text-muted-foreground text-xs sm:text-sm">
                                                    {emptyDescription}
                                                </p>
                                            ) : null}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )}
            </div>
        </Card>
    );
}
