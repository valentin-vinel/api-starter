import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.js";
import { RessourceAttributes, RessourceCreationAttributes } from "../@types/Ressource.interface.js";

export class Ressource extends Model<RessourceAttributes, RessourceCreationAttributes> implements RessourceAttributes {
    declare id: number;
    declare title: string;
    declare description: string;
    declare id_app_user: number;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Ressource.init(
    {
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        id_app_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
		sequelize,
		tableName: "ressource",
		schema: "public",
	},
)