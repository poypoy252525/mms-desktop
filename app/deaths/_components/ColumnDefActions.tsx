"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { Death } from "@prisma/client";
import axios from "axios";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

const ColumnDefActions = ({ death }: { death: Death }) => {
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const deleted = await axios.delete<Death>(`/api/deaths/${death.id}`);
      router.refresh();
      toast({
        title: "Deleted",
        description: "Death record has been deleted.",
      });
    } catch (error) {
      toast({
        title: "Failed",
        description: "Record not found",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => router.push(`/deaths/${death.id}`)}>
          View details
        </DropdownMenuItem>
        <DropdownMenuItem>Edit details</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Remove from burial</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>
          Delete record
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ColumnDefActions;
