"use client";
import PageHeading from "@/app/_components/PageHeading";
import PageWrapper from "@/app/_components/PageWrapper";
import { newDeathSchema } from "@/app/schemas/NewDeathSchema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import BirthDatePicker from "../_components/BirthDatePicker";
import CustomFormInput from "../_components/CustomFormInput";
import DeathDatePicker from "../_components/DeathDatePicker";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BurialPickerCard from "../_components/BurialPickerCard";

export type newDeathSchemaType = z.infer<typeof newDeathSchema>;

const CreateDeathRecord = () => {
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
    },
  });
  return (
    <PageWrapper>
      <PageHeading>New Record</PageHeading>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (data) => {
            await axios.post<newDeathSchemaType>("/api/deaths", data);
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
                  <BurialPickerCard />
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </PageWrapper>
  );
};

export default CreateDeathRecord;
