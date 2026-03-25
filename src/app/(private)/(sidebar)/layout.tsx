import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { currentUser } from "@/strategies/current-user";
import { getUserInitials } from "@/utils/get-user-initials";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default async function PrivateLayout({ children }: AppLayoutProps) {
  const { user } = await currentUser();

  const initials = getUserInitials({
    name: user.name,
    email: user.email,
  });

  const navUserData = {
    name: user.name ?? initials,
    email: user.email,
    avatar: user.avatarUrl ?? "",
    initials,
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" user={navUserData} />
      <SidebarInset className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <SiteHeader />
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
