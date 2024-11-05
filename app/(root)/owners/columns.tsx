"use client";

import DeleteDialog from "@/components/delete-dialog";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import UpdateOwnerDialog from "@/components/update-owner-dialog";
import { getBurialTypeName } from "@/functions/getBurialTypeName";
import { Burial, Owner } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";

export type OwnerBurial = Owner & { burials: Burial[] };

export const columns: ColumnDef<OwnerBurial>[] = [
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
    id: "actions",
    accessorFn: (owner) => owner,
    header: "Actions",
    cell: ({ getValue }) => {
      const owner = getValue() as OwnerBurial;
      console.log(owner);
      return (
        <div className="flex space-x-2">
          <DeleteDialog
            onDelete={async () => {
              await axios.delete(`/api/owners/${owner.id}`);
            }}
          />
          <UpdateOwnerDialog owner={owner} />
        </div>
      );
    },
  },
];
