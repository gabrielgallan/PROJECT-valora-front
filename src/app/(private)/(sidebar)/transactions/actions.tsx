"use server";

import { description } from "@/components/categories-radial-chart";
import { HTTPCreateTransaction } from "@/http/create-transaction";
import { HTTPListTransactions, TransactionItem, type ListTransactionsQuery } from "@/http/list-transactions";
import { HTTPError } from "ky";
import z from "zod";

export interface TransactionActionState {
  success: boolean;
  message: string | null;
  errors: Record<string, string[]> | null;
}

interface ListTransctionsActionInput {
  categoryId?: string;
  startDate?: string;
  endDate?: string;
};

interface ListTransctionsActionOutput {
  success: boolean;
  transactions: TransactionItem[];
  message: string | null;
};

export async function listTransctionsAction(
  input: ListTransctionsActionInput,
): Promise<ListTransctionsActionOutput> {
  const query: ListTransactionsQuery = {};

  if (input.categoryId) {
    query.categoryId = input.categoryId;
  }

  if (input.startDate && input.endDate) {
    query.start = input.startDate;
    query.end = input.endDate;
  }

  try {
    const response = await HTTPListTransactions(query);

    return {
      success: true,
      transactions: response.transactions,
      message: null,
    };
  } catch {
    return {
      success: false,
      transactions: [],
      message: "Unable to load filtered transactions.",
    };
  }
}

export async function createTransactionAction(formData: FormData): Promise<TransactionActionState> {
  const schema = z.object({
    title: z.string().trim().min(2, { message: "Title must have at least 2 characters." }),
    amount: z.coerce.number().positive({ message: "Amount must be greater than zero." }),
    operation: z.enum(["income", "expense"], {
      message: "Operation must be income or expense.",
    }),
    method: z.string().trim().min(1, { message: "Method is required." }),
    categoryId: z.preprocess(
      (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
      z.string().trim().optional()
    ),
    description: z.preprocess(
      (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
      z.string().trim().max(240, { message: "Description can have at most 240 characters." }).optional()
    ),
  });

  const parser = schema.safeParse(Object.fromEntries(formData));

  console.log(parser)

  if (!parser.success) {
    return {
      success: false,
      message: null,
      errors: parser.error.flatten().fieldErrors,
    } satisfies TransactionActionState;
  }

  try {
    const body = {
      ...parser.data,
      description: undefined
    }

    console.log(body)

    await HTTPCreateTransaction({ body });

    return {
      success: true,
      message: null,
      errors: null,
    } satisfies TransactionActionState;
  } catch (err) {
    console.log(err)

    if (err instanceof HTTPError) {
      let payload: { message?: string } | null = null;

      try {
        payload = await err.response.json<{ message?: string }>();
      } catch {
        payload = null;
      }

      return {
        success: false,
        message: payload?.message ?? "Unable to create transaction.",
        errors: null,
      } satisfies TransactionActionState;
    }

    return {
      success: false,
      message: "Unexpected error, try again in a few minutes.",
      errors: null,
    } satisfies TransactionActionState;
  }
}
