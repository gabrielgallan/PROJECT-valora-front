"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A savings current month progress chart";

const monthProgressChartConfig = {
  savings: {
    label: "Savings",
    color: "var(--theme-300)",
  },
} satisfies ChartConfig;

interface MonthProgressChartProps {
  data: {
    date: string;
    savings: number;
  }[];
  month: string;
}

export function MonthProgressChart({ data, month }: MonthProgressChartProps) {
  return (
    <Card className="flex h-full min-h-0 flex-col overflow-hidden bg-transparent py-4">
      <CardHeader className="gap-1 px-4 pb-0">
        <CardTitle>Month savings progress</CardTitle>
        <CardDescription>{month}</CardDescription>
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 px-4 pb-4">
        {/* <ChartContainer
                    config={monthProgressChartConfig}
                    className="h-full w-full"
                >
                    <BarChart accessibilityLayer data={data}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Bar
                            dataKey="savings"
                            fill="var(--color-savings)"
                            radius={15}
                        />
                    </BarChart>
                </ChartContainer> */}
        <ChartContainer
          config={monthProgressChartConfig}
          className="h-full w-full !aspect-auto"
        >
          <AreaChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
              interval="preserveStartEnd"
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillSavings" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-savings)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-savings)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="savings"
              type="linear"
              fill="url(#fillSavings)"
              fillOpacity={0.4}
              stroke="var(--color-savings)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
        {/* <ChartContainer
                    config={monthProgressChartConfig}
                    className="h-full w-full"
                    >
                    <LineChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value}
                            interval="preserveStartEnd"
                        />
                        <ChartTooltip content={<ChartTooltipContent/>}
                        />
                        <Line
                        dataKey="savings"
                        type="monotone"
                        stroke="var(--purple-500)"
                        strokeWidth={2}
                        dot={false}
                        />
                    </LineChart>
                    </ChartContainer> */}
      </CardContent>
    </Card>
  );
}
