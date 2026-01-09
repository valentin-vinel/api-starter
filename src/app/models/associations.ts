import { AppUser } from "./app-user.model.js";
import { Project } from "./project.model.js";
import { sequelize } from "../../config/sequelize.js";

AppUser.hasMany(Project, {
    foreignKey: {
        name:"id_app_user",
        allowNull: false,
    },
    as: "ressources"
});
Project.belongsTo(AppUser, {
    foreignKey: {
        name: "owner_id",
        allowNull: false,
    },
    as: "owner"
});

export { AppUser, Project, sequelize }