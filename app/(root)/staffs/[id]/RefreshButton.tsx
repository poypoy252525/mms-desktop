"use client";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const RefreshButton = () => {
  const router = useRouter();
  return (
    <Button
      size="icon"
      onClick={() => {
        router.refresh();
      }}
      variant="ghost"
    >
      <RefreshCcw />
    </Button>
  );
};

export default RefreshButton;
