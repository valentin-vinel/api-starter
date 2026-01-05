import { Request, Response } from "express";
import { AppUser } from "../models/app-user.model.js";

// Endpoint: Get all app-users
export const listUsers = async(req: Request, res: Response) => {
    try {
        const users = await AppUser.findAll()

        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users data : ", error)
        res.status(500).json({ error: "Failed to fetch users data."})
    }
}