import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Burial, Death } from "@prisma/client";

const DeathCard = async ({
  burial,
}: {
  burial: Burial & { deaths: Death[] };
}) => {
  const { deaths } = burial;
  const currentDeath = deaths.find((death) => death.status === "ACTIVE");
  return (
    <Card className="h-full">
      <CardHeader className="p-4">
        <CardTitle className="text-lg">
          {`${burial.block} - ${burial.row + burial.plotNumber}`}
        </CardTitle>
        <CardDescription>
          {currentDeath
            ? `${currentDeath?.firstName} ${currentDeath?.lastName}`
            : "Vacant"}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default DeathCard;
