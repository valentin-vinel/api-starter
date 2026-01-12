import { AppUser } from "./app-user.model.js";
import { Project } from "./project.model.js";
import { sequelize } from "../../config/sequelize.js";
import { Task } from "./task.model.js";
import { AuditLog } from "./audit-log.model.js";

AppUser.hasMany(Project, {
    foreignKey: {
        name:"owner_id",
        allowNull: false,
    },
    as: "projects"
});
Project.belongsTo(AppUser, {
    foreignKey: {
        name: "owner_id",
        allowNull: false,
    },
    as: "owner"
});

Project.hasMany(Task, {
    foreignKey: {
        name:"project_id",
        allowNull: false,
    },
    as: "tasks"
});
Task.belongsTo(Project, {
    foreignKey: {
        name: "project_id",
        allowNull: false,
    },
    as: "project"
});

AppUser.hasMany(AuditLog, {
    foreignKey: {
        name: "user_id",
        allowNull: false,
    },
    as: "logs"
})
AuditLog.belongsTo(AppUser, {
    foreignKey: {
        name: "user_id",
        allowNull: false,
    },
    as: "user"
})

export { AppUser, Project, Task, AuditLog, sequelize }