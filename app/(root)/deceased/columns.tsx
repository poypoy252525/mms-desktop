"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { getBurialTypeName } from "@/functions/getBurialTypeName";
import { Burial, Deceased, Owner } from "@prisma/client";
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
      accessorKey: "owner",
      header: "Owner",
      cell: ({ getValue }) => {
        const owner = getValue() as Owner;
        return <p>{owner.name}</p>;
      },
    },
    {
      accessorKey: "burial",
      header: "Burial Type",
      cell: ({ getValue }) => {
        const burial = getValue() as Burial;
        return <Badge>{`${getBurialTypeName(burial.type)}`}</Badge>;
      },
    },
    {
      accessorKey: "burial",
      header: "Block",
      cell: ({ getValue }) => {
        const burial = getValue() as Burial;
        return <p>{`${burial.block}`}</p>;
      },
    },
    {
      accessorKey: "burial",
      header: "Lot",
      cell: ({ getValue }) => {
        const burial = getValue() as Burial;
        return <p>{`${burial.row}`}</p>;
      },
    },
  ];
