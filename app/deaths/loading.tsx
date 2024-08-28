import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageWrapper from "../_components/PageWrapper";
import { BreadcrumbData } from "../utilities/breadcrumb";
import DeathTableSkeleton from "./_components/DeathTableSkeleton";

const breadcrumbItems: BreadcrumbData[] = [
  { label: "Home", link: "/" },
  { label: "Deaths", link: "/deaths" },
];

const Loading = async () => {
  return (
    <PageWrapper>
      <Skeleton className="w-[200px] h-[16px]" />
      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>
          <div className="flex space-x-4">
            <Skeleton className="h-8 rounded-md px-3 w-16" />
            <Skeleton className="h-8 rounded-md px-3 w-20" />
          </div>
        </div>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="w-[120px] h-[20px]" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="w-[200px] h-[16px]" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Skeleton className="w-[300px] my-2 h-10" />
              <DeathTableSkeleton />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageWrapper>
  );
};

export default Loading;
