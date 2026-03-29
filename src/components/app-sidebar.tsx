"use client";

import {
  Icon,
  IconArrowNarrowUpDashed,
  IconLayoutDashboard,
  IconInnerShadowTop,
  IconSettings,
  IconCash,
  IconChartPie,
  IconDatabase,
  IconReport,
  IconFileWord,
} from "@tabler/icons-react";
import Link from "next/link";

import { NavMain } from "@/components/nav/nav-main";
import { NavSecondary } from "@/components/nav/nav-secondary";
import { NavUser, NavUserProps } from "@/components/nav/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavDocuments } from "./nav/nav-documents";

interface NavMain {
  title: string;
  url: string;
  icon: Icon;
}

interface AppSideBarProps extends React.ComponentProps<typeof Sidebar> {
  user: NavUserProps["user"];
}

const sidebarData = {
  main: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconLayoutDashboard,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: IconArrowNarrowUpDashed,
    },
    {
      title: "Categories",
      url: "/categories",
      icon: IconChartPie,
    },
    {
      title: "Transactions",
      url: "/transactions",
      icon: IconCash,
    },
  ],
  secondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
};

export function AppSidebar({ user, ...props }: AppSideBarProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/dashboard">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Valora</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData.main} />
        <NavDocuments items={sidebarData.documents} />
        <NavSecondary items={sidebarData.secondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
