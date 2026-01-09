import { Optional } from "sequelize";

export interface ProjectAttributes {
  id?: number;
  name: string;
  description: string;
  owner_id: number;
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProjectCreationAttributes extends Optional<ProjectAttributes, "id" | "createdAt" | "updatedAt"> {}