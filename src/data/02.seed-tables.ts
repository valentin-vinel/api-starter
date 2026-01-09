import { AppUser } from "../app/models/app-user.model.js";
import bcrypt from "bcrypt";
import { sequelize } from "../config/sequelize.js";
import { Project } from "../app/models/project.model.js";

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

// Project
console.log("🚧 Seeding project data");
const projects = [
    { name: 'Projet 1', 
      description: "Description du premier projet.",
      owner_id: 1,
      is_active: true,
    },
    { name: 'Projet 2', 
      description: "Description du second projet.",
      owner_id: 1,
      is_active: true,
    },
    { name: 'Projet 3',
      description: "Description du troisième projet.",
      owner_id: 1,
      is_active: true,
    },
]

for (const project of projects) {
  try {
    await Project.create({
      name: project.name,
      description: project.description,
      owner_id: project.owner_id,
      is_active: project.is_active
    })
  } catch (error) {
    console.log("Error with project:", project.name);
		console.error(error);
  }
}

console.log("✅ Datas up");
sequelize.close();