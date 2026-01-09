import { AppUser } from "../app/models/app-user.model.js";
import bcrypt from "bcrypt";
import { sequelize } from "../config/sequelize.js";
import { Ressource } from "../app/models/project.model.js";

console.log("🌱 Seeding tables");

// AppUser
console.log("🚧 Seeding app_user data");
const appUsers = [
    { username: 'admin', email: "admin@api-starter.dev", password: "password123", role: "admin"},
    { username: 'john-doe', email: "john-doe@api-starter.dev", password: "password123", role: "user"}
];

let adminUser = null;

for (const appUser of appUsers) {
  try {
    const password_hash = await bcrypt.hash(appUser.password, 10);
    const createdUser = await AppUser.create({
      username: appUser.username,
      email: appUser.email,
      password: password_hash,
      role: appUser.role,
    })

    if (appUser.email === "admin@api-starter.dev") {
      adminUser = createdUser;
    }
  } catch (error) {
    console.log("Error with appuser:", appUser.username);
		console.error(error);
  }
}

// Ressource
console.log("🚧 Seeding ressource data");
const ressources = [
    { title: 'Ressource 1', 
      description: "Description de la première ressource.",
      id_app_user: 1
    },
    { title: 'Ressource 2', 
      description: "Description de la seconde ressource.",
      id_app_user: 1
    },
    { title: 'Ressource 3',
      description: "Description de la troisième ressource.",
      id_app_user: 1
    },
]

for (const ressource of ressources) {
  try {
    await Ressource.create({
      title: ressource.title,
      description: ressource.description,
      id_app_user: ressource.id_app_user,
    })
  } catch (error) {
    console.log("Error with ressource:", ressource.title);
		console.error(error);
  }
}

console.log("✅ Datas up");
sequelize.close();