"use client";
import { Button } from "@/components/ui/button";
import { useStaffForm } from "@/hooks/use-staff-form";
import { Plus } from "lucide-react";
import React from "react";

const SubmitButton = () => {
  const formRef = useStaffForm((state) => state.formRef);
  return (
    <Button
      type="submit"
      onClick={() => {
        formRef?.current?.requestSubmit();
      }}
    >
      <Plus />
      Create
    </Button>
  );
};

export default SubmitButton;
