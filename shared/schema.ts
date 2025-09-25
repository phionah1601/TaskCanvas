import { z } from "zod";

// Todo schema for the database/storage layer
export const todoSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string(),
  completed: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Insert schema for creating new todos
export const insertTodoSchema = todoSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Update schema for updating existing todos
export const updateTodoSchema = todoSchema.partial().omit({
  id: true,
  createdAt: true,
});

export type Todo = z.infer<typeof todoSchema>;
export type InsertTodo = z.infer<typeof insertTodoSchema>;
export type UpdateTodo = z.infer<typeof updateTodoSchema>;
