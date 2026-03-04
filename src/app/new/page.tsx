import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { currentUser } from "@/strategies/current-user"
import { getUserInitials } from "@/utils/get-user-initials"
import { OpenWalletForm } from "./open-wallet-form"

export default async function OpenWalletPage() {
    const { user } = await currentUser()
    const userName = user.name ?? "Hello"

    const initials = getUserInitials({
        name: user.name,
        email: user.email
    })

    return (
        <main className="min-h-screen bg-gradient-to-b from-muted/40 via-muted/20 to-background">
            <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-10 px-6 py-16">
                <div className="flex flex-col items-center gap-3 text-center">
                    <span className="rounded-full border border-border/60 bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
                        Etapa final
                    </span>
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={user.avatarUrl ?? undefined} alt={userName} />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h1 className="text-3xl font-semibold text-foreground">
                            Bem-vindo, {userName}!
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Finalize sua conta com alguns detalhes para uma experiencia mais completa.
                        </p>
                    </div>
                </div>

                <div className="w-full rounded-3xl border border-border/60 bg-background/80 p-6 shadow-sm backdrop-blur">
                    <OpenWalletForm user={user} />
                </div>
            </div>
        </main>
    )
}