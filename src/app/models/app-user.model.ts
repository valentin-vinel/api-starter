import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.js";
import { AppUserAttributes, AppUserCreationAttributes } from "../@types/AppUser.interface.js";

export class AppUser extends Model<AppUserAttributes, AppUserCreationAttributes> implements AppUserAttributes {
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;
  declare role: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

AppUser.init(
	{
		username: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		email: {
			type: DataTypes.TEXT,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		role: {
			type: DataTypes.TEXT,
			allowNull: false,
			defaultValue: "user",
		}
	},
	{
		sequelize,
		tableName: "app_user",
		schema: "public",
		defaultScope: {
			attributes: { exclude: ['password'] },
		},
		scopes: {
			withPassword: {
				attributes: { include: ['password'] },
			},
		}
	},
);