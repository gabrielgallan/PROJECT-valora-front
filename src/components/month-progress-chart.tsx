"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import React from "react";

interface MonthProgressCharData {
  date: number
  savings: number
}

interface MonthProgressChartProps {
  data: MonthProgressCharData[];
  month: string;
}

export const description = "A savings current month progress chart";

const monthProgressChartConfig = {
  savings: {
    label: "Savings",
    color: "var(--theme-300)",
  },
} satisfies ChartConfig;

const mockData = [
  { date: "April 2025", savings: 560 },
  { date: "May 2025", savings: 590 },
  { date: "June 2025", savings: 620 },
  { date: "July 2025", savings: 850 },
  { date: "August 2025", savings: 690 },
  { date: "September 2025", savings: 780 },
  { date: "October 2025", savings: 640 },
  { date: "November 2025", savings: 700 },
  { date: "December 2025", savings: 980 },
  { date: "January 2026", savings: 720 },
  { date: "February 2026", savings: 610 },
  { date: "March 2026", savings: 540 },
];

export function MonthProgressChart() {
  const [timeRange, setTimeRange] = React.useState("6")

  let filteredData = mockData

  if (timeRange === "3") {
    filteredData = mockData.slice(9, 12)
  } else if (timeRange === "6") {
    filteredData = mockData.slice(6, 12)
  }

  function makeCardTitle(timeRange: string) {
    switch (timeRange) {
      case '3': return 'Last 3 months savings progress'
      case '6': return 'Last 6 months savings progress'
      case '12': return 'Last year savings progress'
    }
  }

  function makeCardDescription(timeRange: string) {
    switch (timeRange) {
      case '3': return 'Last 3 months savings progress'
      case '6': return 'Last 6 months savings progress'
      case '12': return 'Last year savings progress'
    }
  }

  return (
    <Card className="flex h-full min-h-0 flex-col overflow-hidden bg-transparent py-4">
      <CardHeader className="flex gap-1 px-4 pb-0">
        <div className="flex flex-col gap-2">
          <CardTitle>Savings progress</CardTitle>
          <CardDescription>{makeCardDescription(timeRange)}</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="bg-transparent hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Selnaturalect a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="12" className="rounded-lg">
              Last 12 months
            </SelectItem>
            <SelectItem value="6" className="rounded-lg">
              Last 6 months
            </SelectItem>
            <SelectItem value="3" className="rounded-lg">
              Last 3 months
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 px-4 pb-4">
        <ChartContainer
          config={monthProgressChartConfig}
          className="h-full w-full !aspect-auto"
        >
          <AreaChart data={filteredData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={true}
              axisLine={true}
              tickMargin={20}
              tickFormatter={(value) => {
                const [month, year] = value.split(' ')

                return `${month.slice(0, 3)} ${year.slice(2, 4)}`
              }}
              interval="preserveStartEnd"
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickCount={5}
              orientation="left"
              width={40}
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
              type="monotone"
              fill="url(#fillSavings)"
              fillOpacity={0.4}
              stroke="var(--color-savings)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}