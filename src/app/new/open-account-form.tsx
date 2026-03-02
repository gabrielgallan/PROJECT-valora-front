'use client'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useFormState } from "@/hooks/use-form-state"
import { HTTPGetProfileResponse } from "@/http/get-profile"
import { AlertTriangle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { openAccountAction } from "./actions"

const quickBalances = [
    { label: "100", value: "100" },
    { label: "250", value: "250" },
    { label: "500", value: "500" },
    { label: "1,000", value: "1000" }
]

interface OpenAccountProps {
    user: HTTPGetProfileResponse['user']
}

export function OpenAccountForm({ user }: OpenAccountProps) {
    const [balance, setBalance] = useState("")

    const router = useRouter()

    const [{ success, message, errors }, handleOpenAccount, isPending] = useFormState(
        openAccountAction,
        () => {
            router.push('/')
        }
    )

    const handleBalanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBalance(event.target.value)
    }

    const handleQuickPick = (value: string) => {
        setBalance(value)
    }

    // const handleFinishSetup = () => {
    //     // TODO: implement finish account setup flow
    // }

    // const handleSkipBalance = () => {
    //     // TODO: implement continue without balance flow
    // }

    return (
        <form className="w-full space-y-6" onSubmit={handleOpenAccount}>
            {success === false && message && (
                <Alert variant="destructive">
                    <AlertTriangle className="size-5" />
                    <AlertTitle>Sign up failed!</AlertTitle>
                    <AlertDescription>
                        <p>{message}</p>
                    </AlertDescription>
                </Alert>
            )}

            <div>
                <p className="text-sm text-muted-foreground">
                    {user.name ? `Let’s finish opening your account, ${user.name}.` :
                        "Let’s finish opening your account."} Add an optional initial balance
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
                {quickBalances.map((balanceOption) => (
                    <Button
                        key={balanceOption.value}
                        type="button"
                        variant="outline"
                        className="rounded-full px-5"
                        onClick={() => handleQuickPick(balanceOption.value)}
                    >
                        {balanceOption.label}
                    </Button>
                ))}
            </div>

            <div className="space-y-4">
                <input
                    name="balance"
                    id="balance"
                    type="number"
                    step="0.01"
                    placeholder="00.00"
                    aria-label="Initial balance"
                    className="w-full bg-transparent p-0 text-center text-5xl tracking-tight text-foreground outline-none placeholder:text-muted-foreground/50 caret-transparent"
                    value={balance}
                    onChange={handleBalanceChange}
                />
                <p className="text-xs text-muted-foreground">
                    Leave it blank to continue without a balance.
                </p>

                {errors?.initialBalance && (
                    <p className="text-xs font-medium text-red-500 dark:text-red-400">
                        {errors.initialBalance[0]}
                    </p>
                )}
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                <Button size="lg" type="submit" className="sm:w-auto">
                    {isPending ? <Loader2 className="animate-spin" /> : "Finish account setup"}
                </Button>
            </div>
        </form>
    )
}