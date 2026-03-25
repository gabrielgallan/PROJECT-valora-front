import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function TestSectionCards() {
  return (
    <div className="grid h-full min-h-0 auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2">

      <Card
        className="flex h-full min-h-0 flex-col gap-3 overflow-hidden bg-transparent py-4"
      >
        <CardHeader className="gap-1 px-4">
          <CardDescription>
            Total Balance
          </CardDescription>

          <CardTitle className="text-2xl font-semibold tabular-nums xl:text-3xl">
            $4,230.75
          </CardTitle>

          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp className="size-4 text-[var(--emerald-300)]" />
              +8.4%
            </Badge>
          </CardAction>
        </CardHeader>

        <CardFooter className="mt-auto flex-col items-start gap-1 px-4 text-xs text-muted-foreground sm:text-sm">
          <div className="flex gap-2 font-medium">
            Account growth this month
          </div>
          <div>
            Compared to April balance
          </div>
        </CardFooter>
      </Card>

      <Card
        className="flex h-full min-h-0 flex-col gap-3 overflow-hidden bg-transparent py-4"
      >
        <CardHeader className="gap-1 px-4">
          <CardDescription>
            Savings Rate
          </CardDescription>

          <CardTitle className="text-2xl font-semibold tabular-nums xl:text-3xl">
            31%
          </CardTitle>

          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp className="size-4 text-[var(--emerald-300)]" />
              +6%
            </Badge>
          </CardAction>
        </CardHeader>

        <CardFooter className="mt-auto flex-col items-start gap-1 px-4 text-xs text-muted-foreground sm:text-sm">
          <div className="flex gap-2 font-medium">
            Better savings performance
          </div>
          <div className="text-muted-foreground">
            Based on monthly income
          </div>
        </CardFooter>
      </Card>

      <Card className="flex h-full min-h-0 flex-col gap-3 overflow-hidden bg-transparent py-4">
        <CardHeader className="gap-1 px-4">
          <CardDescription>Monthly Income</CardDescription>

          <CardTitle className="text-2xl font-semibold tabular-nums xl:text-3xl">
            $2,150.00
          </CardTitle>

          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp className="size-4 text-[var(--emerald-300)]" />
              +12.1%
            </Badge>
          </CardAction>
        </CardHeader>

        <CardFooter className="mt-auto flex-col items-start gap-1 px-4 text-xs text-muted-foreground sm:text-sm">
          <div className="flex gap-2 font-medium">
            Increased revenue
          </div>
          <div className="text-muted-foreground">
            Higher freelance income
          </div>
        </CardFooter>
      </Card>

      <Card className="flex h-full min-h-0 flex-col gap-3 overflow-hidden bg-transparent py-4">
        <CardHeader className="gap-1 px-4">
          <CardDescription>Monthly Expenses</CardDescription>

          <CardTitle className="text-2xl font-semibold tabular-nums xl:text-3xl">
            $1,480.20
          </CardTitle>

          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown className="size-4 text-[var(--red-300)]" />
              -4.3%
            </Badge>
          </CardAction>
        </CardHeader>

        <CardFooter className="mt-auto flex-col items-start gap-1 px-4 text-xs text-muted-foreground sm:text-sm">
          <div className="flex gap-2 font-medium">
            Expenses reduced
          </div>
          <div className="text-muted-foreground">
            Lower subscription costs
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}