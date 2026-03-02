'use server'

import { HTTPOpenAccount } from "@/http/open-account"
import { HTTPError } from "ky"
import z from "zod"

export async function openAccountAction(formData: FormData) {
    const formDataSchema = z.object({
        initialBalance: z.coerce.number().default(0)
    })

    const parser = formDataSchema.safeParse(Object.fromEntries(formData))

    if (!parser.success) {
        const errors = parser.error.flatten().fieldErrors

        return { success: false, message: null, errors }
    }

    const { initialBalance } = parser.data

    try {
        await HTTPOpenAccount({
            initialBalance
        })

        return { success: true, message: null, errors: null }
    } catch (err) {
        if (err instanceof HTTPError) {
            const { message } = await err.response.json()

            return { success: false, message, errors: null }
        }

        return { success: false, message: 'Unexpected error, try again in a few minutes', errors: null }
    }
}