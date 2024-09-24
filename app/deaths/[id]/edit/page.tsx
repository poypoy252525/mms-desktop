"use client";
import Breadcrumbs from "@/app/_components/Breadcrumbs";
import PageHeaderWithBack from "@/app/_components/PageHeaderWithBack";
import PageWrapper from "@/app/_components/PageWrapper";
import { BreadcrumbData } from "@/app/utilities/breadcrumb";
import prisma from "@/prisma/db";
import EditForm from "./EditForm";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Death } from "@prisma/client";
import axios from "axios";

const EditPage = ({ params }: { params: { id: string } }) => {
  const [death, setDeath] = useState<Death>();

  useEffect(() => {
    const fetch = async () => {
      const { data: death } = await axios.get<Death>(
        `/api/deaths/${params.id}`
      );
      if (death) setDeath(death);
    };
    fetch();
  }, [params.id]);

  const breadcrumbsItems: BreadcrumbData[] = [
    { label: "Home", link: "/" },
    { label: "Deaths", link: "/deaths" },
    {
      label: `${death?.firstName} ${death?.lastName}`,
      link: `/deaths/${death?.id}`,
    },
    { label: "Edit", link: `/deaths/${params.id}/edit` },
  ];
  const formRef = useRef<HTMLFormElement | null>(null);

  if (!death) return "404 not found";

  return (
    <PageWrapper>
      <Breadcrumbs data={breadcrumbsItems} />
      <div className="flex items-center justify-between">
        <PageHeaderWithBack
          title={`Update ${death?.firstName} ${death?.lastName}`}
        />
        <div>
          <Button
            onClick={() => formRef.current?.requestSubmit()}
            type="submit"
            size="sm"
          >
            Save changes
          </Button>
        </div>
      </div>
      <EditForm death={death} formRef={formRef} />
    </PageWrapper>
  );
};

export default EditPage;
