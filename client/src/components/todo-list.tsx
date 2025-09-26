import { Todo, FilterType, TodoStats } from '@/types/todo';
import { TodoItem } from './todo-item';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TodoListProps {
  todos: Todo[];
  filter: FilterType;
  searchQuery: string;
  onUpdate: (id: string, data: any) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  stats: TodoStats;
}

export function TodoList({
  todos,
  filter,
  searchQuery,
  onUpdate,
  onDelete,
  isLoading,
  isUpdating,
  isDeleting,
  stats
}: TodoListProps) {
  // Filter and search todos
  const filteredTodos = todos.filter(todo => {
    // Apply filter
    if (filter === 'completed' && !todo.completed) return false;
    if (filter === 'pending' && todo.completed) return false;
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        todo.title.toLowerCase().includes(query) ||
        todo.description.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-5 w-16" />
        </div>
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <Skeleton className="w-5 h-5 rounded mt-1" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (filteredTodos.length === 0) {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Todos</h2>
          <span className="text-sm text-muted-foreground" data-testid="todo-count">
            0 items
          </span>
        </div>
        
        <Card className="p-12 text-center">
          <CardContent>
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <ClipboardList className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">
              {searchQuery ? 'No matching todos' : 'No todos yet'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery 
                ? `No todos match "${searchQuery}". Try a different search term.`
                : 'Get started by adding your first todo item above.'
              }
            </p>
            {!searchQuery && (
              <Button 
                onClick={() => {
                  const titleInput = document.querySelector('[data-testid="input-title"]') as HTMLInputElement;
                  titleInput?.focus();
                }}
                data-testid="button-add-first-todo"
              >
                Add Todo
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Your To-dos</h2>
        <span className="text-sm text-muted-foreground" data-testid="todo-count">
          {filteredTodos.length} {filteredTodos.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
          isUpdating={isUpdating}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
}
