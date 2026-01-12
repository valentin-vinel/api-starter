import { Request, Response } from "express";
import { AppUser } from "../models/associations.js";
import { idSchema } from "../schemas/id.schema.js";

// Endpoint: Get all app-users
export const listUsers = async(req: Request, res: Response) => {
    try {
        const users = await AppUser.findAll({
            include: [ { association: 'projects' }]
        })

        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users data : ", error)
        res.status(500).json({ error: "Failed to fetch users data."})
    }
}

// Endpoint: Get one app-user
export const getOneUser = async(req: Request, res: Response) => {
    try {
        const { id } = idSchema.parse(req.params);

        const user = await AppUser.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        };

        res.json(user)
    } catch (error) {
        console.error("Error fetching user data : ", error)
        res.status(500).json({ error: "Failed to fetch user data."})
    }
}