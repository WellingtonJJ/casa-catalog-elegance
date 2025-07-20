
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

export const useBulkOperations = <T extends { id: string }>() => {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [isAllSelected, setIsAllSelected] = useState(false);

  const toggleItem = (id: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  const toggleAll = (items: T[]) => {
    if (isAllSelected) {
      setSelectedItems(new Set());
      setIsAllSelected(false);
    } else {
      setSelectedItems(new Set(items.map(item => item.id)));
      setIsAllSelected(true);
    }
  };

  const clearSelection = () => {
    setSelectedItems(new Set());
    setIsAllSelected(false);
  };

  const bulkDelete = async (
    items: T[],
    deleteFunction: (id: string) => Promise<void>,
    itemName = "item"
  ) => {
    const selectedCount = selectedItems.size;
    if (selectedCount === 0) {
      toast({
        title: "Nenhum item selecionado",
        description: `Selecione pelo menos um ${itemName} para excluir.`,
        variant: "destructive",
      });
      return;
    }

    const selectedItemsArray = items.filter(item => selectedItems.has(item.id));
    
    try {
      await Promise.all(
        selectedItemsArray.map(item => deleteFunction(item.id))
      );
      
      toast({
        title: "Exclusão concluída",
        description: `${selectedCount} ${itemName}(s) excluído(s) com sucesso.`,
      });
      
      clearSelection();
    } catch (error) {
      console.error('Erro na exclusão em lote:', error);
      toast({
        title: "Erro na exclusão",
        description: "Nem todos os itens puderam ser excluídos.",
        variant: "destructive",
      });
    }
  };

  return {
    selectedItems,
    isAllSelected,
    toggleItem,
    toggleAll,
    clearSelection,
    bulkDelete,
    selectedCount: selectedItems.size,
  };
};
