
import { useState, useRef } from 'react';
import { GripVertical } from 'lucide-react';

interface DragDropItem {
  id: string;
  display_order: number;
}

interface DragDropListProps<T extends DragDropItem> {
  items: T[];
  onReorder: (items: T[]) => void;
  renderItem: (item: T, isDragging: boolean) => React.ReactNode;
  className?: string;
}

export function DragDropList<T extends DragDropItem>({
  items,
  onReorder,
  renderItem,
  className = "",
}: DragDropListProps<T>) {
  const [draggedItem, setDraggedItem] = useState<T | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const dragCounter = useRef(0);

  const handleDragStart = (e: React.DragEvent, item: T) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnter = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    dragCounter.current++;
    setDragOverIndex(index);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setDragOverIndex(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    dragCounter.current = 0;
    setDragOverIndex(null);

    if (!draggedItem) return;

    const dragIndex = items.findIndex(item => item.id === draggedItem.id);
    if (dragIndex === dropIndex) {
      setDraggedItem(null);
      return;
    }

    const newItems = [...items];
    const [removed] = newItems.splice(dragIndex, 1);
    newItems.splice(dropIndex, 0, removed);

    // Update display_order
    const reorderedItems = newItems.map((item, index) => ({
      ...item,
      display_order: index + 1,
    }));

    onReorder(reorderedItems);
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
    dragCounter.current = 0;
  };

  return (
    <div className={className}>
      {items.map((item, index) => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) => handleDragStart(e, item)}
          onDragEnter={(e) => handleDragEnter(e, index)}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
          className={`
            relative cursor-move
            ${draggedItem?.id === item.id ? 'opacity-50' : ''}
            ${dragOverIndex === index ? 'border-t-2 border-blue-500' : ''}
          `}
        >
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 p-1 hover:bg-gray-100 rounded cursor-grab active:cursor-grabbing">
              <GripVertical className="h-4 w-4 text-gray-400" />
            </div>
            <div className="flex-1">
              {renderItem(item, draggedItem?.id === item.id)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
