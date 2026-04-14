"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { HTTPGetProfileResponse } from "@/http/get-profile";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { openWalletAction } from "./actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserInitials } from "@/utils/get-user-initials";
import { useState } from "react";

interface NewWalletFormProps {
  user: HTTPGetProfileResponse["user"];
}

export function NewWalletForm({ user }: NewWalletFormProps) {
  const [balance, setBalance] = useState("");
  const [message, setMessage] = useState<null | string>(null);
  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  const handleOpenWallet = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setMessage(null);
    setIsPending(true);

    const result = await openWalletAction({ balance: Number(balance) });

    setIsPending(false);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setMessage(result.message);
    }
  };

  const handleSkipWalletSetup = async () => {
    setMessage(null);
    setIsPending(true);

    const result = await openWalletAction({ balance: 0 });

    setIsPending(false);

    if (result.success) {
      router.push("/dashboard");
    } else {
      setMessage(result.message);
    }
  };

  const userName = user.name ?? "Hello";

  const initials = getUserInitials({
    name: user.name,
    email: user.email,
  });

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col items-center justify-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user.avatarUrl ?? undefined} alt={userName} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col items-center justify-center">
          <p className="text-xl">Welcome, {userName}!</p>
          <p className="text-xl">Finish setting up your account.</p>
        </div>
      </div>

      <form onSubmit={handleOpenWallet} className="space-y-4">
        {message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Open wallet failed!</AlertTitle>
            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <Label htmlFor="balance">Initial balance</Label>
          <Input
            id="balance"
            name="balance"
            type="number"
            value={balance}
            onChange={(event) => setBalance(event.target.value)}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Finish account setup"
          )}
        </Button>

        <Button
          type="button"
          variant="ghost"
          className="w-full"
          onClick={handleSkipWalletSetup}
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Skip account setup"
          )}
        </Button>
      </form>
    </div>
  );
}
