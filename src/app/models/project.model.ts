import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.js";
import { ProjectAttributes, ProjectCreationAttributes } from "../@types/Project.interface.js";

export class Project extends Model<ProjectAttributes, ProjectCreationAttributes> implements ProjectAttributes {
    declare id: number;
    declare name: string;
    declare description: string;
    declare owner_id: number;
    declare is_active: boolean;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Project.init(
    {
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },
    {
		sequelize,
		tableName: "project",
		schema: "public",
	},
)