import { Optional } from "sequelize";

export interface AppUserAttributes {
  id?: number;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  is_active: boolean | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AppUserCreationAttributes extends Optional<AppUserAttributes, "id" | "role" | "createdAt" | "updatedAt"> {}