import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { currentUser } from "@/strategies/current-user"
import { getUserInitials } from "@/utils/get-user-initials"
import { OpenAccountForm } from "./open-account-form"

export default async function OpenAccountPage() {
    const { user } = await currentUser()
    const userName = user.name ?? "Hello"

    const initials = getUserInitials({
        name: user.name,
        email: user.email
    })

    return (
        <main className="min-h-screen bg-muted/30">
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 px-6 py-16 text-center">
                <div className="flex flex-col items-center gap-3">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={user.avatarUrl ?? undefined} alt={userName} />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <h1 className="text-2xl font-semibold text-foreground">
                        Hi {userName}!
                    </h1>
                </div>

                <OpenAccountForm user={user} />
            </div>
        </main>
    )
}