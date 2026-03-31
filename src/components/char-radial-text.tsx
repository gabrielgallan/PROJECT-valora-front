"use client"

import { TrendingUp } from "lucide-react"
import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
} from "recharts"

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
    type ChartConfig,
} from "@/components/ui/chart"

export const description = "A radial chart with text"

const chartData = [
    { month: "march", transactions: 200, fill: "var(--theme-100)" },
]

const chartConfig = {
    transactions: {
        label: "Transctions",
    },
    month: {
        label: "March",
        color: "var(--theme-400)",
    },
} satisfies ChartConfig

export function ChartRadialText() {
    return (
        <Card className="flex h-full min-h-0 flex-col overflow-hidden bg-transparent py-4">
            <CardHeader className="items-center pb-0">
                <CardTitle>Current month - transactions</CardTitle>
                <CardDescription>March 2026</CardDescription>
            </CardHeader>
            <CardContent className="flex min-h-0 flex-1 px-4 pb-4">
                <ChartContainer
                    config={chartConfig}
                    className="h-full w-full !aspect-auto"
                >
                    <RadialBarChart
                        data={chartData}
                        startAngle={0}
                        endAngle={300}
                        outerRadius={90}
                        innerRadius={80}
                    >
                        <PolarGrid
                            gridType="circle"
                            radialLines={false}
                            stroke="none"
                            className="first:fill-muted last:fill-background"
                            polarRadius={[90, 80]}
                        />
                        <RadialBar dataKey="transactions" background cornerRadius={10} />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-4xl font-bold"
                                                >
                                                    {chartData[0].transactions.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Transactions
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}
