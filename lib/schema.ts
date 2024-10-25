import { z } from "zod";

const phoneRegex = /^01\d{9}$/;

export const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  phone: z.string().regex(phoneRegex, { message: "Phone number is invalid" }),
  email: z.string().email(),
  address: z.string().min(1, { message: "Address is required" }),
  product: z.string().min(1, { message: "Product is required" }),
  quantity: z
    .number()
    .int()
    .nonnegative({ message: "Quantity can't be negative" })
    .min(1, { message: "Quantity is required" }),
  paymentMethod: z.string().min(4, { message: "Payment method is required" }),
  transactionId: z.string().min(5, { message: "Transaction ID is required" }),
});

export type FormProps = z.infer<typeof formSchema>;
