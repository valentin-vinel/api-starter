import { Request, Response } from "express";
import { Project } from "../models/associations.js";
import { idSchema } from "../schemas/id.schema.js";
import { projectSchema, updateProjectSchema } from "../schemas/project.schema.js";

// Endpoint: Get all projects
export const listProjects = async(req: Request, res: Response) => {
    try {
        const projects = await Project.findAll({
          include: [ 
            { association: "tasks",
              attributes: ["id", "title", "description", "status"],
              required: false,
            },
            { 
              association: "owner",
              attributes: ["id", "username"],
            },
          ],
        });

        res.status(200).json(projects);
    } catch (error) {
        console.error("Error fetching projects data : ", error)
        res.status(500).json({ error: "Failed to fetch projects data."})
    }
}

// Endpoint: Get one project
export const getOneProject = async(req: Request, res: Response) => {
    try {
        const { id } = idSchema.parse(req.params);

        const project = await Project.findByPk(id, {
          include: [ 
            { association: "tasks",
              attributes: ["id", "title", "description", "status"],
              required: false,
            },
            { 
              association: "owner",
              attributes: ["id", "username"],
            },
          ],
        });

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        };

        res.json(project)
    } catch (error) {
        console.error("Error fetching project data : ", error)
        res.status(500).json({ error: "Failed to fetch project data."})
    }
}

// Endpoint: Create one project
export const createOneProject = async (req: Request, res: Response) => {
  try {
    const dataProject = projectSchema.parse(req.body);
    const newProject = await Project.create(dataProject);

    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error while creating project : ", error)
    res.status(500).json({ error: "Failed to create project."})
  }
}

// Endpoint: Update one project by id
export async function updateOneProjectById(req: Request, res: Response) {
  try {
    const { id } = idSchema.parse(req.params);
    const data = updateProjectSchema.parse(req.body);
    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    };

    const payload: Partial<{
      name: string;
      description: string;
      owner_id: number;
      is_active: boolean;
    }> = {};

    if (data.name !== undefined) payload.name = data.name;
    if (data.description !== undefined) payload.description = data.description;
    if (data.owner_id !== undefined) payload.owner_id = data.owner_id;
    if (data.is_active !== undefined) payload.is_active = data.is_active;

    await project.update(payload);

    res.json(project);
  } catch (error) {
    console.error("Error while updating project : ", error)
    res.status(500).json({ error: "Failed to update project."})
  }
}

// Endpoint: Delete one project by id
export async function deleteOneProjectById(req: Request, res: Response) {
  try {
    const { id } = idSchema.parse(req.params);
    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await project.destroy();

    res.status(204).send();
  } catch (error) {
    console.error("Error while deleting project : ", error)
    res.status(500).json({ error: "Failed to delete project."})
  }
}

