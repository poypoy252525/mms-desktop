import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { BreadcrumbData } from "../utilities/breadcrumb";
import React from "react";

interface Props {
  data: BreadcrumbData[];
}

const isLastElement = <T,>(array: T[], element: T): boolean => {
  return array.indexOf(element) !== array.length - 1;
};

const Breadcrumbs = ({ data }: Props) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <Link href={item.link} legacyBehavior>
                {isLastElement(data, item) ? (
                  <BreadcrumbLink>{item.label}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                )}
              </Link>
            </BreadcrumbItem>
            {isLastElement(data, item) && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
