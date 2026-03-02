import { env } from "@/lib/env"
import ky from "ky"

import { getCookie } from 'cookies-next'

export const api = ky.create({
    prefixUrl: env.NEXT_PUBLIC_API_URL,
    hooks: {
        beforeRequest: [
            async (request) => {
                let token: string | undefined

                if (typeof window === 'undefined') {
                    const { cookies } = await import('next/headers')

                    const cookieStore = await cookies()
                    token = cookieStore.get('token')?.value
                } else {
                    const cookieValue = getCookie('token')
                    token = typeof cookieValue === 'string' ? cookieValue : undefined
                }

                if (token) {
                    request.headers.set('Authorization', `Bearer ${token}`)
                }
            },
        ],
    },
})