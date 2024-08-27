"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const BackButtom = () => {
  const path = usePathname();
  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      className="w-7 h-7 mr-2"
      onClick={() => window.history.back()}
    >
      <ChevronLeft className="w-4 h-4" />
    </Button>
  );
};

export default BackButtom;
