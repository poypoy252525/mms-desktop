"use client";

import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Attendance } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

export const columns: ColumnDef<Attendance>[] = [
  {
    accessorKey: "timeStart",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time start" />
    ),
  },
  {
    accessorKey: "timeEnd",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time End" />
    ),
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ getValue }) => {
      const id = getValue() as string;
      return (
        <Button onClick={() => console.log(id)} size="icon" variant="outline">
          <Eye />
        </Button>
      );
    },
  },
];
