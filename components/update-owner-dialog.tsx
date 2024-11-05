"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { OwnerZod } from "@/schemas/OwnerSchema";
import { Owner } from "@prisma/client";
import { Loader2, UserRoundPen } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import { Input } from "./ui/input";
import { useRef, useState } from "react";
import axios from "axios";
import { OwnerBurial } from "@/app/(root)/owners/columns";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const UpdateOwnerDialog = ({ owner }: { owner: OwnerBurial }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<OwnerZod>({
    defaultValues: {
      burialId: owner.burials[0].id,
      name: owner.name,
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (data: OwnerZod) => {
    try {
      setLoading(true);
      await axios.patch(`/api/owners/${owner.id}`, data);
      toast({
        title: "Updated",
        description: "The Owner has been updated successfully",
      });
    } catch (error) {
      console.error("failed to update owner: ", error);
      toast({
        title: "Error",
        description: "Failed to update owner.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
      setOpen(false);
      router.refresh();
    }
  };

  return (
    <Form {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(handleSubmit)}>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="icon" variant="secondary">
              <UserRoundPen />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update</DialogTitle>
              <DialogDescription>
                This action will update the current owner, this will save to the
                database.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col">
              <Input {...form.register("name")} placeholder="Name" />
            </div>
            <DialogFooter>
              <Button onClick={() => setOpen(false)} variant="secondary">
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={() => formRef.current?.requestSubmit()}
                disabled={loading}
              >
                {loading && <Loader2 className="animate-spin" />}
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
};

export default UpdateOwnerDialog;
