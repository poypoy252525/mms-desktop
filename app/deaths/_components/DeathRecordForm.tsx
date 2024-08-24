"use client";
import { newDeathSchema } from "@/app/schemas/NewDeathSchema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomFormInput from "../../_components/CustomFormInput";
import BirthDatePicker from "../_components/BirthDatePicker";
import BurialPickerCard from "../_components/BurialPickerCard";
import DeathDatePicker from "../_components/DeathDatePicker";
import axios from "axios";
import { burialVacantSchemaType } from "@/app/schemas/BurialSchema";
import { Burial } from "@prisma/client";

export type newDeathSchemaType = z.infer<typeof newDeathSchema>;

const DeathRecordForm = ({ burials }: { burials: Burial[] }) => {
  const router = useRouter();
  const form = useForm<newDeathSchemaType>({
    resolver: zodResolver(newDeathSchema),
    defaultValues: {
      causeOfDeath: "",
      dateOfBirth: new Date(),
      dateOfDeath: new Date(),
      firstName: "",
      lastName: "",
      nextOfKinContact: "",
      nextOfKinName: "",
      nextOfKinRelationship: "",
      burialId: "",
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => {
          console.log(data);
          await axios.post<newDeathSchemaType>("/api/deaths", data);
          await axios.patch<burialVacantSchemaType>("/api/burials", {
            isVacant: false,
            burialId: data.burialId,
          });
          router.push("/deaths");
          router.refresh();
        })}
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8 space-y-4">
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
            <div>
              <CustomFormInput
                control={form.control}
                name="causeOfDeath"
                label="Cause of death"
                placeholder="Cause of death..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <BirthDatePicker form={form} />
              <DeathDatePicker form={form} />
            </div>
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
              />
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col space-y-4 items-end">
              <div className="space-x-4 self-end">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => router.push("/deaths")}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Record</Button>
              </div>
              <div className="flex w-full">
                <BurialPickerCard
                  burials={burials}
                  callback={(burial) => {
                    form.setValue("burialId", burial.id);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default DeathRecordForm;
