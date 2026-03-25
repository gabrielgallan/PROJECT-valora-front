'use client'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useFormState } from "@/hooks/use-form-state"
import { HTTPGetProfileResponse } from "@/http/get-profile"
import { AlertTriangle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { openWalletAction } from "./actions"

const quickBalances = [
    { label: "100", value: "100" },
    { label: "250", value: "250" },
    { label: "500", value: "500" },
    { label: "1,000", value: "1000" }
]

interface OpenAccountProps {
    user: HTTPGetProfileResponse['user']
}

export function OpenWalletForm({ user }: OpenAccountProps) {
    const [balance, setBalance] = useState("")

    const router = useRouter()

    const [{ success, message, errors }, handleOpenWallet, isPending] = useFormState(
        openWalletAction,
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
        <form className="w-full space-y-6" onSubmit={handleOpenWallet}>
            {success === false && message && (
                <Alert variant="destructive">
                    <AlertTriangle className="size-5" />
                    <AlertTitle>Erro ao concluir cadastro</AlertTitle>
                    <AlertDescription>
                        <p>{message}</p>
                    </AlertDescription>
                </Alert>
            )}

            <div className="space-y-2 text-center">
                <p className="text-sm font-medium text-foreground">
                    {user.name ? `Vamos finalizar sua conta, ${user.name}.` : "Vamos finalizar sua conta."}
                </p>
                <p className="text-xs text-muted-foreground">
                    Defina um saldo inicial (opcional) para começar a organizar suas financas.
                </p>
            </div>

            <div className="space-y-3">
                <label className="text-xs font-medium text-muted-foreground" htmlFor="balance">
                    Saldo inicial
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-muted/20 px-4 py-5 shadow-sm">
                    <span className="text-sm font-medium text-muted-foreground">R$</span>
                    <input
                        name="balance"
                        id="balance"
                        type="number"
                        step="0.01"
                        min="0"
                        inputMode="decimal"
                        placeholder="0.00"
                        aria-label="Saldo inicial"
                        className="w-full bg-transparent text-4xl font-semibold tracking-tight text-foreground outline-none placeholder:text-muted-foreground/40"
                        value={balance}
                        onChange={handleBalanceChange}
                    />
                </div>
                <p className="text-xs text-muted-foreground">
                    Deixe em branco se preferir comecar sem saldo.
                </p>
                {errors?.initialBalance && (
                    <p className="text-xs font-medium text-red-500 dark:text-red-400">
                        {errors.initialBalance[0]}
                    </p>
                )}
            </div>

            <div className="flex flex-wrap justify-center gap-2">
                {quickBalances.map((balanceOption) => (
                    <Button
                        key={balanceOption.value}
                        type="button"
                        variant="outline"
                        className={`rounded-full px-5 ${
                            balance === balanceOption.value
                                ? "border-foreground/40 bg-foreground/5 text-foreground"
                                : "border-border/60"
                        }`}
                        onClick={() => handleQuickPick(balanceOption.value)}
                    >
                        {balanceOption.label}
                    </Button>
                ))}
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                <Button size="lg" type="submit" className="h-12 w-full sm:w-auto">
                    {isPending ? <Loader2 className="animate-spin" /> : "Concluir configuracao"}
                </Button>
            </div>
        </form>
    )
}