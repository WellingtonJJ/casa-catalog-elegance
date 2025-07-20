
import React, { useState } from 'react';
import { useCatalogs } from '@/hooks/useCatalogs';
import { CatalogCardSkeleton } from '@/components/ui/skeleton-catalog';
import { SearchFilter } from './SearchFilter';
import CatalogCard from './CatalogCard';

const CatalogSection = () => {
  const { catalogs, loading } = useCatalogs();
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState<Record<string, string[]>>({
    status: [],
  });

  // Filter only active catalogs for public view
  const activeCatalogs = catalogs.filter(catalog => catalog.active);
  
  // Apply search and filters
  const filteredCatalogs = activeCatalogs.filter(catalog => {
    const matchesSearch = catalog.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                         catalog.description?.toLowerCase().includes(searchValue.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <section className="py-16 bg-white" id="catalogos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-serif">
            Nossos Catálogos
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore nossa coleção cuidadosamente selecionada de produtos exclusivos
          </p>
        </div>

        {/* Search Filter */}
        <div className="mb-8">
          <SearchFilter
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            activeFilters={filters}
            onFilterChange={(key, values) => 
              setFilters(prev => ({ ...prev, [key]: values }))
            }
            placeholder="Buscar catálogos..."
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <CatalogCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredCatalogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              {searchValue ? 'Nenhum catálogo encontrado para sua busca.' : 'Nenhum catálogo disponível no momento.'}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCatalogs.map((catalog) => (
              <CatalogCard key={catalog.id} catalog={catalog} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CatalogSection;
