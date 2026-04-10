"use client"

import { TrendingDown, TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"

const chartConfig = {
    transactions: {
        label: "Transactions",
        color: "var(--theme-100)",
    },
} satisfies ChartConfig

export type TransactionsCountRadarChartData = {
    month: string
    transactions: number
}

interface TransactionsCountRadarChartProps {
    data: TransactionsCountRadarChartData[]
}

function clampToPositiveInt(value: number) {
    if (!Number.isFinite(value)) {
        return 0
    }

    return Math.max(0, Math.round(value))
}

export function TransactionsCountRadarChart({ data }: TransactionsCountRadarChartProps) {
    const sourceData = (data && data.length > 0 ? data : data).map((item) => ({
        ...item,
        transactions: clampToPositiveInt(item.transactions),
    }))

    const lastMonth = sourceData[sourceData.length - 1]
    const previousMonth = sourceData[sourceData.length - 2]

    const hasComparison = Boolean(lastMonth && previousMonth)
    const delta = hasComparison ? lastMonth.transactions - previousMonth.transactions : 0
    const deltaPercent = hasComparison && previousMonth.transactions > 0
        ? Math.abs((delta / previousMonth.transactions) * 100)
        : 0

    const isUp = delta > 0
    const isDown = delta < 0

    return (
        <Card className="flex h-full min-h-0 flex-col overflow-hidden bg-transparent py-4">
            <CardHeader className="items-center pb-4">
                <CardTitle>Transactions Count</CardTitle>
                <CardDescription>Monthly distribution for the last 6 months</CardDescription>
            </CardHeader>
            <CardContent className="flex min-h-0 flex-1 px-4 pb-4">
                <ChartContainer
                    config={chartConfig}
                    className="h-full w-full !aspect-auto"
                >
                    <RadarChart data={sourceData}>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <PolarAngleAxis dataKey="month" />
                        <PolarGrid />
                        <Radar
                            dataKey="transactions"
                            fill="var(--color-transactions)"
                            fillOpacity={0}
                            stroke="var(--color-transactions)"
                            strokeWidth={2}
                        />
                    </RadarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">
                    {!hasComparison ? "Insufficient data for trend" : null}
                    {hasComparison && isUp ? `Up ${deltaPercent.toFixed(1)}% vs previous month` : null}
                    {hasComparison && isDown ? `Down ${deltaPercent.toFixed(1)}% vs previous month` : null}
                    {hasComparison && !isUp && !isDown ? "Stable vs previous month" : null}
                    {hasComparison && isUp ? <TrendingUp className="h-4 w-4" /> : null}
                    {hasComparison && isDown ? <TrendingDown className="h-4 w-4" /> : null}
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                    {sourceData[0]?.month} - {sourceData[sourceData.length - 1]?.month}
                </div>
            </CardFooter>
        </Card>
    )
}
