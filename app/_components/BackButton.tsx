"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const BackButton = () => {
  const path = usePathname();
  const router = useRouter();

  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      className="w-7 h-7 mr-2"
      onClick={() => {
        const arrayPath = path.split("/");
        arrayPath.splice(arrayPath.length - 1);

        const previousPath = arrayPath.join("/");

        console.log(previousPath);

        router.push(
          previousPath.startsWith("/") ? previousPath : "/" + previousPath
        );
      }}
    >
      <ChevronLeft className="w-4 h-4" />
    </Button>
  );
};

export default BackButton;
