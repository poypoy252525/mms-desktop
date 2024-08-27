import React, { ReactNode } from "react";

const PageHeading = ({ children }: { children: ReactNode }) => {
  return <h1 className="text-xl font-semibold tracking-tight">{children}</h1>;
};

export default PageHeading;
