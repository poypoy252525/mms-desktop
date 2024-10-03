import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Request, User } from "@prisma/client";
import axios from "axios";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";

interface RequestNotification extends Request {
  user: User;
}

const NotificationPopover = () => {
  const [requests, setRequests] = useState<RequestNotification[]>();
  useEffect(() => {
    (async () => {
      try {
        const { data: requests } = await axios.get<RequestNotification[]>(
          `/api/admin/notifications`
        );
        if (requests) setRequests(requests);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Bell className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <header className="flex items-center w-full px-5 py-3">
          <span>Notification</span>
        </header>
        <Separator />
        <ScrollArea className="p-4  max-h-[350px] w-full">
          <div className="space-y-2">
            {requests?.map((request) => (
              <Button
                key={request.id}
                variant="outline"
                className="w-full h-auto whitespace-normal text-left font-normal justify-start text-sm"
                onClick={() => console.log("second")}
              >
                <span className="text-xs font-semibold">{`${request.user.firstName} ${request.user.lastName}`}</span>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopover;
