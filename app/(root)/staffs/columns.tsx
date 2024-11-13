"use client";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Staff } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<Staff>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ getValue, row }) => {
      const name = getValue() as string;
      return (
        <Link href={`/staffs/${row.original.id}`}>
          <Button variant="link">{name}</Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "fingerprintId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fingerprint ID" />
    ),
  },
];
