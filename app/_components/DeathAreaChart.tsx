"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import DateRangePicker from "./DateRangePicker";

const chartDat = [
  {
    date: "10-21-2024",
    count: 10,
  },
  {
    date: "10-24-2024",
    count: 11,
  },
  {
    date: "10-26-2024",
    count: 6,
  },
];

const chartConfig = {
  count: {
    label: "Death",
    color: "#2563eb",
  },
} satisfies ChartConfig;

const dateFormatter = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

interface SchemaType {
  date: Date;
  count: number;
}

const DeathAreaChart = () => {
  const [selectedDate, setSelectedDate] = useState<DateRange>();
  const [chartData, setChartData] = useState<SchemaType[]>();

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedDate) return;
      try {
        const { data: noOfDeathByDate } = await axios.post<SchemaType[]>(
          `/api/deaths/date-by-deaths`,
          selectedDate
        );
        console.log(noOfDeathByDate);
        setChartData(noOfDeathByDate);
      } catch (error) {
        if (error instanceof AxiosError) console.log(error.response?.data);
      }
    };
    fetchData();
  }, [selectedDate]);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="font-semibold leading-none tracking-tight">
            Death records
          </h3>
          <DateRangePicker onChangeDate={(value) => setSelectedDate(value)} />
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <AreaChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => dateFormatter(value)}
            />
            <YAxis tickLine={false} tickMargin={10} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
              labelFormatter={(value) => dateFormatter(value)}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Area
              dot={false}
              dataKey="count"
              type="linear"
              fill="var(--color-count)"
              fillOpacity={0.4}
              stroke="var(--color-count)"
              radius={4}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DeathAreaChart;
