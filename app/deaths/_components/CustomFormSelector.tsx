import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props<T extends string> {
  placeholder: string;
  items: T[] | undefined;
  callback: (value: string) => void;
}

const CustomFormSelector = <T extends string>({
  placeholder,
  items,
  callback,
}: Props<T>) => {
  return (
    <Select onValueChange={(value) => callback(value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{placeholder}</SelectLabel>
          {items?.map((item, index) => (
            <SelectItem key={index} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CustomFormSelector;

// interface Props<T extends FieldValues> {
//   control: Control<T>;
//   name: Path<T>;
//   label: string;
//   data: T;
//   placeholder?: string;
//   description?: string;
// }

// const CustomFormSelector = <T extends FieldValues>({
//   control,
//   name,
//   label,
//   placeholder,
//   data,
//   description,
// }: Props<T>) => {
//   return (
//     <FormField
//       control={control}
//       name={name}
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>{label}</FormLabel>
//           <Select onValueChange={field.onChange} defaultValue={field.value}>
//             <FormControl>
//               <SelectTrigger>
//                 <SelectValue placeholder={placeholder} />
//               </SelectTrigger>
//             </FormControl>
//             <SelectContent>
//               <SelectItem value="m@example.com">m@example.com</SelectItem>
//               <SelectItem value="m@google.com">m@google.com</SelectItem>
//               <SelectItem value="m@support.com">m@support.com</SelectItem>
//             </SelectContent>
//           </Select>
//           <FormDescription>
//             {description}
//             <Link href="/examples/forms">email settings</Link>.
//           </FormDescription>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// };

// export default CustomFormSelector;
