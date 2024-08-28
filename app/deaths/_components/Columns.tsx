"use client";

import { Death } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import ColumnDefActions from "./ColumnDefActions";
import Link from "next/link";

export const columns: ColumnDef<Death>[] = [
  {
    id: "name",
    header: "Name",
    cell: ({ row: { original: death } }) => (
      <Link href={`/deaths/${death.id}`}>
        <p>{`${death.firstName} ${death.lastName}`}</p>
      </Link>
    ),
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
