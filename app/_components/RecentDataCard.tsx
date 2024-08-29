import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import prisma from "@/prisma/db";
import { StickyNote } from "lucide-react";
import Link from "next/link";

const RecentDataCard = async () => {
  const latestRecords = await prisma.death.findMany({
    orderBy: {
      dateCreated: "asc",
    },
    take: 5,
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-semibold leading-none tracking-tight text-md">
          Recent Records
        </CardTitle>
        <CardDescription className="text-sm">
          Latest death record list
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {latestRecords.map((latestRecord) => (
              <TableRow key={latestRecord.id}>
                <TableCell className="w-5">
                  <StickyNote className="w-4 h-4" />
                </TableCell>
                <TableCell className="font-medium">
                  <Link href={`/deaths/${latestRecord.id}`}>
                    {`${latestRecord.firstName} ${latestRecord.lastName}`}
                  </Link>
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant="outline"
                    className={
                      latestRecord.status === "ACTIVE"
                        ? ""
                        : "text-muted-foreground"
                    }
                  >
                    {latestRecord.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentDataCard;
