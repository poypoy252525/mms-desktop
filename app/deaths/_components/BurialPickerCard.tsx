"use client";
import AddBurialForm from "@/app/burials/_components/AddBurialForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Burial } from "@prisma/client";
import { CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import CustomFormSelector from "./CustomFormSelector";

interface Props {
  callback?: (burial: Burial) => void;
  burials: Burial[];
}

const BurialPickerCard = ({ callback, burials }: Props) => {
  const [block, setBlock] = useState<string>();
  const [row, setRow] = useState<string>();
  const [plotNumber, setPlotNumber] = useState<string>();
  const [burial, setBurial] = useState<Burial>();

  useEffect(() => {
    setBurial(
      burials?.find(
        (burial) =>
          burial.block === block &&
          burial.row === row &&
          burial.plotNumber === plotNumber
      )
    );
    if (burial && callback) callback(burial);
  }, [block, row, plotNumber, burials, callback, burial]);

  let blocks = burials?.map((burial) => burial.block);
  blocks = blocks?.filter(
    (value, index, self) => self.indexOf(value) === index
  );

  let rows = burials
    ?.filter((burial) => burial.block === block)
    .map((burial) => burial.row);

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Burial</CardTitle>
        <CardDescription>Location of the death&apos;s burial</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <CustomFormSelector
            placeholder="Block"
            items={blocks}
            callback={(value) => setBlock(value)}
          />
          <CustomFormSelector
            placeholder="Row"
            items={rows?.filter(
              (value, index, self) => self.indexOf(value) === index
            )}
            callback={(value) => setRow(value)}
          />
          <CustomFormSelector
            placeholder="Plot number"
            items={burials
              ?.filter((burial) => burial.block === block && burial.row === row)
              .map((burial) => burial.plotNumber)}
            callback={(value) => setPlotNumber(value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-center w-full">
          <Popover>
            <PopoverTrigger asChild>
              <Button type="button" size="sm" variant="ghost">
                <CirclePlus className="w-4 h-4 mr-2" />
                Add burial
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <AddBurialForm />
            </PopoverContent>
          </Popover>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BurialPickerCard;
