import { Optional } from "sequelize";

export interface RessourceAttributes {
  id?: number;
  title: string;
  description: string;
  id_app_user?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RessourceCreationAttributes extends Optional<RessourceAttributes, "id" | "createdAt" | "updatedAt"> {}