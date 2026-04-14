import { api } from "./api-client";

type HTTPOpenWalletRequest = {
  body: {
    balance: number;
  };
};

type HTTPOpenWalletResponse = null;

export async function HTTPOpenWallet({ body }: HTTPOpenWalletRequest) {
  const result = await api
    .post("api/wallets", {
      json: body,
    })
    .json<HTTPOpenWalletResponse>();

  return result;
}
