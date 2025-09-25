import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  todoTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}

export function DeleteConfirmationModal({
  isOpen,
  todoTitle,
  onConfirm,
  onCancel,
  isDeleting
}: DeleteConfirmationModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onCancel}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center mb-2">
            <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mr-4">
              <Trash2 className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <AlertDialogTitle>Delete Todo</AlertDialogTitle>
              <AlertDialogDescription className="text-sm text-muted-foreground">
                This action cannot be undone
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>
        
        <AlertDialogDescription className="mb-6">
          Are you sure you want to delete "<span className="font-medium">{todoTitle}</span>"?
        </AlertDialogDescription>
        
        <AlertDialogFooter>
          <AlertDialogCancel 
            onClick={onCancel}
            disabled={isDeleting}
            data-testid="button-cancel-delete"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isDeleting}
            data-testid="button-confirm-delete"
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {isDeleting ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
