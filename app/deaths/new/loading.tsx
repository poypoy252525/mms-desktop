import PageWrapper from "@/app/_components/PageWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import BackButton from "../../_components/BackButton";

const Loading = async () => {
  return (
    <PageWrapper>
      <Skeleton className="w-[150px] h-4 " />
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BackButton />
            <Skeleton className="w-32 h-8" />
          </div>
          <div className="space-x-4 flex">
            <Skeleton className="w-24 h-8" />
            <Skeleton className="w-24 h-8" />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-8 space-y-4">
            <Skeleton className="w-full h-[220px]" />
            <Skeleton className="w-full h-[220px]" />
          </div>
          <div className="col-span-4">
            <div className="flex flex-col space-y-4 items-end">
              <div className="w-full">
                <Skeleton className="w-full h-[150px]" />
              </div>
              <div className="w-full">
                <Skeleton className="w-full h-[250px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Loading;
