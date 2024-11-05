"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

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
import prisma from "@/prisma/db";

export const description = "A donut chart with text";

const chartConfig = {
  number: {
    label: "Number",
  },
  family: {
    label: "Family",
    color: "hsl(var(--chart-1))",
  },
  lawn: {
    label: "Lawn",
    color: "hsl(var(--chart-2))",
  },
  apartment: {
    label: "Apartment",
    color: "hsl(var(--chart-3))",
  },
  columbarium: {
    label: "Columbarium",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

const PlotPieChart = ({
  chartData,
}: {
  chartData: { plot: string; number: number; fill: string }[];
}) => {
  const totalPlot = chartData.reduce((acc, curr) => acc + curr.number, 0);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Plot</CardTitle>
        <CardDescription>All time record</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="number"
              nameKey="plot"
              innerRadius={60}
              strokeWidth={5}
            >
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
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalPlot.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Plots
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Plot is increasing more <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total plots All time
        </div>
      </CardFooter>
    </Card>
  );
};

export default PlotPieChart;
