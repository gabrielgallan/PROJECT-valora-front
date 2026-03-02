'use client'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormState } from "@/hooks/use-form-state"
import { AlertTriangle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { resetPassword } from "./action"

interface ResetPasswordFormProps {
    code: string
}

export function ResetPasswordForm({ code }: ResetPasswordFormProps) {
    const router = useRouter()

    const [{ success, message, errors }, handleRecoverPassword, isPending] = useFormState(
        resetPassword,
        () => {
            router.push('/auth/sign-in')
        }
    )

    return (
        <form onSubmit={handleRecoverPassword} className="space-y-4">
            {success === false && message && (
                <Alert variant="destructive">
                    <AlertTriangle className="size-4" />
                    <AlertTitle>Reset password failed!</AlertTitle>
                    <AlertDescription>
                        <p>{message}</p>
                    </AlertDescription>
                </Alert>
            )}

            <div className="space-y-4">
                <Label htmlFor="password">New Password</Label>
                <Input name="password" type="password" id="password" />

                <Input name="code" type="hidden" id="code" value={code} />
            </div>

            {errors?.password && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                    {errors.password[0]}
                </p>
            )}

            <Button type="submit" className="w-full">
                {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Reset password'}
            </Button>
        </form>
    )
}