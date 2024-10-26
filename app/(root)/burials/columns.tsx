"use client";
import DeleteDialog from "@/components/delete-dialog";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { getBurialTypeName } from "@/functions/getBurialTypeName";
import { Burial, BurialType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";

export const columns: ColumnDef<Burial>[] = [
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ getValue }) => {
      const burialType = getValue() as BurialType;
      return getBurialTypeName(burialType);
    },
  },
  {
    accessorKey: "block",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Block" />
    ),
    cell: ({ getValue }) => {
      const block = getValue() as string;
      return `${block}`;
    },
  },
  {
    accessorKey: "row",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lot" />
    ),
    cell: ({ getValue }) => {
      const lot = getValue() as string;
      return `${lot}`;
    },
  },
  {
    accessorKey: "ownerId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ getValue }) => {
      const ownerId = getValue() as string;
      return (
        <Badge variant={ownerId ? "secondary" : "default"}>
          {ownerId ? "Owned" : "Not owned"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "coordinates",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Coordinate" />
    ),
    cell: ({ getValue }) => {
      const coordinate = getValue() as { latitude: number; longitude: number };
      return `${coordinate.latitude}, ${coordinate.longitude}`;
    },
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ getValue }) => {
      const ownerId = getValue() as string;
      return (
        <DeleteDialog
          onDelete={async () => {
            await axios.delete(`/api/burials/${ownerId}`);
          }}
        />
      );
    },
  },
];
