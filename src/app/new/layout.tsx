export default async function NewAccountLayout({
    children,
    sheet,
}: Readonly<{
    children: React.ReactNode
    sheet: React.ReactNode
}>) {
    return (
        <>
            {children}
            {sheet}
        </>
    )
}