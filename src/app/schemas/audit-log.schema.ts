import { z } from "zod";

export const auditLogSchema = z.object({
    action: z.string().trim().nonempty(),
    user_id: z.number().int().positive(),
    entity_id: z.number().int().positive(),
})

export const updateAuditLogSchemaSchema = auditLogSchema.partial();