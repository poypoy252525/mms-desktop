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
import { Death } from "@prisma/client";

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

const CustomBarChart = ({ chartData }: { chartData: Death[] }) => {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <AreaChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="dateCreated"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) =>
            new Date(value).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
          }
        />
        <YAxis tickLine={false} tickMargin={10} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Area
          dot={false}
          dataKey="nextOfKinContact"
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
