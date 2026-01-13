import { Request, Response } from "express";
import { Task } from "../models/associations.js";
import { idSchema } from "../schemas/id.schema.js";
import { taskSchema, updateTaskSchema } from "../schemas/task.schema.js";

// Endpoint: Get all tasks
export const listTasks = async(req: Request, res: Response) => {
    try {
        const tasks = await Task.findAll({
            include: [
                { 
                    association: "projet",
                    attributes: ["id", "name", "description"],
                },
            ],
        });

        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks data : ", error)
        res.status(500).json({ error: "Failed to fetch tasks data."})
    }
}

// Endpoint: Get one task
export const getOneTask = async(req: Request, res: Response) => {
    try {
        const { id } = idSchema.parse(req.params);

        const task = await Task.findByPk(id, {
            include: [
                { 
                    association: "projet",
                    attributes: ["id", "name", "description"],
                },
            ],
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        };

        res.json(task)
    } catch (error) {
        console.error("Error fetching task data : ", error)
        res.status(500).json({ error: "Failed to fetch task data."})
    }
}