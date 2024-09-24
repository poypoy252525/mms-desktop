import CustomFormInput from "@/app/_components/CustomFormInput";
import { newDeathSchemaType } from "@/app/schemas/DeathSchemas";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";

const NextOfKinDetailsCard = ({
  form,
}: {
  form: UseFormReturn<newDeathSchemaType>;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Relative Details</CardTitle>
        <CardDescription>
          details about the next of kin information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <CustomFormInput
            control={form.control}
            name="nextOfKinName"
            label="Next of Kin name"
            placeholder="Next of Kin name..."
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <CustomFormInput
            control={form.control}
            name="nextOfKinRelationship"
            label="Next of Kin relationship"
            placeholder="Next of Kin relationship..."
          />
          <CustomFormInput
            control={form.control}
            name="nextOfKinContact"
            label="Next of Kin contact"
            placeholder="Next of Kin contact..."
            type="number"
            max={99999999999}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default NextOfKinDetailsCard;
