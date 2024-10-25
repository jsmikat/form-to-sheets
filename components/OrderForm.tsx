"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
import { Textarea } from "@/components/ui/textarea";
import { postFormGoogleSpreadsheet } from "@/lib/actions";
import { FormProps, formSchema } from "@/lib/schema";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ProductProps {
  options: string[];
  prices: string[];
}

export default function OrderForm({
  productOptions,
}: {
  productOptions: ProductProps;
}) {
  // const [dropdownOptions, setDropdownOptions] = useState<
  //   { options: string[]; prices: string[] } | undefined
  // >();

  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      product: "",
    },
  });

  // useEffect(() => {
  //   async function fetchOptions() {
  //     try {
  //       const response = await axios.get("/api/spreadsheet");
  //       if (response.status !== 200) {
  //         throw new Error("Failed to fetch options");
  //       }
  //       const data = response.data;
  //       setDropdownOptions(data);
  //     } catch (error) {
  //       console.error("Failed to fetch options", error);
  //     }
  //   }

  //   fetchOptions();
  // }, []);

  async function onSubmit(values: FormProps) {
    try {
      const response = await postFormGoogleSpreadsheet(values);
      if (response.status === 200) {
        toast.success(
          "Your order has been submitted successfully. We will contact you shortly."
        );
      } else {
        toast.error("Failed to submit the form. Please try again.");
      }
      form.reset();
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-3xl space-y-8 py-10"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your full address"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"product"}
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Product" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {productOptions.options.map((option, index) => (
                    <SelectItem key={index} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Submiting.." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
