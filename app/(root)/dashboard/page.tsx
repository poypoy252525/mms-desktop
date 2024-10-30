import { BarChartComponent } from "@/components/bar-chart";
import PageContainer from "@/components/page-container";
import PageHeader from "@/components/page-header";
import RecentAddedDeceasedCard from "@/components/recent-added-deceased-card";
import SummaryCard from "@/components/ui/summary-card";
import prisma from "@/prisma/db";
import { Users, UserX } from "lucide-react";
import React from "react";

const Dashboard = async () => {
  const numberOfUser = await prisma.user.count();
  const numberOfDeceased = await prisma.deceased.count();
  const numberOfBurials = await prisma.burial.count();
  const numberOfOwners = await prisma.owner.count();
  const briefInfos = [
    {
      title: "Total Users",
      description: "overall amount of users",
      icon: <Users className="w-4 h-4 text-muted-foreground" />,
      value: `+${numberOfUser}`,
    },
    {
      title: "Total Deceased",
      description: "overall amount of death record",
      icon: <UserX className="w-4 h-4 text-muted-foreground" />,
      value: `+${numberOfDeceased}`,
    },
    {
      title: "Total Plot",
      description: "overall amount of plot record",
      icon: <UserX className="w-4 h-4 text-muted-foreground" />,
      value: `+${numberOfBurials}`,
    },
    {
      title: "Total Owners",
      description: "overall amount of owners",
      icon: <UserX className="w-4 h-4 text-muted-foreground" />,
      value: `+${numberOfOwners}`,
    },
  ];
  return (
    <PageContainer>
      <PageHeader>
        <span>Dashboard</span>
      </PageHeader>
      <div className="grid grid-cols-12 gap-4">
        {briefInfos.map((info, index) => (
          <div key={index} className="col-span-3">
            <SummaryCard
              title={info.title}
              description={info.description}
              icon={info.icon}
              value={info.value}
            />
          </div>
        ))}
        <div className="col-span-7">
          <BarChartComponent />
        </div>
        <div className="col-span-5">
          <RecentAddedDeceasedCard />
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
