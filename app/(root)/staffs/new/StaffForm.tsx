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
import useSocket from "@/hooks/use-socket";
import { useStaffForm } from "@/hooks/use-staff-form";
import { StaffForm as StaffFormType, staffSchema } from "@/schemas/StaffSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const StaffForm = () => {
  const form = useForm<StaffFormType>({
    resolver: zodResolver(staffSchema),
  });

  const formRef = useRef<HTMLFormElement>(null);
  const setFormRef = useStaffForm((state) => state.setFormRef);

  const { fingerprintId } = useSocket();

  useEffect(() => {
    if (formRef && formRef.current) {
      setFormRef(formRef);
    }
  }, [formRef, formRef.current]);

  useEffect(() => {
    if (fingerprintId) {
      form.setValue("fingerprintId", fingerprintId);
    }
  }, [fingerprintId]);

  const handleSubmit = async (staffForm: StaffFormType) => {
    try {
      const { data } = await axios.post(`/api/staffs`, staffForm);
      console.log(data);
    } catch (error) {
      console.error("Failed to create new staff: ", error);
    }
  };

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit((staffForm) => handleSubmit(staffForm))}
      >
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
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default StaffForm;
