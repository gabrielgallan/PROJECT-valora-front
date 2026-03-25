import { HTTPGetWalletInfo } from "@/http/get-wallet-info"
import { HTTPError } from "ky"

export async function getWallet() {
    try {
        const response = await HTTPGetWalletInfo()

        return response.wallet
    } catch (err) {
        if (err instanceof HTTPError && err.response.status === 404) {
            return null
        }

        throw err
    }
}
