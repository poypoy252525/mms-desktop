"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { CaretSortIcon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { useState } from "react";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "./dropdown-menu";
import { Input } from "./input";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const [filterBy, setFilterBy] = useState<string>(table.getAllColumns()[0].id);
  return (
    <div className="flex items-center">
      <div className="flex items-center space-x-4">
        <Input
          placeholder={`Filter by ${filterBy}...`}
          value={(table.getColumn(filterBy)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(filterBy)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <FilterByDropdown
          table={table}
          value={filterBy}
          onSelect={(value) => {
            setFilterBy(value);
            table
              .getAllColumns()
              .forEach((column) => column.setFilterValue(""));
          }}
        />
      </div>
      <ViewDropdown table={table} />
    </div>
  );
}

interface FilterByProps<TData> {
  table: Table<TData>;
  value: string;
  onSelect: (value: string) => void;
}

const FilterByDropdown = <TData,>({
  table,
  onSelect,
  value,
}: FilterByProps<TData>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="hidden h-8 lg:flex">
          {`Filter by: ${value}`}
          <CaretSortIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuRadioGroup
          defaultValue={"name"}
          value={value}
          onValueChange={onSelect}
        >
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide()
            )
            .map((column) => {
              return (
                <DropdownMenuRadioItem
                  key={column.id}
                  className="capitalize"
                  value={column.id}
                >
                  {column.id}
                </DropdownMenuRadioItem>
              );
            })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ViewDropdown = <TData,>({ table }: { table: Table<TData> }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="outline"
        size="sm"
        className="ml-auto hidden h-8 lg:flex"
      >
        <MixerHorizontalIcon className="mr-2 h-4 w-4" />
        View
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-[150px]">
      <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {table
        .getAllColumns()
        .filter(
          (column) =>
            typeof column.accessorFn !== "undefined" && column.getCanHide()
        )
        .map((column) => {
          return (
            <DropdownMenuCheckboxItem
              key={column.id}
              className="capitalize"
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(!!value)}
            >
              {column.id}
            </DropdownMenuCheckboxItem>
          );
        })}
    </DropdownMenuContent>
  </DropdownMenu>
);
