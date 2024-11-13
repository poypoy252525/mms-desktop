"use client";

import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Attendance } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<Attendance>[] = [
  {
    accessorKey: "timeStart",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time start" />
    ),
    cell: ({ getValue }) => {
      const timeStart = getValue() as Date;
      return timeStart.toLocaleDateString("en-PH", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    },
  },
  {
    accessorKey: "timeEnd",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time End" />
    ),
    cell: ({ getValue }) => {
      const timeEnd = getValue() as Date;
      return timeEnd.toLocaleDateString("en-PH", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    },
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ getValue }) => {
      const id = getValue() as string;
      return <ViewButton id={id} />;
    },
  },
];

const ViewButton = ({ id }: { id: string }) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        router.push(`/attendance/${id}`);
      }}
      size="icon"
      variant="outline"
    >
      <Eye />
    </Button>
  );
};
