"use client";

import { Death } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import ColumnDefActions from "./ColumnDefActions";

export const columns: ColumnDef<Death>[] = [
  {
    accessorKey: "firstName",
    header: "First name",
  },
  {
    accessorKey: "lastName",
    header: "Last name",
  },
  {
    accessorKey: "causeOfDeath",
    header: "Cause of Death",
  },
  {
    id: "actions",
    cell: ({ row: { original: death } }) => <ColumnDefActions death={death} />,
  },
];
