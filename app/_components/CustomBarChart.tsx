"use client";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart";

const chartData = [
  { month: "January", paid: 186, newEntry: 80 },
  { month: "February", paid: 305, newEntry: 200 },
  { month: "March", paid: 237, newEntry: 120 },
  { month: "April", paid: 73, newEntry: 190 },
  { month: "May", paid: 209, newEntry: 130 },
  { month: "June", paid: 214, newEntry: 140 },
  { month: "July", paid: 128, newEntry: 77 },
  { month: "August", paid: 68, newEntry: 319 },
  { month: "September", paid: 28, newEntry: 58 },
  { month: "October", paid: 199, newEntry: 18 },
  { month: "November", paid: 58, newEntry: 79 },
  { month: "December", paid: 35, newEntry: 42 },
];

const chartConfig = {
  paid: {
    label: "Paid",
    color: "#2563eb",
  },
  newEntry: {
    label: "New entry",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const CustomBarChart = () => {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <AreaChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis tickLine={false} tickMargin={10} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Area
          dot={false}
          dataKey="newEntry"
          type="linear"
          fill="var(--color-newEntry)"
          fillOpacity={0.3}
          stroke="var(--color-newEntry)"
          radius={4}
        />
        <Area
          dot={false}
          dataKey="paid"
          type="linear"
          fill="var(--color-newEntry)"
          fillOpacity={0.3}
          stroke="var(--color-paid)"
          radius={4}
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default CustomBarChart;
