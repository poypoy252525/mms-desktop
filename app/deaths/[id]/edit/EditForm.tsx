"use client";
import { newDeathSchemaType } from "@/app/schemas/DeathSchemas";
import { Form } from "@/components/ui/form";
import { Death } from "@prisma/client";
import axios from "axios";
import { RefObject } from "react";
import { useForm } from "react-hook-form";
import ClientDetailsCard from "../../_components/ClientDetailsCard";
import NextOfKinDetailsCard from "../../_components/NextOfKinDetailsCard";
import StatusCard from "../../_components/StatusCard";

interface Props {
  death: Death;
  formRef: RefObject<HTMLFormElement>;
}

const EditForm = ({ death, formRef }: Props) => {
  const form = useForm<newDeathSchemaType>({
    defaultValues: {
      ...death,
    },
  });

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(async (data) => {
          try {
            console.log(data);
            await axios.patch(`/api/deaths/${death.id}`, data);
          } catch (error) {
            console.log(error);
          }
        })}
        className="hidden"
      />
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <ClientDetailsCard form={form} />
        </div>
        <div className="col-span-4">
          <StatusCard form={form} />
        </div>
        <div className="col-span-8">
          <NextOfKinDetailsCard form={form} />
        </div>
      </div>
    </Form>
  );
};

export default EditForm;
