import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import prisma from "@/prisma/db";
import { ReactNode } from "react";
import LeftPanel from "./LeftPanel";
import { ScrollArea } from "@/components/ui/scroll-area";

const RightPanel = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col h-full overflow-hidden">
    <div className="h-[50px] border-b border-border flex items-center px-4">
      Request Form
    </div>
    <div className="flex-1 overflow-hidden">
      <ScrollArea className="h-full">{children}</ScrollArea>
    </div>
  </div>
);

const RequestLayout = async ({ children }: { children: ReactNode }) => {
  const groupRequests = await prisma.request.groupBy({
    by: ["userId"],
  });

  const requests = await prisma.request.findMany({
    include: {
      user: true,
    },
  });

  return (
    <div className="bg-background h-full">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel
          defaultSize={25}
          minSize={15}
          maxSize={40}
          className="h-full"
        >
          <LeftPanel requests={requests} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75} className="h-full">
          <RightPanel>{children}</RightPanel>
        </ResizablePanel>
      </ResizablePanelGroup>
      {/* <LeftPanel requests={requests} /> */}
    </div>
  );
};

export default RequestLayout;
