import { Loader2 } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <Loader2 className="animate-spin mt-40" />
    </div>
  );
};

export default loading;
