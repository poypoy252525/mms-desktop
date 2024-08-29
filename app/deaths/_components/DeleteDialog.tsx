"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Death } from "@prisma/client";
import axios from "axios";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const DeleteDialog = ({ death }: { death: Death }) => {
  const [isDeleting, setDeleting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="destructive" disabled={isDeleting}>
          {isDeleting ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Trash className="w-4 h-4 mr-2" />
          )}
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete record</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete? This can not be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeleting}
            onClick={async () => {
              setDeleting(true);
              try {
                const { data: deletedDeath } = await axios.delete<Death>(
                  `/api/deaths/${death.id}`
                );
                router.push("/deaths");
                router.refresh();
                toast({
                  title: "Deleted",
                  description: `${deletedDeath.firstName} ${deletedDeath.lastName} has been deleted.`,
                });
              } catch (error) {
                console.log(error);
                toast({
                  title: "Failed",
                  description: "Failed to delete data",
                });
              }
              setDeleting(false);
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
