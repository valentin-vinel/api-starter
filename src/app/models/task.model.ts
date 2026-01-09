import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.js";
import { TaskAttributes, TaskCreationAttributes } from "../@types/Task.interface.js";

export class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
    declare id: number;
    declare title: string;
    declare description: string;
    declare status: 'todo' | 'in_progress' | 'done';
    declare project_id: number;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Task.init(
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
        status: {
            type: DataTypes.ENUM('todo', 'in_progress', 'done'),
            allowNull: false,
        },
        project_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }        
    },
    {
        sequelize,
        tableName: "task",
        schema: "public",
    },
)