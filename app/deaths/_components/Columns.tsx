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
    accessorKey: "dateOfDeath",
    header: "Date of death",
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
