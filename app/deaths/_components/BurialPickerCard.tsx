import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import React from "react";

const BurialPickerCard = () => {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Burial</CardTitle>
        <CardDescription>Location of the death's burial</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default BurialPickerCard;
