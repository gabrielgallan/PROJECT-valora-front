import { HTTPGetProfile } from "@/http/get-profile"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function currentUser() {
    const storageCookies = await cookies()

    const token = storageCookies.get('token')?.value

    if (!token) {
        redirect('/auth/sign-in')
    }

    try {
        const { user } = await HTTPGetProfile()

        return { user }
    } catch {
        redirect('/api/auth/sign-out')
    }
}