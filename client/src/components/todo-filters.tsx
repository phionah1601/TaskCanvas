import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { FilterType } from '@/types/todo';

interface TodoFiltersProps {
  filter: FilterType;
  searchQuery: string;
  onFilterChange: (filter: FilterType) => void;
  onSearchChange: (query: string) => void;
}

export function TodoFilters({ 
  filter, 
  searchQuery, 
  onFilterChange, 
  onSearchChange 
}: TodoFiltersProps) {
  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <Card className="mb-6">
      <CardContent className="pt-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">Filter:</span>
            <div className="flex space-x-2">
              {filters.map(({ key, label }) => (
                <Button
                  key={key}
                  variant={filter === key ? "default" : "secondary"}
                  size="sm"
                  onClick={() => onFilterChange(key)}
                  data-testid={`filter-${key}`}
                  className="text-sm"
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search todos..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                data-testid="input-search"
                className="pl-10 w-64"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
