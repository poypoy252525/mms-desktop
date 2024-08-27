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
        {data.map((item) => (
          <>
            <BreadcrumbItem key={item.link}>
              <Link href={item.link} legacyBehavior>
                {isLastElement(data, item) ? (
                  <BreadcrumbLink>{item.label}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                )}
              </Link>
            </BreadcrumbItem>
            {isLastElement(data, item) && <BreadcrumbSeparator />}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
