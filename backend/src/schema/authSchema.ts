// schema/authSchema.ts
import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .email("Invalid email address");

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must contain at least one special character"
  );

export const backendSignupSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: emailSchema,
  password: passwordSchema,
});

export type BackendSignupSchemaType = z.infer<
  typeof backendSignupSchema
>;
