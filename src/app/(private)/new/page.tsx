import { currentUser } from "@/strategies/current-user";
import { NewWalletForm } from "./new-wallet-form";

export default async function NewWalletPage() {
  const { user } = await currentUser();

  return <NewWalletForm user={user} />;
}
