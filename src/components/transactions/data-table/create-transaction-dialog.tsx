"use client";

import * as React from "react";

import type { TransactionActionState } from "@/app/(private)/(sidebar)/transactions/actions";
import { useFormState } from "@/hooks/use-form-state";
import type { CategoryItem } from "@/http/list-categories";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export interface CreateTransactionFormData {
  title: string;
  amount: number;
  operation: "income" | "expense";
  method: string;
  categoryId?: string;
  description?: string;
}

type CreateTransactionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: CategoryItem[];
  action: (formData: FormData) => Promise<TransactionActionState>;
  onCreated: (data: CreateTransactionFormData) => void;
};

export function CreateTransactionDialog({
  open,
  onOpenChange,
  categories,
  action,
  onCreated,
}: CreateTransactionDialogProps) {
  const [title, setTitle] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [operation, setOperation] = React.useState<"income" | "expense">("expense");
  const [method, setMethod] = React.useState("");
  const [categoryId, setCategoryId] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    action,
    () => {
      onCreated({
        title: title.trim(),
        amount: Number(amount),
        operation,
        method: method.trim(),
        categoryId: categoryId || undefined,
        description: description.trim() || undefined,
      });
      onOpenChange(false);
    },
    { success: false, message: null, errors: null }
  );

  React.useEffect(() => {
    if (!open) {
      setTitle("");
      setAmount("");
      setOperation("expense");
      setMethod("");
      setCategoryId("");
      setDescription("");
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New transaction</DialogTitle>
          <DialogDescription>Fill out the fields below to create a transaction.</DialogDescription>
        </DialogHeader>

        {success === false && message ? <p className="text-sm text-destructive">{message}</p> : null}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="transaction-create-title">Title</Label>
            <Input
              id="transaction-create-title"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. April salary"
              required
              disabled={isPending}
            />
            {errors?.title ? <p className="text-xs text-destructive">{errors.title[0]}</p> : null}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="transaction-create-amount">Amount</Label>
              <Input
                id="transaction-create-amount"
                name="amount"
                type="number"
                min={0.01}
                step="0.01"
                inputMode="decimal"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="0.00"
                required
                disabled={isPending}
              />
              {errors?.amount ? <p className="text-xs text-destructive">{errors.amount[0]}</p> : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="transaction-create-method">Method</Label>
              <Input
                id="transaction-create-method"
                name="method"
                value={method}
                onChange={(event) => setMethod(event.target.value)}
                placeholder="e.g. Credit card"
                required
                disabled={isPending}
              />
              {errors?.method ? <p className="text-xs text-destructive">{errors.method[0]}</p> : null}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="transaction-create-operation">Type</Label>
              <input type="hidden" name="operation" value={operation} />
              <Select
                value={operation}
                onValueChange={(value) => setOperation(value as "income" | "expense")}
                disabled={isPending}
              >
                <SelectTrigger id="transaction-create-operation" className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                </SelectContent>
              </Select>
              {errors?.operation ? <p className="text-xs text-destructive">{errors.operation[0]}</p> : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="transaction-create-category">Category (optional)</Label>
              <input type="hidden" name="categoryId" value={categoryId} />
              <Select value={categoryId || "none"} onValueChange={(value) => setCategoryId(value === "none" ? "" : value)} disabled={isPending}>
                <SelectTrigger id="transaction-create-category" className="w-full">
                  <SelectValue placeholder="No category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No category</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors?.categoryId ? <p className="text-xs text-destructive">{errors.categoryId[0]}</p> : null}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="transaction-create-description">Description (optional)</Label>
            <Textarea
              id="transaction-create-description"
              name="description"
              rows={3}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Add a short description"
              disabled={isPending}
            />
            {errors?.description ? <p className="text-xs text-destructive">{errors.description[0]}</p> : null}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
