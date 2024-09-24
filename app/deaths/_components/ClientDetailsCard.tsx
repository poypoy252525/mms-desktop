import CustomFormInput from "@/app/_components/CustomFormInput";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UseFormClearErrors, UseFormReturn } from "react-hook-form";
import BirthDatePicker from "./BirthDatePicker";
import DeathDatePicker from "./DeathDatePicker";
import { newDeathSchemaType } from "@/app/schemas/DeathSchemas";

const ClientDetailsCard = ({
  form,
}: {
  form: UseFormReturn<newDeathSchemaType>;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Details</CardTitle>
        <CardDescription>Information about the death person</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 w-full">
          <CustomFormInput
            control={form.control}
            name="firstName"
            label="First name"
            placeholder="First name..."
          />
          <CustomFormInput
            control={form.control}
            name="lastName"
            label="Last name"
            placeholder="last name..."
          />
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <CustomFormInput
              control={form.control}
              name="age"
              label="Age"
              placeholder="Age..."
              type="number"
              valueType="number"
            />
          </div>
          <div className="col-span-8">
            <CustomFormInput
              control={form.control}
              name="causeOfDeath"
              label="Cause of death"
              placeholder="Cause of death..."
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <BirthDatePicker form={form} />
          <DeathDatePicker form={form} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientDetailsCard;
