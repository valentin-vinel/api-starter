import "dotenv/config";
import { Request, Response } from "express";
import { AppUser } from "../models/app-user.model.js";
import { appUserSchema } from "../schemas/app-user.schema.js";
import { loginSchema } from "../schemas/login.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function login(req: Request, res: Response) {
	try {
		const { email, password } = loginSchema.parse(req.body);

		const appUser = await AppUser.findOne({ where: { email } });
		if (!appUser) {
			return res.status(401).json({ error: "Email ou mot de passe incorrect" });
		}

		const validPassword = await bcrypt.compare(password, appUser.password);
		if (!validPassword) {
			return res.status(401).json({ error: "Email ou mot de passe incorrect" });
		}

		const token = jwt.sign({ id: appUser.id, role: appUser.role }, process.env.JWT_SECRET as string, {
			expiresIn: "3h",
		});

		res.cookie('token', token, {
			httpOnly: true,
			secure: false,
			// sameSite: 'none',
            maxAge: 60 * 60 * 1000,
		}).json({ message: "Connexion réussie" });
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
}