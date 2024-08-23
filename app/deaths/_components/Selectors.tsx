"use client";
import { Burial } from "@prisma/client";
import CustomFormSelector from "./CustomFormSelector";

interface Props {
  burials: Burial[];
}

const Selectors = ({ burials }: Props) => {
  return (
    <div className="space-y-4">
      <CustomFormSelector
        placeholder="Block"
        items={burials?.map((burial) => burial.block)}
        callback={(value) => console.log(value)}
      />
      <CustomFormSelector
        placeholder="Row"
        items={burials?.map((burial) => burial.block)}
        callback={(value) => console.log(value)}
      />
      <CustomFormSelector
        placeholder="Block"
        items={burials?.map((burial) => burial.block)}
        callback={(value) => console.log(value)}
      />
    </div>
  );
};

export default Selectors;
