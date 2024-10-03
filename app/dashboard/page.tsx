import prisma from "@/prisma/db";
import { UserCheck, UserRoundMinus, Users, UserX } from "lucide-react";
import DeathAreaChart from "../_components/DeathAreaChart";
import InformationCard, { BriefInfo } from "../_components/InformationCard";
import PageHeading from "../_components/PageHeading";
import PageWrapper from "../_components/PageWrapper";
import RecentDataCard from "../_components/RecentDataCard";

const HomePage = async () => {
  const numberOfUser = await prisma.user.count();
  const numberOfDeath = await prisma.death.count();
  const numberOfActive = await prisma.death.count({
    where: { status: "ACTIVE" },
  });
  const numberOfInactive = await prisma.death.count({
    where: { status: "INACTIVE" },
  });
  const briefInfos: BriefInfo[] = [
    {
      title: "Total Users",
      description: "overall amount of users",
      icon: <Users className="w-4 h-4 text-muted-foreground" />,
      value: `+${numberOfUser}`,
    },
    {
      title: "Total Deaths",
      description: "overall amount of death record",
      icon: <UserX className="w-4 h-4 text-muted-foreground" />,
      value: `+${numberOfDeath}`,
    },
    {
      title: "Active",
      description: "numbers of currently buried",
      icon: <UserCheck className="w-4 h-4 text-muted-foreground" />,
      value: `+${numberOfActive}`,
    },
    {
      title: "Inactive",
      description: "number of out of burials",
      icon: <UserRoundMinus className="w-4 h-4 text-muted-foreground" />,
      value: `+${numberOfInactive}`,
    },
  ];

  return (
    <PageWrapper>
      <PageHeading>Dashboard</PageHeading>
      <div className="grid grid-cols-12 gap-4">
        {briefInfos.map((item, index) => (
          <div key={index} className=" lg:col-span-6 xl:col-span-3">
            <InformationCard
              description={item.description}
              icon={item.icon}
              title={item.title}
              value={item.value}
            />
          </div>
        ))}
        <div className="col-span-7">
          <DeathAreaChart />
        </div>
        <div className="col-span-5">
          <RecentDataCard />
        </div>
      </div>
    </PageWrapper>
  );
};

export const dynamic = "force-dynamic";

export default HomePage;
