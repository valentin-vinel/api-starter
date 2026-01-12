import { z } from "zod";

export const projectSchema = z.object({
    name: z.string().trim().nonempty(),
    description: z.string().trim().nonempty(),
    owner_id: z.number().int().positive(),
    is_active: z.boolean(),
})

export const updateProjectSchema = projectSchema.partial();