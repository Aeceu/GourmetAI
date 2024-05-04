import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Not valid email").min(1, "Required"),
  password: z
    .string()
    .min(8, "Password should atleast 8 characters")
    .max(20, "Password should less that 20 characters"),
});

export const signupSchema = z.object({
  email: z.string().email("Not valid email").min(1, "Required"),
  reemail: z.string().email("Not valid email").min(1, "Required"),
  password: z
    .string()
    .min(8, "Password should atleast 8 characters")
    .max(20, "Password should less that 20 characters"),
});
