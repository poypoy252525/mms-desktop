"use client";

import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { getBurialTypeName } from "@/functions/getBurialTypeName";
import { Burial } from "@prisma/client";
import axios from "axios";
import { useState, useEffect } from "react";

const BurialCombobox = ({
  onValueChange,
}: {
  onValueChange: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [burials, setBurials] = useState<Burial[]>([]);

  useEffect(() => {
    onValueChange(value);
  }, [value]);

  useEffect(() => {
    const fetchBurials = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<Burial[]>(`/api/burials`, {
          params: {},
        });
        setBurials(data.filter((item) => !item.ownerId));
      } catch (error) {
        console.error("error fetching burials from burial combobox: ", error);
        throw error;
      } finally {
        setLoading(false);
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
            <CommandEmpty>
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "No plot available."
              )}
            </CommandEmpty>
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

export default BurialCombobox;
