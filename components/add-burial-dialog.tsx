import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Input } from "./ui/input";
import { BurialType } from "@prisma/client";
import { useForm } from "react-hook-form";
import { BurialZod } from "@/schemas/BurialSchema";
import { useRef, useState } from "react";
import { Form } from "./ui/form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const AddBurialDialog = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<BurialZod>({
    defaultValues: {
      block: "",
      latitude: 0,
      longitude: 0,
      row: "",
      type: "",
    },
  });
  const [open, setOpen] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (burial: BurialZod) => {
    try {
      console.log(burial);
      await axios.post(`/api/burials`, burial);
      router.refresh();
      toast({
        title: "Success",
        description: "The plot has been created successfully",
      });
      setOpen(false);
    } catch (error) {
      console.error("failed to create new plot: ", error);
      toast({
        title: "Failed",
        description: "Failed to create Plot",
        variant: "destructive",
      });
      throw error;
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create</DialogTitle>
          <DialogDescription>This will create new plot</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} />
          <BurialTypeSelect
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
            <Button onClick={() => formRef.current?.requestSubmit()}>
              Create
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBurialDialog;

const BurialTypeSelect = ({
  onValueChange,
}: {
  onValueChange: (value: string) => void;
}) => {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Plot Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="FAMILY_LOT">Family Lot</SelectItem>
        <SelectItem value="LAWN_LOT">Lawn Lot</SelectItem>
        <SelectItem value="APARTMENT">Apartment</SelectItem>
        <SelectItem value="COLUMBARIUM">Columbarium</SelectItem>
      </SelectContent>
    </Select>
  );
};
