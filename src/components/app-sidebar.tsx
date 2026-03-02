"use client"

import {
  Icon,
  IconChartBar,
  IconInnerShadowTop,
  IconSettings,
  IconCash,
  IconChartPie
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser, NavUserProps } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

interface NavMain {
  title: string,
  url: string,
  icon: Icon,
}

interface AppSideBarProps extends React.ComponentProps<typeof Sidebar> {
  user: NavUserProps['user']
}

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconChartBar,
    },
    {
      title: "Categories",
      url: "#",
      icon: IconChartPie,
    },
    {
      title: "Transactions",
      url: "#",
      icon: IconCash,
    }
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    }
  ]
}

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
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Smart Finance Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}