import React, { useEffect } from "react";
import PageHeading from "../_components/PageHeading";
import { DataTable } from "../_components/DataTable";
import { columns } from "./Columns";
import { Death } from "@prisma/client";
import PageWrapper from "../_components/PageWrapper";
import prisma from "@/prisma/db";

const DeathsPage = async () => {
  const getData = async (): Promise<Death[]> => {
    return prisma.death.findMany();
  };

  let data;
  try {
    data = await getData();
  } catch (error) {
    return "Failed to fetch data from database (death collection)";
  }

  return (
    <PageWrapper>
      <PageHeading>Death Records</PageHeading>
      <DataTable filterColumn="firstName" columns={columns} data={data} />
    </PageWrapper>
  );
};

export default DeathsPage;
