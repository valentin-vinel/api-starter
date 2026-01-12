import { AppUser } from "../app/models/app-user.model.js";
import bcrypt from "bcrypt";
import { sequelize } from "../config/sequelize.js";
import { Project } from "../app/models/project.model.js";
import { AppUserAttributes } from "../app/@types/AppUser.interface.js";
import { TaskAttributes } from "../app/@types/Task.interface.js";
import { ProjectAttributes } from "../app/@types/Project.interface.js";
import { Task } from "../app/models/task.model.js";

console.log("🌱 Seeding tables");

// AppUser
console.log("🚧 Seeding app_user data");
const appUsers: AppUserAttributes[] = [
    { username: 'admin', email: "admin@api-starter.dev", password: "password123", role: "admin", is_active: true},
    { username: 'john-doe', email: "john-doe@api-starter.dev", password: "password123", role: "user", is_active: true}
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
      is_active: appUser.is_active
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
const projects: ProjectAttributes[] = [
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

// Task
console.log("🚧 Seeding task data");
const tasks: TaskAttributes[] = [
    { title: 'Tâche 1', 
      description: "Description de la première tâche.",
      status: "todo",
      project_id: 2,
    },
    { title: 'Tâche 2', 
      description: "Description de la seconde tâche.",
      status: "in_progress",
      project_id: 3,
    },
    { title: 'Tâche 3', 
      description: "Description de la troisième tâche.",
      status: "done",
      project_id: 1,
    },
]

for (const task of tasks) {
  try {
    await Task.create({
      title: task.title,
      description: task.description,
      status: task.status,
      project_id: task.project_id
    })
  } catch (error) {
    console.log("Error with task:", task.title);
		console.error(error);
  }
}

console.log("✅ Datas up");
sequelize.close();