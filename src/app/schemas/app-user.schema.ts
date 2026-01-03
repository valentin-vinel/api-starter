import { z } from "zod";

export const appUserSchema = z.object({
    username: z.string().trim().nonempty(),
    email: z.string().trim().nonempty(),
    password: z.string().min(6),
})

export const updateAppUserSchema = appUserSchema.partial();