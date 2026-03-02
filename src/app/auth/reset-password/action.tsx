'use server'

import { HTTPResetPassword } from "@/http/reset-password"
import { HTTPError } from "ky"
import z from "zod"

export async function resetPassword(
    formData: FormData
) {
    const formDataSchema = z.object({
        code: z.uuid({ message: 'Invalid code.' }),
        password: z.string().min(6, { message: 'Password must be at least 6 characters long.' })
    })

    const parser = formDataSchema.safeParse(Object.fromEntries(formData))

    if (!parser.success) {
        const errors = parser.error.flatten().fieldErrors

        return { success: false, message: null, errors }
    }

    const { code, password } = parser.data

    try {
        await HTTPResetPassword({
            code,
            password
        })
    } catch (err) {
        if (err instanceof HTTPError) {
            const { message } = await err.response.json()

            return { success: false, message, errors: null }
        }

        return { success: false, message: 'Unexpected error, try again in a few minutes', errors: null }
    }

    return { success: true, message: null, errors: null }
}