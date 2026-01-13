import "dotenv/config";
import { Request, Response } from "express";
import { AppUser } from "../models/associations.js";
import { appUserSchema } from "../schemas/app-user.schema.js";
import { loginSchema } from "../schemas/login.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(req: Request, res: Response) {
    try {
        const { username, email, password } = appUserSchema.parse(req.body);
        
        const existingAppUser = await AppUser.scope("withPassword").findOne({
            where: { email }
        });
        if (existingAppUser) {
            return res.status(400).json({ error: "Email déjà utilisé"});
        }

        const password_hash = await bcrypt.hash(password, 10);

        await AppUser.create({ username, email, password: password_hash });

        res.status(201).json({ message: "Compte utilisateur crée" });
    } catch (error) {
        console.error("Register error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function login(req: Request, res: Response) {
	try {
		const { email, password } = loginSchema.parse(req.body);

		const appUser = await AppUser.scope("withPassword").findOne({ 
            where: { email },
        });
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

export async function logout(req: Request, res: Response) {
	try {
		res.clearCookie('token', {
			httpOnly: true,
			secure: false,
			// sameSite: 'none'
		});

		res.json({ message: 'Déconnexion réussie' });
	} catch (error) {
		console.error("Logout error:", error);
		res.status(500).json({ error: "Internal server error" });
	}
}