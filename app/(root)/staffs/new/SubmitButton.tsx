"use client";
import { Button } from "@/components/ui/button";
import { useStaffForm } from "@/hooks/use-staff-form";
import { Loader2, Plus } from "lucide-react";
import React from "react";

const SubmitButton = () => {
  const formRef = useStaffForm((state) => state.formRef);
  const loading = useStaffForm((state) => state.loading);
  return (
    <Button
      type="submit"
      onClick={() => {
        formRef?.current?.requestSubmit();
      }}
      disabled={loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : <Plus />}
      Create
    </Button>
  );
};

export default SubmitButton;
