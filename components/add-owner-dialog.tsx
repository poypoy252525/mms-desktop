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
import { useToast } from "@/hooks/use-toast";
import { ownerSchema, OwnerZod } from "@/schemas/OwnerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import BurialCombobox from "./burial-combobox";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import { Input } from "./ui/input";

const AddOwnerDialog = ({ trigger }: { trigger?: ReactNode }) => {
  const router = useRouter();
  const { toast } = useToast();

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<OwnerZod>({
    resolver: zodResolver(ownerSchema),
    defaultValues: {
      name: "",
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (owner: OwnerZod) => {
    try {
      setLoading(true);
      await axios.post(`/api/owners`, owner, {});
      router.refresh();
      toast({
        title: "Success",
        description: "The Owner data has been created successfully",
      });
      setOpen(false);
    } catch (error) {
      console.error("Unable to create new owner from dialog: ", error);
      toast({
        title: "Failed",
        description: "Failed to create new Owner record.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button size="icon" variant="outline">
            <Plus />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create</DialogTitle>
          <DialogDescription>
            This action will create a new owner.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} />
          <Input {...form.register("name")} placeholder="Owner name" />
          <BurialCombobox
            onValueChange={(value) => form.setValue("burialId", value)}
          />
        </Form>
        <DialogFooter>
          <Button onClick={() => setOpen(false)} variant="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => formRef.current?.requestSubmit()}
            disabled={loading}
          >
            {loading && <Loader2 className="animate-spin" />}
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddOwnerDialog;
