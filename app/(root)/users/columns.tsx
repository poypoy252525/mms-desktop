"use client";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "photo",
    header: "",
    cell: ({ getValue }) => {
      const url = getValue() as string;
      return (
        <Image
          alt={url}
          src={url}
          width={30}
          height={30}
          className="w-8 h-8 rounded-full"
        />
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
  },
];
