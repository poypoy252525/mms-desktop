"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useStaffForm } from "@/hooks/use-staff-form";
import { useToast } from "@/hooks/use-toast";
import { StaffForm as StaffFormType, staffSchema } from "@/schemas/StaffSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Staff } from "@prisma/client";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const websocket = new WebSocket(process.env.NEXT_PUBLIC_ESP_IP!);
websocket.onopen = function () {
  console.log("Connection established");
};
websocket.onclose = function () {
  console.log("Connection died");
};
websocket.onerror = function () {
  console.log("error");
};

const StaffForm = () => {
  const form = useForm<StaffFormType>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      fingerprintId: -1,
      name: "",
    },
  });

  const formRef = useRef<HTMLFormElement>(null);
  const setFormRef = useStaffForm((state) => state.setFormRef);
  const setLoading = useStaffForm((state) => state.setLoading);
  const { toast } = useToast();
  const router = useRouter();

  const [fingerprintId, setFingerprintId] = useState<number>();
  const [scanning, setScanning] = useState<boolean>(false);

  useEffect(() => {
    if (formRef && formRef.current) {
      setFormRef(formRef);
    }
  }, [formRef, formRef.current]);

  useEffect(() => {
    if (fingerprintId) {
      form.setValue("fingerprintId", fingerprintId);
      setScanning(false);
    }
  }, [fingerprintId]);

  useEffect(() => {
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data.mode === "enroll") {
        setFingerprintId(data.fingerprintId);
        console.log(data.fingerprintId);
      }
    };
  }, [websocket.onmessage]);

  const handleSubmit = async (staffForm: StaffFormType) => {
    try {
      setLoading(true);
      const { data } = await axios.post<Staff>(`/api/staffs`, staffForm);
      toast({
        title: "Created",
        description: `${data.name} with fingerprint ID: ${data.fingerprintId}`,
      });
      router.push(`/staffs`);
      router.refresh();
    } catch (error) {
      console.error("Failed to create new staff: ", error);
      if (error instanceof AxiosError) {
        toast({
          title: "Error",
          description: `Failed to create new staff. ${error.response?.data.message}`,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit((staffForm) => handleSubmit(staffForm))}
      />
      <Card>
        <CardHeader>
          <CardTitle>Staff details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Staff name</FormLabel>
                  <FormControl>
                    <Input placeholder="staff name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fingerprintId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fingerprint ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Fingerprint ID"
                      {...field}
                      value={fingerprintId || field.value}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              onClick={() => {
                websocket.send(JSON.stringify({ event: "enroll" }));
                setScanning(true);
              }}
              disabled={scanning}
            >
              {scanning && <Loader2 className="animate-spin" />}
              Start scan
            </Button>
          </div>
        </CardContent>
      </Card>
    </Form>
  );
};

export default StaffForm;
