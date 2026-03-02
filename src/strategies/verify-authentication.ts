import { cookies } from 'next/headers'

export async function verifyAuthentication() {
    const storageCookies = await cookies()

    return storageCookies.get('token')?.value ? true : false
}