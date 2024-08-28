import PageWrapper from "@/app/_components/PageWrapper";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import BackButton from "../_components/BackButton";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Loading = () => {
  return (
    <PageWrapper>
      <Skeleton className="w-32 h-4" />
      <div className="flex items-start">
        <BackButton />
        <div className="flex flex-col space-y-2">
          <Skeleton className="w-28 h-6" />
          <Skeleton className="w-20 h-4" />
        </div>
      </div>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="relatives">Relatives</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <Skeleton className="w-24 h-6" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-12 gap-2">
                {[0, 1, 2, 3].map((item) => (
                  <React.Fragment key={item}>
                    <div className="col-span-3">
                      <Skeleton className="w-[100px] h-4" />
                    </div>
                    <div className="col-span-9">
                      <Skeleton className="w-[200px] h-4" />
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageWrapper>
  );
};

export default Loading;
