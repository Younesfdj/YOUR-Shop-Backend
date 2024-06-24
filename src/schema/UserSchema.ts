import { z } from "zod";

export const UserSchema = z
  .object({
    UserId: z.number().optional(),
    UserName: z
      .string()
      .min(4, { message: "Name must be more than 4 caracters" }),
    UserEmail: z.string().email(),
    UserPassword: z
      .string()
      .min(6, { message: "Password must be more than 6 caracters" }),
    UserPhone: z.string().min(10).max(10),
    UserRole: z.enum(["ADMIN", "USER"]).default("USER"),
  })
  .superRefine((input, refinementContext) => {
    if (isNaN(parseInt(input.UserPhone))) {
      return refinementContext.addIssue({
        path: ["UserPhone"],
        code: z.ZodIssueCode.custom,
        message: "Please enter a valid phone number",
      });
    }
  });
export const LogInUserSchema = z.object({
  UserEmail: z.string().email(),
  UserPassword: z.string().min(6),
});
