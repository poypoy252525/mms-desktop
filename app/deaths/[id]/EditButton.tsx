"use client";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const EditButton = ({ id }: { id: string }) => {
  const router = useRouter();
  return (
    <Button
      size="sm"
      variant="outline"
      onClick={() => router.push(`/deaths/${id}/edit`)}
    >
      <Pencil className="w-4 h-4 mr-2" />
      Edit
    </Button>
  );
};

export default EditButton;
