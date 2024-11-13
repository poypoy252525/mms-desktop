"use client";

import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { AttendanceStatus, StaffAttendance } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<StaffAttendance>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Attendance ID" />
    ),
  },
  {
    accessorKey: "timeIn",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time in" />
    ),
    cell: ({ getValue }) => {
      const timestamp = new Date(getValue() as string);
      return timestamp.toLocaleDateString("en-PH", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ getValue }) => {
      const status = getValue() as AttendanceStatus;
      return (
        <Badge variant={status === "LATE" ? "destructive" : "outline"}>
          {status}
        </Badge>
      );
    },
  },
];
