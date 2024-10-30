import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

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

export default BurialTypeSelect;