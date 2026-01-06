import { Request, Response } from "express";
import { Ressource } from "../models/ressource.model.js";
import { idSchema } from "../schemas/id.schema.js";

// Endpoint: Get all ressources
export const listRessources = async(req: Request, res: Response) => {
    try {
        const ressources = await Ressource.findAll()

        res.status(200).json(ressources);
    } catch (error) {
        console.error("Error fetching ressources data : ", error)
        res.status(500).json({ error: "Failed to fetch ressources data."})
    }
}

// Endpoint: Get one ressource
export const getOneRessource = async(req: Request, res: Response) => {
    try {
        const { id } = idSchema.parse(req.params);

        const ressource = await Ressource.findByPk(id);

        if (!ressource) {
            return res.status(404).json({ message: "Ressource not found" });
        };

        res.json(ressource)
    } catch (error) {
        console.error("Error fetching ressource data : ", error)
        res.status(500).json({ error: "Failed to fetch ressource data."})
    }
}