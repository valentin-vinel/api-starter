import { z } from "zod";

export const ressourceSchema = z.object({
    title: z.string().trim().nonempty(),
    description: z.string().trim().nonempty(),
})

export const updateRessourceSchema = ressourceSchema.partial();