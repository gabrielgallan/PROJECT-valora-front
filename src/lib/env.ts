import { z } from "zod"

const envSchema = z.object({
    PORT: z.coerce.number().default(3000),
    NEXT_PUBLIC_API_URL: z.url(),
    GITHUB_OAUTH_CLIENT_ID: z.string(),
    GITHUB_OAUTH_CLIENT_SECRET: z.string(),
    GITHUB_OAUTH_CLIENT_REDIRECT_URI: z.url()
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
    const issues = _env.error.format()

    throw new Error(`Invalid server environment variables: ${issues}`)
}

export const env = _env.data