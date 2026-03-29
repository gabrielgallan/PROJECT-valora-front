"use client"

import { PolarGrid, RadialBar, RadialBarChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"

export const description = "A radial chart"

interface CategoriesRadialChartProps {
    data: {
        category: string
        balance: number
        fill: string
    }[]
    month: string
}

const generateChartConfig = (data: CategoriesRadialChartProps['data']): ChartConfig => {
    return data.reduce((acc, item) => {
        acc[item.category] = {
            label: item.category[0].toUpperCase() + item.category.slice(1),
            color: item.fill
        }
        return acc
    }, {} as ChartConfig)
}

export function CategoriesRadialChart({ data, month }: CategoriesRadialChartProps) {
    const chartConfig = generateChartConfig(data)

    return (
        <Card className="flex h-full min-h-0 flex-col overflow-visible bg-transparent py-4">

            <CardHeader className="items-center gap-1 px-4 pb-0 bg-transparent">
                <CardTitle>Savings by categories</CardTitle>
                <CardDescription>{month}</CardDescription>
            </CardHeader>

            <CardContent className="flex min-h-0 flex-1 items-center justify-center px-4 pb-4">
                <ChartContainer
                    config={chartConfig}
                    className="h-full w-full !aspect-auto"
                >
                    <RadialBarChart
                        data={data}
                        innerRadius={30}
                        outerRadius={135}
                        margin={{ top: 0, right: 50, bottom: 0, left: 0 }}
                    >
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel nameKey="category" />}
                        />

                        <PolarGrid gridType="circle" />

                        <RadialBar dataKey="balance" />


                        <ChartLegend
                            content={
                                <ChartLegendContent
                                    nameKey="category"
                                    verticalAlign="bottom"
                                    className="flex-col items-start gap-2"
                                />
                            }
                        />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>

            {/* <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>

                <div className="leading-none text-muted-foreground">
                    Showing total savings by categories for the last month
                </div>
            </CardFooter> */}

        </Card>
    )
}
