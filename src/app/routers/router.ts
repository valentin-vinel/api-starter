import { Router } from "express";
import * as appUserController from "../controllers/app-user.controller.js";
import * as ressourceController from "../controllers/ressource.controller.js";
import * as authController from "../controllers/auth.controller.js";

export const router = Router();

router.get('/users', appUserController.listUsers);
router.get('/users/:id', appUserController.getOneUser);

router.get('/ressources', ressourceController.listRessources);
router.get('/ressources/:id', ressourceController.getOneRessource);
router.post('/ressources', ressourceController.createOneRessource);
router.patch('/ressources/:id', ressourceController.updateOneRessourceById);
router.delete('/ressources/:id', ressourceController.deleteOneRessourceById);

router.post('/login', authController.login);
router.post('/register', authController.register)