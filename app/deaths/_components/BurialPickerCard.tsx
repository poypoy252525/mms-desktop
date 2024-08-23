import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Burial } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import CustomFormSelector from "./CustomFormSelector";

interface Props {
  callback: (burial: Burial) => void;
}

const BurialPickerCard = ({ callback }: Props) => {
  const [burials, setBurials] = useState<Burial[]>();
  const [block, setBlock] = useState<string>();
  const [row, setRow] = useState<string>();
  const [plotNumber, setPlotNumber] = useState<string>();
  const [burial, setBurial] = useState<Burial>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<Burial[]>(`/api/burials/vacants`);
        setBurials(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setBurial(
      burials?.find(
        (burial) =>
          burial.block === block &&
          burial.row === row &&
          burial.plotNumber === plotNumber
      )
    );
    if (burial) callback(burial);
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
    </Card>
  );
};

export default BurialPickerCard;
