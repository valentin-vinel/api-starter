import { Request, Response } from "express";
import { AppUser } from "../models/app-user.model.js";

// Endpoint: Get all app-users
export const getAll = async(req: Request, res: Response) => {
    try {
        const users = await AppUser.findAll()

        res.json(users);
    } catch (error) {
        console.log("Error fetching users data : ", error)
        res.status(500).json({ error: "Failed to fetch users data."})
    }
}