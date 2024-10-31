"use client";
import EditBurialDialog from "@/components/edit-burial-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { getBurialTypeName } from "@/functions/getBurialTypeName";
import { Burial, BurialType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Burial>[] = [
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ getValue }) => {
      const burialType = getValue() as BurialType;
      return <Button variant="link">{getBurialTypeName(burialType)}</Button>;
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
          {ownerId ? "Owned" : "Available"}
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
    id: "actions",
    accessorFn: (burial) => burial,
    header: ({ column }) => "Actions",
    cell: ({ getValue }) => {
      const burial = getValue() as Burial;
      return <EditBurialDialog burial={burial} />;
    },
  },
];
