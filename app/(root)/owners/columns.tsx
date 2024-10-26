"use client";

import DeleteDialog from "@/components/delete-dialog";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { getBurialTypeName } from "@/functions/getBurialTypeName";
import { Burial, Owner } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";

export const columns: ColumnDef<Owner & { burials: Burial[] }>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "burials",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Burial" />
    ),
    cell: ({ getValue }) => {
      const burials = getValue() as Burial[];
      if (!burials || !burials.length) return "No plot record";
      return `${getBurialTypeName(burials[0].type)}: Block ${
        burials[0].block
      } Lot ${burials[0].row}`;
    },
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ getValue }) => {
      const ownerId = getValue() as string;
      return (
        <DeleteDialog
          onDelete={async () => {
            await axios.delete(`/api/owners/${ownerId}`);
          }}
        />
      );
    },
  },
];
