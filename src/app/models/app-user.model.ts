import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.js";
import { AppUserAttributes, AppUserCreationAttributes } from "../@types/AppUser.interface.js";

export class AppUser extends Model<AppUserAttributes, AppUserCreationAttributes> implements AppUserAttributes {
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;
  declare role: 'admin' | 'user';
  declare is_active: boolean | null;

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
			type: DataTypes.ENUM('admin', 'user'),
			allowNull: false,
			defaultValue: 'user',
		},
		is_active: {
			type: DataTypes.BOOLEAN,
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