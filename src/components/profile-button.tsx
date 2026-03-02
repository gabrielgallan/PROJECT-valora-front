import { ChevronDown, LogOut } from 'lucide-react'

import { currentUser } from '@/strategies/current-user'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { getUserInitials } from '@/utils/get-user-initials'

export async function ProfileButton() {
    const { user } = await currentUser()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-3 outline-none">
                <div className="flex flex-col items-end">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
                <Avatar className="size-8">
                    {user.avatarUrl && <AvatarImage src={user.avatarUrl} />}
                    {user.name && (
                        <AvatarFallback>{getUserInitials({ name: user.name })}</AvatarFallback>
                    )}
                </Avatar>
                <ChevronDown className="size-4 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <a href="/api/auth/sign-out">
                        <LogOut className="mr-2 size-4" />
                        Sign Out
                    </a>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}