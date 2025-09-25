import { Todo, CreateTodoRequest, UpdateTodoRequest } from '@/types/todo';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data store
let todos: Todo[] = [
  {
    id: '1',
    title: 'Complete project documentation',
    description: 'Finish writing all the technical documentation for the project',
    completed: true,
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    updatedAt: new Date(Date.now() - 7200000)   // 2 hours ago
  },
  {
    id: '2',
    title: 'Review code changes',
    description: 'Go through the pull request and provide feedback on the new feature implementation',
    completed: false,
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    updatedAt: new Date(Date.now() - 86400000)
  },
  {
    id: '3',
    title: 'Update API documentation',
    description: 'Update the API documentation to reflect the latest changes in version 2.0',
    completed: false,
    createdAt: new Date(Date.now() - 10800000), // 3 hours ago
    updatedAt: new Date(Date.now() - 10800000)
  },
  {
    id: '4',
    title: 'Prepare presentation slides',
    description: 'Create slides for the quarterly team meeting presentation',
    completed: false,
    createdAt: new Date(Date.now() - 10800000), // 3 hours ago
    updatedAt: new Date(Date.now() - 10800000)
  }
];

let nextId = 5;

export const todoApi = {
  // GET /api/todos
  async getTodos(): Promise<Todo[]> {
    await delay(800); // Simulate network delay
    
    // Simulate occasional API failures (5% chance)
    if (Math.random() < 0.05) {
      throw new Error('Failed to fetch todos. Please try again.');
    }
    
    return [...todos].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },

  // POST /api/todos
  async createTodo(data: CreateTodoRequest): Promise<Todo> {
    await delay(1000); // Simulate network delay
    
    // Simulate occasional API failures (5% chance)
    if (Math.random() < 0.05) {
      throw new Error('Failed to create todo. Please try again.');
    }

    const now = new Date();
    const newTodo: Todo = {
      id: nextId.toString(),
      title: data.title,
      description: data.description,
      completed: data.completed || false,
      createdAt: now,
      updatedAt: now
    };
    
    nextId++;
    todos.push(newTodo);
    
    return newTodo;
  },

  // PUT /api/todos/:id
  async updateTodo(id: string, data: UpdateTodoRequest): Promise<Todo> {
    await delay(800); // Simulate network delay
    
    // Simulate occasional API failures (5% chance)
    if (Math.random() < 0.05) {
      throw new Error('Failed to update todo. Please try again.');
    }

    const todoIndex = todos.findIndex(t => t.id === id);
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }

    const updatedTodo: Todo = {
      ...todos[todoIndex],
      ...data,
      updatedAt: new Date()
    };
    
    todos[todoIndex] = updatedTodo;
    
    return updatedTodo;
  },

  // DELETE /api/todos/:id
  async deleteTodo(id: string): Promise<void> {
    await delay(600); // Simulate network delay
    
    // Simulate occasional API failures (5% chance)
    if (Math.random() < 0.05) {
      throw new Error('Failed to delete todo. Please try again.');
    }

    const todoIndex = todos.findIndex(t => t.id === id);
    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }

    todos.splice(todoIndex, 1);
  }
};
