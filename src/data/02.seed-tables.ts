import { AppUser } from "../app/models/app-user.model.js";
import bcrypt from "bcrypt";
import { sequelize } from "../config/sequelize.js";

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

console.log("✅ Datas up");
sequelize.close();