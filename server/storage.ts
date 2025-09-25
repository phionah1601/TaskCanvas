import { type Todo, type InsertTodo, type UpdateTodo } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getTodos(): Promise<Todo[]>;
  getTodo(id: string): Promise<Todo | undefined>;
  createTodo(todo: InsertTodo): Promise<Todo>;
  updateTodo(id: string, todo: UpdateTodo): Promise<Todo>;
  deleteTodo(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private todos: Map<string, Todo>;

  constructor() {
    this.todos = new Map();
  }

  async getTodos(): Promise<Todo[]> {
    return Array.from(this.todos.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getTodo(id: string): Promise<Todo | undefined> {
    return this.todos.get(id);
  }

  async createTodo(insertTodo: InsertTodo): Promise<Todo> {
    const id = randomUUID();
    const now = new Date();
    const todo: Todo = { 
      ...insertTodo, 
      id, 
      completed: insertTodo.completed || false,
      createdAt: now,
      updatedAt: now
    };
    this.todos.set(id, todo);
    return todo;
  }

  async updateTodo(id: string, updateTodo: UpdateTodo): Promise<Todo> {
    const existing = this.todos.get(id);
    if (!existing) {
      throw new Error('Todo not found');
    }

    const updated: Todo = {
      ...existing,
      ...updateTodo,
      updatedAt: new Date()
    };
    this.todos.set(id, updated);
    return updated;
  }

  async deleteTodo(id: string): Promise<void> {
    if (!this.todos.has(id)) {
      throw new Error('Todo not found');
    }
    this.todos.delete(id);
  }
}

export const storage = new MemStorage();
