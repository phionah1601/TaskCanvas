export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTodoRequest {
  title: string;
  description: string;
  completed?: boolean;
}

export interface UpdateTodoRequest {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface TodoStats {
  total: number;
  completed: number;
  pending: number;
}

export type FilterType = 'all' | 'pending' | 'completed';
