import { Skeleton } from "@/components/ui/skeleton";
import PageHeading from "./_components/PageHeading";
import PageWrapper from "./_components/PageWrapper";

const Loading = () => {
  return (
    <PageWrapper>
      <PageHeading>Dashboard</PageHeading>

      <div className="grid grid-cols-12 gap-4">
        {[0, 1, 2, 3].map((item, index) => (
          <div key={index} className=" lg:col-span-6 xl:col-span-3">
            <Skeleton className="h-[110px] w-full" />
          </div>
        ))}
        <div className="col-span-7">
          <Skeleton className="h-[300px] w-full" />
        </div>
        <div className="col-span-5">
          <Skeleton className="h-[300px] w-full" />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Loading;
