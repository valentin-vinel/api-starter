import { Optional } from "sequelize";

export interface TaskAttributes {
  id?: number;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  project_id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TaskCreationAttributes extends Optional<TaskAttributes, "id" | "createdAt" | "updatedAt"> {}