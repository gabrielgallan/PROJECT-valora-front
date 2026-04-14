import { HTTPGetWalletInfo } from "@/http/get-wallet-info";
import { HTTPError } from "ky";

export async function verifyHasWallet() {
  try {
    const response = await HTTPGetWalletInfo();

    return true;
  } catch (err) {
    if (err instanceof HTTPError && err.response.status === 404) {
      return false;
    }

    return false;
  }
}
