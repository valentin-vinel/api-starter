import { Request, Response } from "express";
import { Ressource } from "../models/ressource.model.js";
import { idSchema } from "../schemas/id.schema.js";
import { ressourceSchema, updateRessourceSchema } from "../schemas/ressource.schema.js";

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

// Endpoint: Create one ressource
export const createOneRessource = async (req: Request, res: Response) => {
  try {
    const dataRessource = ressourceSchema.parse(req.body);
    const newRessource = await Ressource.create(dataRessource);

    res.status(201).json(newRessource);
  } catch (error) {
    console.error("Error while creating ressource : ", error)
    res.status(500).json({ error: "Failed to create ressource."})
  }
}

// Endpoint: Update one ressource by id
export async function updateOneRessourceById(req: Request, res: Response) {
  try {
    const { id } = idSchema.parse(req.params);
    const data = updateRessourceSchema.parse(req.body);
    const ressource = await Ressource.findByPk(id);

    if (!ressource) {
      return res.status(404).json({ message: "Ressource not found" });
    };

    const payload: Partial<{
      title: string;
      description: string;
      idAppUser: number;
    }> = {};

    if (data.title !== undefined) payload.title = data.title;
    if (data.description !== undefined) payload.description = data.description;
    if (data.id_app_user !== undefined) payload.idAppUser = data.id_app_user;

    await ressource.update(payload);

    res.json(ressource);
  } catch (error) {
    console.error("Error while updating ressource : ", error)
    res.status(500).json({ error: "Failed to update ressource."})
  }
}

// Endpoint: Delete one ressource by id
export async function deleteOneRessourceById(req: Request, res: Response) {
  try {
    const { id } = idSchema.parse(req.params);
    const ressource = await Ressource.findByPk(id);

    if (!ressource) {
      return res.status(404).json({ message: "Ressource not found" });
    }

    await ressource.destroy();

    res.status(204).send();
  } catch (error) {
    console.error("Error while deleting ressource : ", error)
    res.status(500).json({ error: "Failed to delete ressource."})
  }
}