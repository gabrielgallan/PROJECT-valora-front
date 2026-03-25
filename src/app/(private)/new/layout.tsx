import { getWallet } from "@/strategies/get-wallet"
import { redirect } from "next/navigation"

export default async function NewAccountLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const wallet = await getWallet()

    if (wallet) {
        redirect('/dashboard')
    }

    return (
        <>{children}</>
    )
}
