import { AppSidebar } from "@/components/app-sidebar"
import { ProgressChartAreaInteractive } from "@/components/progress-chart"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { currentUser } from "@/strategies/current-user"
import { getUserInitials } from "@/utils/get-user-initials"

// import data from './data.json'
// import { DataTable } from "@/components/data-table"

export default async function AppPage() {
    const { user } = await currentUser()

    const initials = getUserInitials({
        name: user.name,
        email: user.email
    })

    const navUserData = {
        name: user.name ?? initials,
        email: user.email,
        avatar: user.avatarUrl ?? '',
        initials
    }

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
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            {/* <SectionCards /> */}
                            <div className="px-4 lg:px-6">
                                <ProgressChartAreaInteractive />
                            </div>
                            {/* <DataTable data={data} /> */}
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
