import { z } from "zod";

export const taskSchema = z.object({
    title: z.string().trim().nonempty(),
    description: z.string().trim().nonempty(),
    owner_id: z.number().int().positive(),
})

export const updateTaskSchema = taskSchema.partial();