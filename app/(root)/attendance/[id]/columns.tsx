"use client";

import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { AttendanceStatus, Staff, StaffAttendance } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<StaffAttendance & { staff: Staff }>[] = [
  {
    id: "staffName",
    accessorFn: ({ staff }) => staff.name,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
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
