import { Optional } from "sequelize";

export interface AuditLogAttributes {
  id?: number;
  action: string;
  entity: 'project' | 'task';
  user_id?: number;
  entity_id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuditLogCreationAttributes extends Optional<AuditLogAttributes, "id" | "createdAt" | "updatedAt"> {}