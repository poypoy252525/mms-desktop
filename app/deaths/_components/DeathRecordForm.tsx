"use client";
import PageHeading from "@/app/_components/PageHeading";
import { BurialVacantSchemaType } from "@/app/schemas/BurialSchema";
import { newDeathSchema } from "@/app/schemas/NewDeathSchema";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Burial } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import BurialPickerCard from "../_components/BurialPickerCard";
import BackButtom from "./BackButton";
import ClientDetailsCard from "./ClientDetailsCard";
import NextOfKinDetailsCard from "./NextOfKinDetailsCard";
import StatusCard from "./StatusCard";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export type newDeathSchemaType = z.infer<typeof newDeathSchema>;

const DeathRecordForm = ({ burials }: { burials: Burial[] }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const form = useForm<newDeathSchemaType>({
    resolver: zodResolver(newDeathSchema),
    defaultValues: {
      causeOfDeath: "",
      dateOfBirth: new Date(),
      dateOfDeath: new Date(),
      age: 0,
      firstName: "",
      lastName: "",
      nextOfKinContact: "",
      nextOfKinName: "",
      nextOfKinRelationship: "",
      burialId: "",
      status: "ACTIVE",
    },
  });

  const onSubmit = async (data: newDeathSchemaType) => {
    setLoading(true);
    try {
      await axios.post<newDeathSchemaType>("/api/deaths", data);
      await axios.patch<BurialVacantSchemaType>("/api/burials", {
        isVacant: false,
        burialId: data.burialId,
      });
      router.push("/deaths");
      router.refresh();
      toast({
        title: "Created",
        description: "New record has been added.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something is wrong...",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <Form {...form}>
      <div>
        <form
          id="deathForm"
          onSubmit={form.handleSubmit((data) => onSubmit(data))}
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BackButtom />
            <PageHeading>Create new record</PageHeading>
          </div>
          <div className="space-x-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => router.push("/deaths")}
            >
              Cancel
            </Button>
            <Button
              form="deathForm"
              size="sm"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Add Record
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 mt-4">
          <div className="col-span-8 space-y-4">
            <ClientDetailsCard form={form} />
            <NextOfKinDetailsCard form={form} />
          </div>
          <div className="col-span-4">
            <div className="flex flex-col space-y-4 items-end">
              <div className="w-full">
                <StatusCard form={form} />
              </div>
              <div className="w-full">
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
      </div>
    </Form>
  );
};

export default DeathRecordForm;
