import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import PageWrapper from "../_components/PageWrapper";

const Loading = () => {
  return (
    <PageWrapper>
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-10 w-28" />
      <div className="grid lg:grid-cols-4 xl:grid-cols-6 gap-4 w-full">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => (
          <Skeleton key={item} className="w-full h-24" />
        ))}
      </div>
    </PageWrapper>
  );
};

export default Loading;
