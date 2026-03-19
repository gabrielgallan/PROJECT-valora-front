"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Button } from "../ui/button"
import { differenceInDays } from "date-fns"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Transaction = {
    id: string
    title: string
    amount: number
    date: Date
    type: "income" | "expense"
}

export const columns: ColumnDef<Transaction>[] = [
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
            const sign = row.original.type === "income" ? "+" : "-"
            const formattedAmount = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(Math.abs(amount))

            return <div className="text-right">{`${sign} ${formattedAmount}`}</div>
        },
    },
    {
        accessorKey: "date",
        header: () => <div className="text-right">Date</div>,
        cell: ({ row }) => {
            const date: Date = row.getValue("date")
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
