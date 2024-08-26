"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListFilter } from "lucide-react";
import { FilterDateType, isFilterDateType } from "../page";
import { useRouter } from "next/navigation";

const FilterRecordDropdown = ({
  defaultValue,
}: {
  defaultValue: FilterDateType;
}) => {
  const router = useRouter();
  const [position, setPosition] = React.useState<FilterDateType>(defaultValue);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <ListFilter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={position}
          onValueChange={(value) => {
            if (isFilterDateType(value) && value !== "") {
              setPosition(value as FilterDateType);
              router.push(`/deaths?filterBy=${value}`);
            } else {
              setPosition("");
              router.push(`/deaths`);
            }
          }}
        >
          <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="TODAY">Today</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="WEEK">
            Last 7 days
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="MONTH">
            Last 30 days
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterRecordDropdown;
