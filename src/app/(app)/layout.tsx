import { redirect } from 'next/navigation'

import { verifyAuthentication } from '@/strategies/verify-authentication'

export default async function AppLayout({
    children,
    sheet,
}: Readonly<{
    children: React.ReactNode
    sheet: React.ReactNode
}>) {
    const isAuthenticated = await verifyAuthentication()

    if (!isAuthenticated) {
        redirect('/auth/sign-in')
    }

    return (
        <>
            {children}
            {sheet}
        </>
    )
}