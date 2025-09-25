import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { CreateTodoRequest } from '@/types/todo';

interface AddTodoFormProps {
  onSubmit: (data: CreateTodoRequest) => void;
  isLoading: boolean;
}

export function AddTodoForm({ onSubmit, isLoading }: AddTodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
    });

    // Reset form
    setTitle('');
    setDescription('');
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Plus className="mr-2 h-5 w-5 text-primary" />
          Add New Todo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title" className="text-sm font-medium">
                Title
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter todo title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                disabled={isLoading}
                data-testid="input-title"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-sm font-medium">
                Description
              </Label>
              <Input
                id="description"
                type="text"
                placeholder="Enter description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isLoading}
                data-testid="input-description"
                className="mt-2"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={isLoading || !title.trim()}
              data-testid="button-add-todo"
              className="font-medium"
            >
              <Plus className="mr-2 h-4 w-4" />
              {isLoading ? 'Adding...' : 'Add Todo'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
