import { useState } from 'react';
import { AddTodoForm } from '@/components/add-todo-form';
import { TodoFilters } from '@/components/todo-filters';
import { TodoList } from '@/components/todo-list';
import { DeleteConfirmationModal } from '@/components/delete-confirmation-modal';
import { useTodos } from '@/hooks/use-todos';
import { FilterType, TodoStats, Todo } from '@/types/todo';
import { Card, CardContent } from '@/components/ui/card';
import { CheckSquare } from 'lucide-react';

export default function Home() {
  const {
    todos,
    isLoading,
    createTodo,
    updateTodo,
    deleteTodo,
    isCreating,
    isUpdating,
    isDeleting,
  } = useTodos();

  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    todo: Todo | null;
  }>({ isOpen: false, todo: null });

  // Calculate stats
  const stats: TodoStats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length,
  };

  const handleDeleteClick = (todoId: string) => {
    const todo = todos.find(t => t.id === todoId);
    if (todo) {
      setDeleteModal({ isOpen: true, todo });
    }
  };

  const handleConfirmDelete = () => {
    if (deleteModal.todo) {
      deleteTodo(deleteModal.todo.id);
      setDeleteModal({ isOpen: false, todo: null });
    }
  };

  const handleCancelDelete = () => {
    setDeleteModal({ isOpen: false, todo: null });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <CheckSquare className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">To-do Manager</h1>
                <p className="text-sm text-muted-foreground">Stay organized and productive</p>
              </div>
            </div>
            
            {/* Stats Display */}
            <div className="flex items-center space-x-6 text-sm">
              <div className="text-center">
                <div className="font-semibold text-lg text-foreground" data-testid="stats-total">
                  {stats.total}
                </div>
                <div className="text-muted-foreground">Total</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-lg text-primary" data-testid="stats-completed">
                  {stats.completed}
                </div>
                <div className="text-muted-foreground">Completed</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-lg text-accent-foreground" data-testid="stats-pending">
                  {stats.pending}
                </div>
                <div className="text-muted-foreground">Pending</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <AddTodoForm onSubmit={createTodo} isLoading={isCreating} />
        
        <TodoFilters
          filter={filter}
          searchQuery={searchQuery}
          onFilterChange={setFilter}
          onSearchChange={setSearchQuery}
        />

        <TodoList
          todos={todos}
          filter={filter}
          searchQuery={searchQuery}
          onUpdate={(id: string, data: any) => updateTodo({ id, data })}
          onDelete={handleDeleteClick}
          isLoading={isLoading}
          isUpdating={isUpdating}
          isDeleting={isDeleting}
          stats={stats}
        />
      </main>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        todoTitle={deleteModal.todo?.title || ''}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
