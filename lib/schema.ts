import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email(),
  address: z.string().min(1, { message: "Address is required" }),
  product: z.string().min(1, { message: "Product is required" }),
});

export type FormProps = z.infer<typeof formSchema>;
