import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DeathTableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>First name</TableHead>
          <TableHead>Last name</TableHead>
          <TableHead>Cause of Death</TableHead>
          <TableHead>Date of Death</TableHead>
          <TableHead className="w-[160px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[0, 1, 2, 3, 4].map((item) => (
          <TableRow key={item}>
            <TableCell>
              <Skeleton className="w-full h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-full h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-full h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-full h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-full h-[20px]" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DeathTableSkeleton;
