"use client";
import { burialSchema, BurialSchemaType } from "@/app/schemas/BurialSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Burial } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const AddBurialForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<BurialSchemaType>({
    resolver: zodResolver(burialSchema),
    defaultValues: {
      block: "",
      plotNumber: "",
      row: "",
    },
  });
  return (
    <Form {...form}>
      <form
        id="burialForm"
        onSubmit={form.handleSubmit(async (data) => {
          try {
            await axios.post<Burial>("/api/burials", data);
            router.refresh();
            toast({
              title: "Created",
              description: "Burial successfully created",
            });
          } catch (error) {
            toast({
              title: "Failed",
              description: "Failed to save burial",
              variant: "destructive",
            });
          }
        })}
      />
      <div className="flex flex-col space-y-2">
        <FormField
          name="block"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Block</FormLabel>
              <FormControl>
                <Input placeholder="Block (building)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="row"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Row</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select row" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Rows</SelectLabel>
                      <SelectItem value="A">A (First row)</SelectItem>
                      <SelectItem value="B">B (Second row)</SelectItem>
                      <SelectItem value="C">C (Third row)</SelectItem>
                      <SelectItem value="D">D (Fourth row)</SelectItem>
                      <SelectItem value="E">E (Fifth row)</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="plotNumber"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plot number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Plot number (cell of building)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          size="sm"
          type="submit"
          form="burialForm"
          formTarget="burialForm"
        >
          Add
        </Button>
      </div>
    </Form>
  );
};

export default AddBurialForm;
