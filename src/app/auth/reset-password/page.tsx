import { ResetPasswordForm } from "./reset-password-form"

interface ResetPasswordPageProps {
    searchParams: Promise<{ code: string }>
}

export default async function ResetPasswordPage({
    searchParams,
}: ResetPasswordPageProps) {
    const { code } = await searchParams

    console.log(code)

    return (
        <ResetPasswordForm code={code} />
    )
}