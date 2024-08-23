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
  const currentDeath = deaths.find((death) => death.status === "PRESENT");
  return (
    <Card className="h-full">
      <CardHeader className="p-4">
        {/* <img
          src="https://picsum.photos/200"
          className="w-full h-full pb-1"
          alt="profile_image"
        /> */}
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
