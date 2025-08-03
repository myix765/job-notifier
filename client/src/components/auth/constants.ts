import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

export const signUpSchema = z.object({
  email: z.string().nonempty("Email is required"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must include a lowercase letter")
    .regex(/[A-Z]/, "Password must include an uppercase letter")
    .regex(/[^A-Za-z0-9]/, "Password must include a special character"),
  confirmPassword: z.string().nonempty("Password confirmation is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const signInSchema = z.object({
  email: z.string().nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

export const addPhoneSchema = z.object({
  phone: z
    .string()
    .nonempty("Phone number is required")
    .refine((val) => {
      const phoneNumber = parsePhoneNumberFromString(val, "US");
      return phoneNumber?.isValid() ?? false;
    }, {
      message: "Invalid phone number",
    }),
});