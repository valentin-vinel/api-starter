import { Router } from "express";
import * as appUserController from "../controllers/app-user.controller.js"

export const router = Router();

router.get('/users', appUserController.listUsers);
router.get('/users/:id', appUserController.getOneUser);