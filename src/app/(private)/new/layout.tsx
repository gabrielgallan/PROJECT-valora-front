import { verifyHasWallet } from "@/strategies/verify-has-wallet";
import { redirect } from "next/navigation";

export default async function NewAccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hasWallet = await verifyHasWallet();

  if (hasWallet) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-xs">{children}</div>
    </div>
  );
}
