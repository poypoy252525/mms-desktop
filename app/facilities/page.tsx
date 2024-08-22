import React from "react";
import PageWrapper from "../_components/PageWrapper";
import PageHeading from "../_components/PageHeading";

const FacilitiesPage = () => {
  return (
    <PageWrapper>
      <PageHeading>Facilities</PageHeading>
      <p className="text-lg font-semibold">AA</p>
      <div className="flex overflow-auto w-full space-x-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((a, index) => (
          <div key={index} className="h-20 w-20 bg-slate-500 flex-shrink-0">
            {`A${a}`}
          </div>
        ))}
      </div>
      <p className="text-lg font-semibold">AB</p>
      <div className="flex overflow-auto w-full space-x-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((a, index) => (
          <div key={index} className="h-20 w-20 bg-slate-500 flex-shrink-0">
            {`A${a}`}
          </div>
        ))}
      </div>
    </PageWrapper>
  );
};

export default FacilitiesPage;
