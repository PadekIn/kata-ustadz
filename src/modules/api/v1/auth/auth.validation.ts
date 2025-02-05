import { z } from "zod";

export const registerSchema = z.object({
    fullname: z.string().min(3),
    phone: z.string().regex(/^62\d{9,}$/, { message: "Phone number must start with 62 and be at least 11 digits long" }),
    gender: z.enum(["Male", "Female"]),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6)
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
});