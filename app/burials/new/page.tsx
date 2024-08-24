"use client";
import CustomFormInput from "@/app/_components/CustomFormInput";
import PageHeading from "@/app/_components/PageHeading";
import PageWrapper from "@/app/_components/PageWrapper";
import { burialSchema } from "@/app/schemas/BurialSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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

import { useForm } from "react-hook-form";
import { z } from "zod";

type burialSchemeType = z.infer<typeof burialSchema>;

const CreateBurialPage = () => {
  const { toast } = useToast();
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
    try {
      const { data: result } = await axios.post<{ isExist: boolean }>(
        "/api/burials/exist",
        {
          block: data.block,
          row: data.row,
          plotNumber: data.plotNumber,
        }
      );
      if (result.isExist) return console.log("burial already exist");
      try {
        await axios.post<Burial>("/api/burials", data);
        router.push("/burials");
        router.refresh();
        toast({
          title: "Created",
          description: "Burial is successfully created",
        });
      } catch (error) {
        console.log("can not post new burials", error);
      }
    } catch (error) {
      toast({
        title: "Burial error",
        description: "Burial already exist",
        variant: "destructive",
      });
    }
  };

  return (
    <PageWrapper>
      <PageHeading>Create Burial</PageHeading>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => onSubmit(data))}>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-4">
              <CustomFormInput
                control={form.control}
                name="block"
                label="Block"
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
                <CustomFormInput
                  control={form.control}
                  name="plotNumber"
                  label="Plot number"
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
