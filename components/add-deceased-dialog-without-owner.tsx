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
import { Button } from "./ui/button";
import { Loader2, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import BurialTypeSelect from "./burial-type-select";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import { DeceasedZod } from "@/schemas/DeceasedSchema";
import { BurialZod } from "@/schemas/BurialSchema";
import { OwnerZod } from "@/schemas/OwnerSchema";
import axios from "axios";
import { Burial, Deceased, Owner } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Map from "./map";

const AddDeceasedDialogWithoutOwner = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<{
    deceased: DeceasedZod;
    owner: OwnerZod;
    burial: BurialZod;
  }>({});
  const formRef = useRef<HTMLFormElement>(null);

  const [coordinate, setCoordinate] = useState<{
    longitude: number;
    latitude: number;
  }>();

  const onSubmit = async (data: {
    deceased: DeceasedZod;
    owner: OwnerZod;
    burial: BurialZod;
  }) => {
    try {
      setLoading(true);
      const { data: burial } = await axios.post<Burial>(
        `/api/burials`,
        data.burial
      );
      await axios.post<Owner>(`/api/owners`, {
        ...data.owner,
        burialId: burial.id,
      });
      await axios.post<Deceased>(`/api/deceased`, {
        ...data.deceased,
        burialId: burial.id,
      });

      toast({
        title: "Created",
        description: "The deceased has been created successfully.",
      });
      router.refresh();
    } catch (error) {
      console.error("Unable to create new deceased without owner: ", error);
      toast({
        title: "Error",
        description: "Failed to create new deceased record.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (coordinate) {
      form.setValue("burial.latitude", coordinate.latitude);
      form.setValue("burial.longitude", coordinate.longitude);
    }
  }, [coordinate]);

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit((data) => onSubmit(data))}
      >
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus />
              <span>New deceased without owner</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-screen-md">
            <div className="grid grid-cols-12 space-x-4">
              <div className="col-span-6 space-y-4">
                <DialogHeader>
                  <DialogTitle>Create</DialogTitle>
                  <DialogDescription>
                    this will create new deceased, owner and plot
                  </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      {...form.register("deceased.name")}
                      placeholder="Deceased name"
                    />
                    <Input
                      {...form.register("owner.name")}
                      placeholder="Owner name"
                    />
                  </div>
                  <BurialTypeSelect
                    onValueChange={(value) =>
                      form.setValue("burial.type", value)
                    }
                  />
                  <Input
                    {...form.register("burial.block")}
                    placeholder="Block"
                  />
                  <Input {...form.register("burial.row")} placeholder="Lot" />
                  <div className="flex space-x-2">
                    <Input
                      {...form.register("burial.latitude")}
                      placeholder="Latitude"
                    />
                    <Input
                      {...form.register("burial.longitude")}
                      placeholder="Longitude"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => setOpen(false)} variant="secondary">
                    Cancel
                  </Button>
                  <Button
                    disabled={loading}
                    type="submit"
                    onClick={() => formRef.current?.requestSubmit()}
                  >
                    {loading && <Loader2 className="animate-spin" />}
                    Create
                  </Button>
                </DialogFooter>
              </div>
              <div className="col-span-6">
                <Map onDragEnd={(coords) => setCoordinate(coords)} />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
};

export default AddDeceasedDialogWithoutOwner;
