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
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import BurialTypeSelect from "./burial-type-select";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import { Input } from "./ui/input";
import Map from "./map";

const AddBurialDialog = ({ trigger }: { trigger?: ReactNode }) => {
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
  const [coordinate, setCoordinate] = useState<{
    longitude: number;
    latitude: number;
  }>({ latitude: 0, longitude: 0 });

  const [loading, setLoading] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    form.setValue("latitude", coordinate.latitude);
    form.setValue("longitude", coordinate.longitude);
  }, [coordinate]);

  const onSubmit = async (burial: BurialZod) => {
    try {
      setLoading(true);
      await axios.post(`/api/burials`, burial);
      router.refresh();
      toast({
        title: "Success",
        description: "The plot has been created successfully",
      });
    } catch (error) {
      console.error("failed to create new plot: ", error);
      toast({
        title: "Failed",
        description: "Failed to create Plot",
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
            <Plus />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-[700px]">
        <div className="flex space-x-6">
          <div className="w-[50%]">
            <DialogHeader>
              <DialogTitle>Create</DialogTitle>
              <DialogDescription>This will create new plot</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col space-y-4">
              <Form {...form}>
                <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} />
                <BurialTypeSelect
                  onValueChange={(value) => form.setValue("type", value)}
                />
                <Input {...form.register("block")} placeholder="Block" />
                <Input {...form.register("row")} placeholder="Lot" />
                <div className="flex space-x-2">
                  <Input
                    {...form.register("latitude")}
                    placeholder="Latitude"
                  />
                  <Input
                    {...form.register("longitude")}
                    placeholder="Longitude"
                  />
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
                    Create
                  </Button>
                </DialogFooter>
              </Form>
            </div>
          </div>
          <div className="w-[50%]">
            <Map
              onDragEnd={(coordinate) => {
                setCoordinate(coordinate);
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddBurialDialog;
