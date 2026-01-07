import { z } from "zod";

export const ressourceSchema = z.object({
    title: z.string().trim().nonempty(),
    description: z.string().trim().nonempty(),
    id_app_user: z.number().int().positive(),
})

export const updateRessourceSchema = ressourceSchema.partial();