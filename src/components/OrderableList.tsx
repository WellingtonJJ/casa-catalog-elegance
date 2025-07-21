
import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Star, StarOff } from 'lucide-react';

interface OrderableItem {
  id: string;
  name: string;
  display_order: number;
  featured?: boolean;
}

interface OrderableListProps {
  items: OrderableItem[];
  onReorder: (itemId: string, newOrder: number) => void;
  onToggleFeatured?: (itemId: string, featured: boolean) => void;
  showFeatured?: boolean;
  title: string;
}

const OrderableList = ({ 
  items, 
  onReorder, 
  onToggleFeatured, 
  showFeatured = false, 
  title 
}: OrderableListProps) => {
  const [localItems, setLocalItems] = useState(items);

  React.useEffect(() => {
    setLocalItems([...items].sort((a, b) => a.display_order - b.display_order));
  }, [items]);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === localItems.length - 1)
    ) {
      return;
    }

    const newItems = [...localItems];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap display_order values
    const currentOrder = newItems[index].display_order;
    const targetOrder = newItems[targetIndex].display_order;
    
    newItems[index].display_order = targetOrder;
    newItems[targetIndex].display_order = currentOrder;
    
    // Update both items in the database
    onReorder(newItems[index].id, targetOrder);
    onReorder(newItems[targetIndex].id, currentOrder);
    
    // Swap positions in array
    [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
    
    setLocalItems(newItems);
  };

  const toggleFeatured = (itemId: string, currentFeatured: boolean) => {
    if (onToggleFeatured) {
      onToggleFeatured(itemId, !currentFeatured);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4 font-playfair">{title}</h3>
      <div className="space-y-2">
        {localItems.map((item, index) => (
          <div 
            key={item.id} 
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <span className="font-semibold text-gray-700 font-poppins">
                {index + 1}.
              </span>
              <span className="font-poppins">{item.name}</span>
              {showFeatured && (
                <button
                  onClick={() => toggleFeatured(item.id, item.featured || false)}
                  className={`p-1 rounded ${
                    item.featured 
                      ? 'text-yellow-500 hover:text-yellow-600' 
                      : 'text-gray-400 hover:text-gray-500'
                  }`}
                  title={item.featured ? 'Remover destaque' : 'Destacar na página inicial'}
                >
                  {item.featured ? <Star className="w-4 h-4 fill-current" /> : <StarOff className="w-4 h-4" />}
                </button>
              )}
            </div>
            
            <div className="flex space-x-1">
              <button
                onClick={() => moveItem(index, 'up')}
                disabled={index === 0}
                className="p-1 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                title="Mover para cima"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => moveItem(index, 'down')}
                disabled={index === localItems.length - 1}
                className="p-1 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                title="Mover para baixo"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderableList;
