import React, { ReactNode } from "react";

const PageContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container mx-auto max-w-screen-lg py-4">
      <div className="py-4">{children}</div>
    </div>
  );
};

export default PageContainer;
