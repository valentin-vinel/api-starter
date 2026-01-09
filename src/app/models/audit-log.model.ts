import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/sequelize.js";
import { AuditLogAttributes, AuditLogCreationAttributes } from "../@types/AuditLog.interface.js";

export class AuditLogs extends Model<AuditLogAttributes, AuditLogCreationAttributes> implements AuditLogAttributes {
    declare id: number;
    declare action: string;
    declare entity: 'project' | 'task';
    declare user_id: number;
    declare entity_id: number;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

AuditLogs.init(
    {
        action: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        entity: {
            type: DataTypes.ENUM('project', 'task'),
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        entity_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }      
    },
    {
        sequelize,
        tableName: "audit_logs",
        schema: "public",
    },
)