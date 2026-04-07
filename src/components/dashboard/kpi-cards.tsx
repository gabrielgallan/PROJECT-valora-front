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

export interface KPIDataSource {
  balance: {
    total: number
  }
  savingRate: {
    value: number
    percent: number
  }
  income: {
    total: number
    percent: number
  }
  expense: {
    total: number
    percent: number
  }
}

export interface KPICardsProps {
  data: KPIDataSource
}

type KPIComputedCard = {
  id: "balance" | "savingRate" | "income" | "expense"
  title: string
  value: number
  valueFormat: "currency" | "percent"
  deltaPercent?: number
  footerTitle: string
  footerSubtitle: string
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
})

const percentFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
})

const kpiCopy = {
  balance: {
    positive: {
      titles: ["Balance trending up", "Net position improving"],
      subtitles: ["Stronger month-over-month balance", "Positive momentum in your accounts"],
    },
    negative: {
      titles: ["Balance trending down", "Net position softening"],
      subtitles: ["Lower month-over-month balance", "Keep an eye on outflows"],
    },
  },
  savingRate: {
    positive: {
      titles: ["Savings rate improving", "Saving discipline is stronger"],
      subtitles: ["A higher share of income saved", "Good control over monthly spending"],
    },
    negative: {
      titles: ["Savings rate slipping", "Saving pace is slower"],
      subtitles: ["A smaller share of income saved", "Consider trimming non-essentials"],
    },
  },
  income: {
    positive: {
      titles: ["Income is up", "Revenue growth continues"],
      subtitles: ["Higher earnings this period", "Keep leveraging your top sources"],
    },
    negative: {
      titles: ["Income is down", "Revenue softened"],
      subtitles: ["Lower earnings this period", "Watch variability in top sources"],
    },
  },
  expense: {
    positive: {
      titles: ["Expenses contained", "Spending under control"],
      subtitles: ["Costs are trending lower", "Good progress reducing outflows"],
    },
    negative: {
      titles: ["Expenses rising", "Spending pressure building"],
      subtitles: ["Costs are trending higher", "Review recent increases"],
    },
  },
} as const

type KPITone = "positive" | "negative"
type KPITextConfig = { title: string; subtitle: string }

function getCopy(cardId: KPIComputedCard["id"], tone: KPITone, variantIndex = 0): KPITextConfig {
  const copy = kpiCopy[cardId][tone]
  const title = copy.titles[variantIndex] ?? copy.titles[0]
  const subtitle = copy.subtitles[variantIndex] ?? copy.subtitles[0]

  return { title, subtitle }
}

export function KPICards({ data }: KPICardsProps) {
  const cards: KPIComputedCard[] = [
    {
      id: "balance",
      title: "Total Balance",
      value: data.balance.total,
      valueFormat: "currency",
      footerTitle: "",
      footerSubtitle: "",
    },
    {
      id: "savingRate",
      title: "Savings Rate",
      value: data.savingRate.value,
      valueFormat: "percent",
      deltaPercent: data.savingRate.percent,
      footerTitle: "",
      footerSubtitle: "",
    },
    {
      id: "income",
      title: "Monthly Income",
      value: data.income.total,
      valueFormat: "currency",
      deltaPercent: data.income.percent,
      footerTitle: "",
      footerSubtitle: "",
    },
    {
      id: "expense",
      title: "Monthly Expenses",
      value: data.expense.total,
      valueFormat: "currency",
      deltaPercent: data.expense.percent,
      footerTitle: "",
      footerSubtitle: "",
    },
  ]

  function formatValue(value: number, format: KPIComputedCard["valueFormat"]) {
    if (format === "percent") {
      return percentFormatter.format(value)
    }

    return currencyFormatter.format(value)
  }

  function formatDelta(deltaPercent: number) {
    const sign = deltaPercent >= 0 ? "+" : ""

    return `${sign}${percentFormatter.format(deltaPercent)}`
  }

  return (
    <div className="grid h-full min-h-0 auto-rows-fr grid-cols-1 gap-3 sm:grid-cols-2">
      {cards.map((card) => {
        const hasDelta = typeof card.deltaPercent === "number"
        const isPositive = (card.deltaPercent ?? 0) >= 0
        const Icon = isPositive ? IconTrendingUp : IconTrendingDown
        const iconColor = isPositive ? "text-[var(--emerald-300)]" : "text-[var(--red-300)]"
        const tone: KPITone = card.id === "balance"
          ? (card.value >= 0 ? "positive" : "negative")
          : isPositive
            ? "positive"
            : "negative"
        const copy = getCopy(card.id, tone, 0)

        return (
          <Card
            key={card.id}
            className="flex h-full min-h-0 flex-col gap-3 overflow-hidden bg-transparent py-4"
          >
            <CardHeader className="gap-1 px-4">
              <CardDescription>{card.title}</CardDescription>

              <CardTitle className="text-2xl font-semibold tabular-nums xl:text-3xl">
                {formatValue(card.value, card.valueFormat)}
              </CardTitle>

              {hasDelta ? (
                <CardAction>
                  <Badge variant="outline">
                    <Icon className={`size-4 ${iconColor}`} />
                    {formatDelta(card.deltaPercent ?? 0)}
                  </Badge>
                </CardAction>
              ) : null}
            </CardHeader>

            <CardFooter className="mt-auto flex-col items-start gap-1 px-4 text-xs text-muted-foreground sm:text-sm">
              <div className="flex gap-2 font-medium">
                {copy.title}
              </div>
              <div className="text-muted-foreground">
                {copy.subtitle}
              </div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
