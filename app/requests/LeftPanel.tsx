"use client";

import { Request, User } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export interface FormDataType {
  firstName: string;
  lastName: string;
  causeOfDeath: string;
  dateOfBirth: string;
  dateOfDeath: string;
  relativeName: string;
  relativeRelationship: string;
  contact: string;
}

const getFormData = (formData: any): FormDataType => {
  return formData as FormDataType;
};

const getFormattedDate = (date: string): string => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const LeftPanel = ({
  requests,
}: {
  requests: (Request & {
    user: User;
  })[];
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const router = useRouter();

  return (
    <div className="max-h-full h-full flex flex-col overflow-hidden">
      <div className="h-[50px] border-b border-border flex items-center px-4">
        <span className="font-bold text-sm whitespace-nowrap">
          All requests
        </span>
      </div>
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full px-4 py-2">
          {requests.map(({ user, status, formData }, index) => (
            <div key={user.id} className="my-2">
              <Button
                variant="outline"
                className={`flex flex-col space-y-1 w-full h-auto whitespace-normal text-left font-normal items-start text-sm ${
                  selectedIndex === index && "bg-accent"
                }`}
                onClick={() => {
                  setSelectedIndex(index);
                  router.push(`/requests/${user.id}`);
                }}
              >
                <div className="w-full flex justify-between items-center">
                  <span className="text-xs font-semibold">{`${user.firstName} ${user.lastName}`}</span>
                  <Badge variant="outline" className="text-xs">
                    {status.toLowerCase()}
                  </Badge>
                </div>
                <span className="line-clamp-2 text-xs text-muted-foreground">{`${getFormattedDate(
                  getFormData(formData).dateOfBirth
                )}, ${getFormattedDate(getFormData(formData).dateOfDeath)}, ${
                  getFormData(formData).causeOfDeath
                }, ${getFormData(formData).relativeName}, ${
                  getFormData(formData).relativeRelationship
                }`}</span>
              </Button>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftPanel;
