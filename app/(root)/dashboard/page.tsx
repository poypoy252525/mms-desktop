import PageContainer from "@/components/page-container";
import PageHeader from "@/components/page-header";
import PlotPieChart from "@/components/pie-chart";
import RecentAddedDeceasedCard from "@/components/recent-added-deceased-card";
import SummaryCard from "@/components/ui/summary-card";
import prisma from "@/prisma/db";
import { HeartOff, MapPinHouse, Users } from "lucide-react";

const getChartData = async () => {
  const numberOfLawnLot = await prisma.burial.count({
    where: { type: "LAWN_LOT" },
  });
  const numberOfApartment = await prisma.burial.count({
    where: { type: "APARTMENT" },
  });
  const numberOfColumbarium = await prisma.burial.count({
    where: { type: "COLUMBARIUM" },
  });
  const numberOfFamilyLot = await prisma.burial.count({
    where: { type: "FAMILY_LOT" },
  });

  return [
    { plot: "family", number: numberOfFamilyLot, fill: "var(--color-family)" },
    { plot: "lawn", number: numberOfLawnLot, fill: "var(--color-lawn)" },
    {
      plot: "apartment",
      number: numberOfApartment,
      fill: "var(--color-apartment)",
    },
    {
      plot: "columbarium",
      number: numberOfColumbarium,
      fill: "var(--color-columbarium)",
    },
  ];
};

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
      icon: <HeartOff className="w-4 h-4 text-muted-foreground" />,
      value: `+${numberOfDeceased}`,
    },
    {
      title: "Total Plot",
      description: "overall amount of plot record",
      icon: <MapPinHouse className="w-4 h-4 text-muted-foreground" />,
      value: `+${numberOfBurials}`,
    },
    {
      title: "Total Owners",
      description: "overall amount of owners",
      icon: <Users className="w-4 h-4 text-muted-foreground" />,
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
          <PlotPieChart chartData={await getChartData()} />
        </div>
        <div className="col-span-5">
          <RecentAddedDeceasedCard />
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
