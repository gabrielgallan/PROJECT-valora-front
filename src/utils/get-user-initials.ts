interface GetUserInitialsInput {
    name?: string | null,
    email?: string
}

export function getUserInitials({ name, email }: GetUserInitialsInput): string {
    if (name) {
        const initials = name
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase())
            .slice(0, 2)
            .join('')

        return initials || email?.slice(0, 2).toUpperCase() || ''
    }

    return email?.slice(0, 2).toUpperCase() || ''
}