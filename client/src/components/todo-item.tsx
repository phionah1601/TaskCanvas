import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Edit2, Trash2, Check, X, Clock, CheckCircle } from 'lucide-react';
import { Todo, UpdateTodoRequest } from '@/types/todo';
import { formatDistanceToNow } from 'date-fns';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, data: UpdateTodoRequest) => void;
  onDelete: (id: string) => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

export function TodoItem({ 
  todo, 
  onUpdate, 
  onDelete, 
  isUpdating, 
  isDeleting 
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);

  const handleToggleComplete = () => {
    onUpdate(todo.id, { completed: !todo.completed });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  const handleSave = () => {
    if (!editTitle.trim()) return;
    
    onUpdate(todo.id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const timeAgo = formatDistanceToNow(new Date(todo.updatedAt), { addSuffix: true });

  return (
    <div className={`bg-card rounded-lg border shadow-sm p-4 transition-all hover:shadow-md ${
      isEditing ? 'border-primary border-2' : 'border-border'
    }`}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 pt-1">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={handleToggleComplete}
            disabled={isEditing || isUpdating}
            data-testid={`checkbox-${todo.id}`}
            className="w-5 h-5"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-3">
              <Input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                data-testid={`input-edit-title-${todo.id}`}
                className="text-lg font-medium"
                placeholder="Todo title..."
              />
              <Textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                data-testid={`textarea-edit-description-${todo.id}`}
                className="text-sm resize-none"
                rows={2}
                placeholder="Description..."
              />
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={handleSave}
                    disabled={!editTitle.trim() || isUpdating}
                    data-testid={`button-save-${todo.id}`}
                  >
                    <Check className="mr-1 h-3 w-3" />
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleCancel}
                    disabled={isUpdating}
                    data-testid={`button-cancel-${todo.id}`}
                  >
                    <X className="mr-1 h-3 w-3" />
                    Cancel
                  </Button>
                </div>
                <span className="text-xs text-muted-foreground">Editing...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-medium ${
                  todo.completed 
                    ? 'text-muted-foreground line-through' 
                    : 'text-foreground'
                }`}>
                  {todo.title}
                </h3>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleEdit}
                    disabled={isUpdating || isDeleting}
                    data-testid={`button-edit-${todo.id}`}
                    className="h-8 w-8 p-0"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleDelete}
                    disabled={isUpdating || isDeleting}
                    data-testid={`button-delete-${todo.id}`}
                    className="h-8 w-8 p-0 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {todo.description && (
                <p className={`text-sm mt-1 ${
                  todo.completed 
                    ? 'text-muted-foreground line-through' 
                    : 'text-muted-foreground'
                }`}>
                  {todo.description}
                </p>
              )}
              
              <div className="flex items-center justify-between mt-3">
                <Badge 
                  variant={todo.completed ? "default" : "secondary"}
                  className="text-xs"
                  data-testid={`status-${todo.id}`}
                >
                  {todo.completed ? (
                    <>
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Completed
                    </>
                  ) : (
                    <>
                      <Clock className="mr-1 h-3 w-3" />
                      Pending
                    </>
                  )}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Updated {timeAgo}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
