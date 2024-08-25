import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, UserX } from "lucide-react";
import DeathAreaChart from "./_components/DeathAreaChart";
import InformationCard, { BriefInfo } from "./_components/InformationCard";
import PageHeading from "./_components/PageHeading";
import PageWrapper from "./_components/PageWrapper";

const briefInfos: BriefInfo[] = [
  {
    title: "Total Users",
    description: "+12 users last month",
    icon: <Users className="w-4 h-4 text-muted-foreground" />,
    value: "100 Users",
  },
  {
    title: "Total Deaths",
    description: "+12 users last month",
    icon: <UserX className="w-4 h-4 text-muted-foreground" />,
    value: "120 Deaths",
  },
  {
    title: "Total Users",
    description: "+12 users last month",
    icon: <Users className="w-4 h-4 text-muted-foreground" />,
    value: "100 Users",
  },
  {
    title: "Total Users",
    description: "+12 users last month",
    icon: <Users className="w-4 h-4 text-muted-foreground" />,
    value: "100 Users",
  },
];

const HomePage = async () => {
  return (
    <PageWrapper>
      <PageHeading>Dashboard</PageHeading>
      <div className="grid grid-cols-12 gap-4">
        {briefInfos.map((item, index) => (
          <div key={index} className="col-span-3">
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
          <Card>
            <CardHeader>
              <CardTitle>Stats</CardTitle>
              <CardDescription>Lorem ipsum dolor sit amet.</CardDescription>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
};

export const dynamic = "force-dynamic";

export default HomePage;
