import Breadcrumbs from "@/app/_components/Breadcrumbs";
import PageHeaderWithBack from "@/app/_components/PageHeaderWithBack";
import PageWrapper from "@/app/_components/PageWrapper";
import { BreadcrumbData } from "@/app/utilities/breadcrumb";
import prisma from "@/prisma/db";
import React from "react";
import ClientDetailsCard from "../../_components/ClientDetailsCard";

const EditPage = async ({ params }: { params: { id: string } }) => {
  const death = await prisma.death.findUnique({
    where: {
      id: params.id,
    },
  });
  const breadcrumbsItems: BreadcrumbData[] = [
    { label: "Home", link: "/" },
    { label: "Deaths", link: "/deaths" },
    {
      label: `${death?.firstName} ${death?.lastName}`,
      link: `/deaths/${death?.id}`,
    },
    { label: "Edit", link: `/deaths/${params.id}/edit` },
  ];

  return (
    <PageWrapper>
      <Breadcrumbs data={breadcrumbsItems} />
      <PageHeaderWithBack
        title={`Update ${death?.firstName} ${death?.lastName} details`}
      />
      <div className="grid grid-cols-12">
        <div className="col-span-8"></div>
      </div>
    </PageWrapper>
  );
};

export default EditPage;
