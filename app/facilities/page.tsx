import React from "react";
import PageWrapper from "../_components/PageWrapper";
import PageHeading from "../_components/PageHeading";

const FacilitiesPage = () => {
  return (
    <PageWrapper>
      <PageHeading>Facilities</PageHeading>
      <div className="grid grid-cols-6 gap-4"></div>
    </PageWrapper>
  );
};

export default FacilitiesPage;
