"use server";

import { HTTPOpenWallet } from "@/http/open-wallet";
import { HTTPError } from "ky";
import z from "zod";

interface OpenWalletActionInput {
  balance: number;
}

interface OpenWalletActionOutput {
  success: boolean;
  message: string | null;
  errors: Record<string, string[]> | null;
}

export async function openWalletAction(
  input: OpenWalletActionInput,
): Promise<OpenWalletActionOutput> {
  const schema = z.object({
    balance: z.coerce.number().default(0),
  });

  const parser = schema.safeParse(input);

  if (!parser.success) {
    const errors = parser.error.flatten().fieldErrors;
    return { success: false, message: null, errors };
  }

  const { balance } = parser.data;

  try {
    await HTTPOpenWallet({
      body: { balance },
    });

    return { success: true, message: null, errors: null };
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json();
      return { success: false, message, errors: null };
    }
    return {
      success: false,
      message: "Unexpected error, try again in a few minutes",
      errors: null,
    };
  }
}
