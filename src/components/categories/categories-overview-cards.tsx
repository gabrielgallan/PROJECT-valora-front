import { CircleCheckBig, CircleOff, Layers3, Link2 } from "lucide-react"

import type { CategoriesOverview } from "@/components/categories/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type CategoriesOverviewCardsProps = {
  overview: CategoriesOverview
}

export function CategoriesOverviewCards({ overview }: CategoriesOverviewCardsProps) {
  const cards = [
    { label: "Total", value: overview.total, icon: Layers3 },
    { label: "Ativas", value: overview.active, icon: CircleCheckBig },
    { label: "Inativas", value: overview.inactive, icon: CircleOff },
    { label: "Em uso", value: overview.inUse, icon: Link2 },
  ]

  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label} className="py-4">
          <CardHeader className="flex flex-row items-center justify-between px-4 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{card.label}</CardTitle>
            <card.icon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="px-4 pt-0">
            <p className="text-2xl font-semibold tracking-tight">{card.value}</p>
          </CardContent>
        </Card>
      ))}
    </section>
  )
}
