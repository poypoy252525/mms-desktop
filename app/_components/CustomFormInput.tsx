"use client";
import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  description?: string;
  placeholder?: string;
  type?: string;
  valueType?: string;
  maxLength?: number;
  max?: number;
}

const CustomFormInput = <T extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholder,
  type = "text",
  valueType = "string",
  max,
  maxLength,
}: Props<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              maxLength={maxLength}
              max={max}
              type={type}
              placeholder={placeholder}
              {...field}
              onChange={({ target }) => {
                const value =
                  type === "number" && valueType === "number"
                    ? Number(target.value)
                    : target.value;
                field.onChange(value);
              }}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormInput;
