"use client";

import { Death } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import ColumnDefActions from "./ColumnDefActions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Death>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        First name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Last name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "causeOfDeath",
    header: "Cause of Death",
  },
  {
    accessorKey: "dateOfDeath",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date of death
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row: { original: death } }) => (
      <p>
        {new Date(death.dateOfDeath).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>
    ),
  },
  {
    id: "actions",
    cell: ({ row: { original: death } }) => <ColumnDefActions death={death} />,
  },
];
