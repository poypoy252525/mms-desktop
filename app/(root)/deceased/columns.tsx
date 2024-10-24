"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { getBurialTypeName } from "@/functions/getBurialTypeName";
import { Burial, BurialType, Deceased, Owner } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<Deceased & { owner: Owner; burial: Burial }>[] =
  [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ getValue, row: { original } }) => {
        const name = getValue() as string;
        return (
          <Link href={`/deceased/${original.id}`}>
            <Button variant="link">{name}</Button>
          </Link>
        );
      },
    },
    {
      id: "owner",
      accessorFn: ({ owner }) => owner.name,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Owner" />
      ),
      cell: ({ getValue }) => {
        const name = getValue() as string;
        return <p>{name}</p>;
      },
    },
    {
      id: "type",
      accessorFn: ({ burial }) => burial.type,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),

      cell: ({ getValue }) => {
        const burialType = getValue() as BurialType;
        return <Badge>{`${getBurialTypeName(burialType)}`}</Badge>;
      },
    },
    {
      id: "block",
      accessorFn: ({ burial }) => burial.block,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Block" />
      ),
      cell: ({ getValue }) => {
        const block = getValue() as string;
        return <p>{`${block}`}</p>;
      },
    },
    {
      id: "row",
      accessorFn: ({ burial }) => burial.row,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Lot" />
      ),
      cell: ({ getValue }) => {
        const row = getValue() as string;
        return <p>{`${row}`}</p>;
      },
    },
    {
      id: "coordinate",
      accessorFn: ({ burial }) => burial.coordinates,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Coordinate" />
      ),
      cell: ({ getValue }) => {
        const coordinate = getValue() as {
          latitude: number;
          longitude: number;
        };
        return <p>{`${coordinate.latitude}, ${coordinate.longitude}`}</p>;
      },
    },
  ];
