import { redirect } from "next/navigation"
import { currentUser } from "./current-user"
import { HTTPGetAccountInfo } from "@/http/get-account-info"

export async function getAccount() {
    const { token } = await currentUser()

    try {
        const response = await HTTPGetAccountInfo({ token })

        return response
    } catch {
        redirect('/new')
    }
}