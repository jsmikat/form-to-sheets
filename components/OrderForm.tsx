"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email(),
  address: z.string().min(1, { message: "Address is required" }),
});

export type Inputs = z.infer<typeof formSchema>;

export default function OrderForm() {
  const form = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
    },
  });

  async function onSubmit(values: Inputs) {
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
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Submiting.." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
