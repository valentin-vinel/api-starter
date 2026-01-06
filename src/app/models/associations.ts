import { AppUser } from "./app-user.model.js";
import { Ressource } from "./ressource.model.js";
import { sequelize } from "../../config/sequelize.js";

AppUser.hasMany(Ressource, {
    foreignKey: {
        name:"id_app_user",
        allowNull: false,
    },
    as: "ressources"
});
Ressource.belongsTo(AppUser, {
    foreignKey: {
        name: "id_app_user",
        allowNull: false,
    },
    as: "appUser"
});

export { AppUser, Ressource, sequelize }