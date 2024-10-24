"use client";
import AddOwnerDialog from "@/components/add-owner-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DeceasedZod } from "@/schemas/DeceasedSchema";
import { Burial, Owner } from "@prisma/client";
import axios from "axios";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  owners: Owner[];
}

const AddDeceasedDialog = ({ owners }: Props) => {
  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const [ownerId, setOwnerId] = useState<string>("");
  const form = useForm<DeceasedZod>({
    defaultValues: {
      burialId: "",
      name: "",
      ownerId: "",
    },
  });
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (deceased: DeceasedZod) => {
    try {
      console.log(deceased);
      await axios.post(`/api/deceased`, deceased);
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error("error creating deceased: ", error);
      throw error;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus />
          New deceased
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Deceased</DialogTitle>
          <DialogDescription>
            This will create new record of deceased
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            ref={formRef}
            onSubmit={form.handleSubmit((data) => onSubmit(data))}
          />
          <Input {...form.register("name")} title="Name" placeholder="Name" />
          <div className="flex space-x-2">
            <div className="w-full">
              <SelectOwner
                onValueChange={(value) => {
                  form.setValue("ownerId", value);
                  setOwnerId(value);
                }}
                owners={owners}
              />
            </div>
            <div className="flex-grow">
              <AddOwnerDialog />
            </div>
          </div>
          <SelectBurial
            onValueChange={(value) => form.setValue("burialId", value)}
            ownerId={ownerId}
          />
        </Form>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() => formRef.current?.requestSubmit()}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDeceasedDialog;

const SelectOwner = ({
  onValueChange,
  owners,
}: {
  onValueChange: (value: string) => void;
  owners: Owner[];
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

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
            ? owners.find((owner) => owner.id === value)?.name
            : "Select owner..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search owner..." />
          <CommandList>
            <CommandEmpty>No owner found.</CommandEmpty>
            <CommandGroup>
              {owners.map((owner) => (
                <CommandItem
                  key={owner.id}
                  value={owner.name}
                  onSelect={(currentValue) => {
                    const selectedOwner = owners.find(
                      (owner) => owner.name === currentValue
                    );
                    setValue(selectedOwner ? selectedOwner.id : "");
                    onValueChange(selectedOwner?.id || "");
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === owner.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {owner.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const SelectBurial = ({
  ownerId,
  onValueChange,
}: {
  ownerId: string;
  onValueChange: (value: string) => void;
}) => {
  const [burials, setBurials] = useState<Burial[]>([]);
  useEffect(() => {
    const fetchBurial = async () => {
      try {
        const { data } = await axios.get(`/api/burials`, {
          params: {
            ownerId,
          },
        });
        setBurials(data);
      } catch (error) {
        console.error("Failed to fetch burial from Select burial: ", error);
        throw error;
      }
    };
    fetchBurial();
  }, [ownerId]);
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {burials.map((burial) => (
          <SelectItem
            key={burial.id}
            value={burial.id}
          >{`Block ${burial.block} Lot ${burial.row}`}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
