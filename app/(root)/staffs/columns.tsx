"use client";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Staff } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Staff>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "fingerprintId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fingerprint ID" />
    ),
  },
];
