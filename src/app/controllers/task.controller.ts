import { Request, Response } from "express";
import { Task } from "../models/associations.js";
import { idSchema } from "../schemas/id.schema.js";
import { taskSchema, updateTaskSchema } from "../schemas/task.schema.js";

// Endpoint: Get all tasks
export const listTasks = async(req: Request, res: Response) => {
    try {
        const tasks = await Task.findAll()

        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks data : ", error)
        res.status(500).json({ error: "Failed to fetch tasks data."})
    }
}