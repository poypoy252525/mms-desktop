import React, { ReactNode } from "react";

const PageHeader = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-between items-center text-2xl font-semibold mb-4">
      {children}
    </div>
  );
};

export default PageHeader;
