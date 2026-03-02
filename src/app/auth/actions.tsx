'use server'

import { redirect } from "next/navigation"
import { env } from "@/lib/env"

export async function authenticateWithGithub() {
    const githubOAuthURL = new URL(
        'https://github.com/login/oauth/authorize',
    )

    githubOAuthURL.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID)
    githubOAuthURL.searchParams.set('redirect_uri', env.GITHUB_OAUTH_CLIENT_REDIRECT_URI)
    githubOAuthURL.searchParams.set('scope', 'user:email')

    redirect(githubOAuthURL.toString())
}