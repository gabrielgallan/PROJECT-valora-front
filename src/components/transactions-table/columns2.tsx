"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Button } from "../ui/button"
import { differenceInDays } from "date-fns"
import { Transaction } from "@/http/types/transaction"

export const columns2: ColumnDef<Transaction>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => {
            const title: string = row.getValue("title")
            return <div className="w-[24rem] truncate font-medium sm:max-w-[18rem]">{title}</div>
        },
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
            const amount = row.original.amount
            const sign = row.original.operation === "income" ? "+" : "-"
            const formattedAmount = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(Math.abs(amount))

            return <div className="text-right">{`${sign} ${formattedAmount}`}</div>
        },
    },
    {
        accessorKey: "method",
        header: () => <div className="text-right">Method</div>,
        cell: ({ row }) => {
            return <div className="text-right">{row.original.method}</div>
        },
    },
    {
        accessorKey: "createdAt",
        header: () => <div className="text-right">Date</div>,
        cell: ({ row }) => {
            const rawDate: Date | string = row.getValue('createdAt')

            const date = rawDate instanceof Date ? rawDate : new Date(rawDate)

            return <div className="text-right">{differenceInDays(new Date(), date)} days ago</div>
        },
    },
    {
        id: "actions",
        header: "",
        cell: ({ row }) => {
            const transaction = row.original

            return (
                <div className="flex justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(transaction.id)}
                            >
                                Copy transaction code
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View transaction details</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    },
]
