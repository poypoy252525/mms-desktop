"use client";
import PageHeading from "@/app/_components/PageHeading";
import PageWrapper from "@/app/_components/PageWrapper";
import { burialSchema } from "@/app/schemas/BurialSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Burial } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { z } from "zod";

type burialSchemeType = z.infer<typeof burialSchema>;

const CreateBurialPage = () => {
  const router = useRouter();
  const form = useForm<burialSchemeType>({
    resolver: zodResolver(burialSchema),
    defaultValues: {
      block: "",
      row: "",
      plotNumber: "",
    },
  });

  const onSubmit = async (data: burialSchemeType) => {
    await axios.post<Burial>("/api/burials", data);
    router.push("/burials");
    router.refresh();
  };

  return (
    <PageWrapper>
      <PageHeading>Create Burial</PageHeading>
      <Form {...form}>
        <form
          method="POST"
          onSubmit={form.handleSubmit((data) => onSubmit(data))}
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-4">
              <FormField
                control={form.control}
                name="block"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Block</FormLabel>
                    <FormControl>
                      <Input placeholder="Input block..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex space-x-4 w-full">
                <FormField
                  control={form.control}
                  name="row"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Row</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
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
                  control={form.control}
                  name="plotNumber"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Plot number</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Input number..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex space-x-4 justify-end">
              <Button
                variant="secondary"
                type="button"
                onClick={() => router.push("/burials")}
              >
                Cancel
              </Button>
              <Button type="submit">Create Burial</Button>
            </div>
          </div>
        </form>
      </Form>
    </PageWrapper>
  );
};

export default CreateBurialPage;
