import { ScrollArea } from "@/components/ui/scroll-area";
import React, { ReactNode } from "react";

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ScrollArea className="h-full">
      <div className="flex flex-1 flex-col gap-6 lg:container max-w-screen-lg py-6">
        {children}
      </div>
    </ScrollArea>
  );
};

export default PageWrapper;
