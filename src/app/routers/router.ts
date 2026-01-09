import { Router } from "express";
import * as appUserController from "../controllers/app-user.controller.js";
import * as projectController from "../controllers/project.controller.js";
import * as authController from "../controllers/auth.controller.js";

export const router = Router();

router.get('/users', appUserController.listUsers);
router.get('/users/:id', appUserController.getOneUser);

router.get('/projects', projectController.listProjects);
router.get('/projects/:id', projectController.getOneProject);
router.post('/projects', projectController.createOneProject);
router.patch('/projects/:id', projectController.updateOneProjectById);
router.delete('/projects/:id', projectController.deleteOneProjectById);

router.post('/login', authController.login);
router.post('/register', authController.register)