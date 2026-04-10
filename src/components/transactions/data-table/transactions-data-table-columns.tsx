"use client";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { differenceInDays } from "date-fns";
import { type ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Transaction } from "@/http/types/transaction";

type SortableHeaderProps = {
  title: string;
  onClick: () => void;
};

function SortableHeader({ title, onClick }: SortableHeaderProps) {
  return (
    <Button variant="ghost" className="-ml-3 h-8" onClick={onClick}>
      {title}
      <ArrowUpDown data-icon="inline-end" />
    </Button>
  );
}

function getCreatedAtDate(value: string) {
  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
}

export const transactionsDataTableColumns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <SortableHeader
        title="Title"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      return <div className="max-w-[18rem] truncate font-medium">{title}</div>;
    },
  },
  {
    id: "category",
    accessorFn: (row) => row.category?.slug ?? "uncategorized",
    header: ({ column }) => (
      <SortableHeader
        title="Category"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => {
      const categoryLabel = row.original.category?.name ?? "Uncategorized";
      return <span className="text-muted-foreground">{categoryLabel}</span>;
    },
  },
  {
    accessorKey: "operation",
    header: ({ column }) => (
      <SortableHeader
        title="Type"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      />
    ),
    cell: ({ row }) => {
      const operation = row.original.operation;

      return (
        <Badge variant={operation === "income" ? "default" : "secondary"}>
          {operation === "income" ? "Income" : "Expense"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div className="text-right">
        <SortableHeader
          title="Amount"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      </div>
    ),
    cell: ({ row }) => {
      const sign = row.original.operation === "income" ? "+" : "-";
      const amount = row.original.amount;
      const formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(Math.abs(amount));

      return <div className="text-right font-medium">{`${sign} ${formattedAmount}`}</div>;
    },
  },
  {
    accessorKey: "method",
    header: ({ column }) => (
      <div className="text-right">
        <SortableHeader
          title="Method"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      </div>
    ),
    cell: ({ row }) => {
      return <div className="text-right">{row.original.method ?? "-"}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    sortingFn: (rowA, rowB, columnId) => {
      const leftDate = getCreatedAtDate(rowA.getValue(columnId) as string);
      const rightDate = getCreatedAtDate(rowB.getValue(columnId) as string);
      const left = leftDate ? leftDate.getTime() : 0;
      const right = rightDate ? rightDate.getTime() : 0;

      return left - right;
    },
    header: ({ column }) => (
      <div className="text-right">
        <SortableHeader
          title="Date"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        />
      </div>
    ),
    cell: ({ row }) => {
      const date = getCreatedAtDate(row.getValue("createdAt") as string);

      if (!date) {
        return <div className="text-right text-muted-foreground">-</div>;
      }

      return <div className="text-right text-muted-foreground">{differenceInDays(new Date(), date)} days ago</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: "",
    cell: ({ row }) => {
      const transaction = row.original;

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(transaction.id)}>
                Copy transaction code
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View transaction details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
