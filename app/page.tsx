import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DeathAreaChart from "./_components/DeathAreaChart";
import PageHeading from "./_components/PageHeading";
import PageWrapper from "./_components/PageWrapper";
import prisma from "@/prisma/db";
import DateRangePicker from "./_components/DateRangePicker";

const HomePage = async () => {
  const deaths = await prisma.death.findMany({});

  return (
    <PageWrapper>
      <PageHeading>Dashboard</PageHeading>
      <div className="grid grid-cols-12 gap-4">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="col-span-3">
            <Card>
              <CardContent>
                <p>Ano lalagay?</p>
              </CardContent>
            </Card>
          </div>
        ))}
        <div className="col-span-7">
          <DeathAreaChart />
        </div>
      </div>
    </PageWrapper>
  );
};

export const dynamic = "force-dynamic";

export default HomePage;
