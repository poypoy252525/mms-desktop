import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/prisma/db";
import { Deceased, Owner } from "@prisma/client";
import { StickyNote } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const RecentAddedDeceasedCard = async () => {
  const recentDeceased = await prisma.deceased.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      burial: {
        select: {
          owner: true,
        },
      },
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recently added</CardTitle>
      </CardHeader>
      <CardContent>
        <RecentTable deceased={recentDeceased} />
      </CardContent>
    </Card>
  );
};

export default RecentAddedDeceasedCard;

const RecentTable = ({
  deceased,
}: {
  deceased: (Deceased & { burial: { owner: Owner | null } })[];
}) => {
  return (
    <Table>
      <TableCaption>A list of recent deceased.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[60px]"></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {deceased.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">
              <StickyNote />
            </TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.burial.owner?.name}</TableCell>
            <TableCell className="text-right">{item.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
