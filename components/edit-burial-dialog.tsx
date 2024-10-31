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
import { BurialZod } from "@/schemas/BurialSchema";
import axios from "axios";
import { Edit2, Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import BurialTypeSelect from "./burial-type-select";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import { Input } from "./ui/input";
import { Burial } from "@prisma/client";

interface Coordinate {
  latitude: number;
  longitude: number;
}

const EditBurialDialog = ({
  trigger,
  burial,
}: {
  trigger?: ReactNode;
  burial: Burial;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const form = useForm<BurialZod>({
    defaultValues: {
      block: burial.block,
      latitude: (burial.coordinates as unknown as Coordinate).latitude,
      longitude: (burial.coordinates as unknown as Coordinate).longitude,
      row: burial.row,
      type: burial.type,
    },
  });
  const [open, setOpen] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (burialZod: BurialZod) => {
    try {
      setLoading(true);
      await axios.patch(`/api/burials/${burial.id}`, burialZod);
      router.refresh();
      toast({
        title: "Success",
        description: "The plot has been updated successfully",
      });
    } catch (error) {
      console.error("failed to update new plot: ", error);
      toast({
        title: "Failed",
        description: "Failed to update Plot",
        variant: "destructive",
      });
      throw error;
    } finally {
      setOpen(false);
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
            <Edit2 />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit</DialogTitle>
          <DialogDescription>This will update current plot</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} />
          <BurialTypeSelect
            defaultValue={burial.type}
            onValueChange={(value) => form.setValue("type", value)}
          />
          <Input {...form.register("block")} placeholder="Block" />
          <Input {...form.register("row")} placeholder="Lot" />
          <div className="flex space-x-2">
            <Input {...form.register("latitude")} placeholder="Latitude" />
            <Input {...form.register("longitude")} placeholder="Longitude" />
          </div>
          <DialogFooter>
            <Button onClick={() => setOpen(false)} variant="secondary">
              Cancel
            </Button>
            <Button
              onClick={() => formRef.current?.requestSubmit()}
              disabled={loading}
            >
              {loading && <Loader2 className="animate-spin" />}
              Save changes
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBurialDialog;
