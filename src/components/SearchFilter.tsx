
import { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';

interface SearchFilterProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  filters?: {
    label: string;
    key: string;
    options: { label: string; value: string }[];
  }[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (filterKey: string, values: string[]) => void;
  placeholder?: string;
}

export const SearchFilter = ({
  searchValue,
  onSearchChange,
  filters = [],
  activeFilters,
  onFilterChange,
  placeholder = "Buscar...",
}: SearchFilterProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const clearAllFilters = () => {
    filters.forEach(filter => {
      onFilterChange(filter.key, []);
    });
    onSearchChange('');
  };

  const hasActiveFilters = Object.values(activeFilters).some(values => values.length > 0) || searchValue;

  return (
    <div className="flex gap-2 items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
      {filters.length > 0 && (
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Filtros</h4>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="text-xs"
                  >
                    Limpar tudo
                  </Button>
                )}
              </div>
              
              {filters.map((filter) => (
                <div key={filter.key} className="space-y-2">
                  <h5 className="text-sm font-medium">{filter.label}</h5>
                  <div className="space-y-1">
                    {filter.options.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${filter.key}-${option.value}`}
                          checked={activeFilters[filter.key]?.includes(option.value) || false}
                          onCheckedChange={(checked) => {
                            const currentValues = activeFilters[filter.key] || [];
                            if (checked) {
                              onFilterChange(filter.key, [...currentValues, option.value]);
                            } else {
                              onFilterChange(filter.key, currentValues.filter(v => v !== option.value));
                            }
                          }}
                        />
                        <label
                          htmlFor={`${filter.key}-${option.value}`}
                          className="text-sm cursor-pointer"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}
      
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="icon"
          onClick={clearAllFilters}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
