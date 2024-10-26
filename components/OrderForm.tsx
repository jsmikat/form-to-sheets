"use client";

import Image from "next/image";
import { useState } from "react";

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
import { paymentMethods } from "@/lib/constants";
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
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      product: "",
      quantity: 1,
      paymentMethod: "",
      transactionId: "",
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
        className="relative mx-auto w-full max-w-3xl space-y-8 py-10"
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter your number" {...field} />
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
          name="product"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  const selectedIndex = productOptions.options.indexOf(value);
                  const selectedPrice = parseInt(
                    productOptions.prices[selectedIndex]
                  );
                  setPrice(selectedPrice);
                }}
              >
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

        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  placeholder="Enter your full address"
                  {...field}
                  onChange={(e) => {
                    const inputNumber = Number(e.target.value);
                    field.onChange(inputNumber);
                    setQuantity(inputNumber);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="relative -bottom-4 text-sm">
          <span className="text-rose-700">*</span> You have to pay 10% of the
          total cost to confirm your order.
        </p>
        <div className="rounded-sm border border-[#fcbf49] p-4">
          <div className="flex justify-between">
            <p className="text-sm">Total Price</p>
            <p className="text-sm">৳{price * quantity}</p>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <p>You have to pay (10%)</p>
            <p>৳{price * quantity * 0.1}</p>
          </div>
        </div>
        <div className="flex h-12 items-center justify-between gap-8 rounded-sm border border-[#fcbf49] pl-2 pr-4">
          <div className="flex">
            <Image
              className="size-[60px]"
              src="/logo/bkash.svg"
              width={60}
              height={60}
              alt="bkash logo"
            />
            <Image
              className="size-[60px]"
              src="/logo/nagad.svg"
              width={60}
              height={60}
              alt="nagad logo"
            />
          </div>
          <p className="font-bold">01945227623</p>
        </div>
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Method</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Payment Method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {paymentMethods.map((method, index) => (
                    <SelectItem key={index} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="transactionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter your transaction ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="bg-[#fcbf49] text-black hover:bg-[#fba824] disabled:cursor-not-allowed"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Submiting.." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
