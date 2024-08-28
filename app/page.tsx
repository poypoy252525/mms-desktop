import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Receipt, Users, UserX } from "lucide-react";
import DeathAreaChart from "./_components/DeathAreaChart";
import InformationCard, { BriefInfo } from "./_components/InformationCard";
import PageHeading from "./_components/PageHeading";
import PageWrapper from "./_components/PageWrapper";
import { Suspense } from "react";

const briefInfos: BriefInfo[] = [
  {
    title: "Total Users",
    description: "+8% users last month",
    icon: <Users className="w-4 h-4 text-muted-foreground" />,
    value: "+3,219",
  },
  {
    title: "Total Deaths",
    description: "+2% new records last month",
    icon: <UserX className="w-4 h-4 text-muted-foreground" />,
    value: "+120",
  },
  {
    title: "Paid bills",
    description: "+10% bill last month",
    icon: <Receipt className="w-4 h-4 text-muted-foreground" />,
    value: "+32,201",
  },
  {
    title: "Total Users",
    description: "+12 users last month",
    icon: <Users className="w-4 h-4 text-muted-foreground" />,
    value: "100",
  },
];

const HomePage = async () => {
  return (
    <PageWrapper>
      <PageHeading>Dashboard</PageHeading>
      <Suspense fallback={<p>loading...</p>}>
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
            <Card>
              <CardHeader>
                <CardTitle>Stats</CardTitle>
                <CardDescription>Lorem ipsum dolor sit amet.</CardDescription>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          </div>
        </div>
      </Suspense>
    </PageWrapper>
  );
};

export const dynamic = "force-dynamic";

export default HomePage;
