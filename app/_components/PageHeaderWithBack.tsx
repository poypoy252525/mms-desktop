import React from "react";
import PageHeading from "./PageHeading";
import BackButton from "./BackButton";

interface Props {
  title: string;
}

const PageHeaderWithBack = ({ title }: Props) => {
  return (
    <div className="flex items-center">
      <BackButton />
      <PageHeading>{title}</PageHeading>
    </div>
  );
};

export default PageHeaderWithBack;
