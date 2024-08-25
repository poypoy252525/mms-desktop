import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CustomBarChart from "./_components/CustomBarChart";
import PageHeading from "./_components/PageHeading";
import PageWrapper from "./_components/PageWrapper";
import prisma from "@/prisma/db";

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
                <p></p>
              </CardContent>
            </Card>
          </div>
        ))}
        <div className="col-span-7">
          <Card>
            <CardHeader>
              <h3 className="font-semibold leading-none tracking-tight">
                Death records
              </h3>
            </CardHeader>
            <CardContent>
              <CustomBarChart chartData={deaths} />
            </CardContent>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
};

export default HomePage;
