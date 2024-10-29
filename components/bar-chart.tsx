"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A multiple bar chart";

const chartData = [
  { month: "January", family: 186, lawn: 80, columbary: 10, apartment: 9 },
  { month: "February", family: 305, lawn: 200, columbary: 78, apartment: 12 },
  { month: "March", family: 237, lawn: 120, columbary: 76, apartment: 4 },
  { month: "April", family: 73, lawn: 190, columbary: 87, apartment: 6 },
  { month: "May", family: 209, lawn: 130, columbary: 17, apartment: 95 },
  { month: "June", family: 214, lawn: 140, columbary: 100, apartment: 83 },
];

const chartConfig = {
  family: {
    label: "Family",
    color: "hsl(var(--chart-1))",
  },
  lawn: {
    label: "Lawn",
    color: "hsl(var(--chart-2))",
  },
  columbary: {
    label: "Columbary",
    color: "hsl(var(--chart-2))",
  },
  apartment: {
    label: "Apartment",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function BarChartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Plot</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="family" fill="var(--color-family)" radius={4} />
            <Bar dataKey="lawn" fill="var(--color-lawn)" radius={4} />
            <Bar dataKey="columbary" fill="var(--color-columbary)" radius={4} />
            <Bar dataKey="apartment" fill="var(--color-apartment)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Family lot is increasing more <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing numbers of plot in each category
        </div>
      </CardFooter>
    </Card>
  );
}
