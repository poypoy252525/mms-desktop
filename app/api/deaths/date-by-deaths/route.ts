import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { from, to } = await request.json();

  if (!from || !to)
    return NextResponse.json("Date range is required.", { status: 400 });

  const deaths = await prisma.death.findMany({
    where: {
      dateOfDeath: {
        gte: new Date(from),
        lte: new Date(to),
      },
    },
  });

  const groupedByDate = deaths.reduce((acc, death) => {
    const date = new Date(death.dateOfDeath);
    date.setHours(0, 0, 0, 0);
    const key = date.toLocaleDateString("en-US");

    if (!acc[key]) acc[key] = 0;

    acc[key]++;
    return acc;
  }, {} as Record<string, number>);

  let deathCount = Object.entries(groupedByDate).map(([date, count]) => ({
    date,
    count,
  }));

  if (!deathCount)
    return NextResponse.json("Failed to fetch data", { status: 400 });

  const generateDateRange = (from: Date, to: Date): string[] => {
    const dates: string[] = [];
    let currentDate = new Date(from);

    while (currentDate <= to) {
      dates.push(new Date(currentDate).toLocaleDateString("en-US"));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const dates = generateDateRange(new Date(from), new Date(to));

  const allDates = dates.map((date) => {
    const d = deathCount.find((d) => d.date === date);

    return {
      date,
      count: d?.count || 0,
    };
  });

  return NextResponse.json(allDates, { status: 200 });
};
