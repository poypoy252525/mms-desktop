"use client";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { AttendanceForm, attendanceSchema } from "@/schemas/attendanceSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Attendance } from "@prisma/client";
import axios from "axios";
import { Loader2, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const websocket = new WebSocket(process.env.NEXT_PUBLIC_ESP_IP!);

websocket.onclose = function () {
  console.log("Connection died");
};
websocket.onerror = function () {
  console.log("error");
};
websocket.onopen = function () {
  console.log("Connection established");
};

const AddDialog = () => {
  const form = useForm<AttendanceForm>({
    resolver: zodResolver(attendanceSchema),
  });

  const { toast } = useToast();

  const formRef = useRef<HTMLFormElement>(null);

  const [startHour, setStartHour] = useState<number>();
  const [startMinute, setStartMinute] = useState<number>();
  const [endHour, setEndHour] = useState<number>();
  const [endMinute, setEndMinute] = useState<number>();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (attendanceData: AttendanceForm) => {
    attendanceData.timeStart.setHours(startHour || 6, startMinute);
    attendanceData.timeEnd.setHours(endHour || 8, endMinute);
    try {
      setLoading(true);
      const { data } = await axios.post<Attendance>(
        `/api/attendance`,
        attendanceData
      );
      setOpen(false);
      toast({
        title: "Created",
        description: "New Attendance has been created.",
      });
      websocket.send(data.id);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create new attendance.",
        variant: "destructive",
      });
      console.error("Failed to add new attendance: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(startHour);
  }, [startHour]);

  return (
    <Form {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(handleSubmit)}></form>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus />
            New attendance
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Attendance</DialogTitle>
            {/* <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription> */}
          </DialogHeader>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6 space-y-4">
              <DatePicker label="Start time" form={form} name="timeStart" />
              <FormItem>
                <FormLabel>Start hour</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Hour"
                    value={startHour || ""}
                    onChange={({ target }) => {
                      const parsedValue = parseInt(target.value, 10);
                      console.log(parsedValue);
                      if (!isNaN(parsedValue)) {
                        setStartHour(parsedValue);
                      } else if (target.value === "") {
                        // Optionally, handle the empty case, e.g., reset to 0 or leave blank
                        setStartHour(undefined); // Set to empty string or some other default value
                      }
                    }}
                  />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel>Start minute</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Minute"
                    value={startMinute ?? ""}
                    onChange={({ target }) => {
                      const parsedValue = parseInt(target.value, 10);
                      console.log(parsedValue);
                      if (!isNaN(parsedValue)) {
                        setStartMinute(parsedValue);
                      } else if (target.value === "") {
                        // Optionally, handle the empty case, e.g., reset to 0 or leave blank
                        setStartMinute(undefined); // Set to empty string or some other default value
                      }
                    }}
                  />
                </FormControl>
              </FormItem>
            </div>

            <div className="col-span-6 space-y-4">
              <DatePicker label="Start time" form={form} name="timeEnd" />
              <FormItem>
                <FormLabel>End hour</FormLabel>
                <FormControl>
                  <Input
                    placeholder="End hour"
                    value={endHour || ""}
                    onChange={({ target }) => {
                      const parsedValue = parseInt(target.value, 10);
                      console.log(parsedValue);
                      if (!isNaN(parsedValue)) {
                        setEndHour(parsedValue);
                      } else if (target.value === "") {
                        // Optionally, handle the empty case, e.g., reset to 0 or leave blank
                        setEndHour(undefined); // Set to empty string or some other default value
                      }
                    }}
                  />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel>Start minute</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Minute"
                    value={endMinute ?? ""}
                    onChange={({ target }) => {
                      const parsedValue = parseInt(target.value, 10);
                      console.log(parsedValue);
                      if (!isNaN(parsedValue)) {
                        setEndMinute(parsedValue);
                      } else if (target.value === "") {
                        // Optionally, handle the empty case, e.g., reset to 0 or leave blank
                        setEndMinute(undefined); // Set to empty string or some other default value
                      }
                    }}
                  />
                </FormControl>
              </FormItem>
            </div>
          </div>
          <Button
            type="submit"
            onClick={() => formRef.current?.requestSubmit()}
            disabled={loading}
          >
            {loading && <Loader2 className="animate-spin" />}
            Submit
          </Button>
        </DialogContent>
      </Dialog>
    </Form>
  );
};

export default AddDialog;
