"use client";
import PageHeaderWithBack from "@/app/_components/PageHeaderWithBack";
import { BurialVacantSchemaType } from "@/app/schemas/BurialSchema";
import { newDeathSchema, newDeathSchemaType } from "@/app/schemas/DeathSchemas";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Burial } from "@prisma/client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import BurialPickerCard from "../_components/BurialPickerCard";
import ClientDetailsCard from "./ClientDetailsCard";
import NextOfKinDetailsCard from "./NextOfKinDetailsCard";
import StatusCard from "./StatusCard";

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
      // console.log(data);
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
          <PageHeaderWithBack title="Create new record" />
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
