"use client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ownerSchema, OwnerZod } from "@/schemas/OwnerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Burial } from "@prisma/client";
import axios from "axios";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { getBurialTypeName } from "@/functions/getBurialTypeName";

const AddOwnerDialog = ({ trigger }: { trigger?: ReactNode }) => {
  const router = useRouter();
  const { toast } = useToast();

  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<OwnerZod>({
    resolver: zodResolver(ownerSchema),
    defaultValues: {
      name: "",
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (owner: OwnerZod) => {
    try {
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
          <Button onClick={() => formRef.current?.requestSubmit()}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddOwnerDialog;

const BurialCombobox = ({
  onValueChange,
}: {
  onValueChange: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [burials, setBurials] = useState<Burial[]>([]);

  useEffect(() => {
    onValueChange(value);
  }, [value]);

  useEffect(() => {
    const fetchBurials = async () => {
      try {
        const { data } = await axios.get(`/api/burials`, {
          params: {},
        });
        setBurials(data);
      } catch (error) {
        console.error("error fetching burials from burial combobox: ", error);
        throw error;
      }
    };
    fetchBurials();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? `Block ${
                burials.find((burial) => burial.id === value)?.block
              } Lot ${burials.find((burial) => burial.id === value)?.row}`
            : "Select Plot..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search plot..." />
          <CommandList>
            <CommandEmpty>No Plot found.</CommandEmpty>
            <CommandGroup>
              {burials.map(
                (burial) =>
                  !burial.ownerId && (
                    <CommandItem
                      key={burial.id}
                      value={burial.id}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === burial.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {`${getBurialTypeName(burial.type)}: Block ${
                        burial.block
                      } Lot ${burial.row}`}
                    </CommandItem>
                  )
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
