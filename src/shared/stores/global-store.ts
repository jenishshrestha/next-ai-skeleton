import { create } from 'zustand';

interface UIStoreState {
  viewMode: 'grid' | 'list';
  setViewMode: (viewMode: 'grid' | 'list') => void;
  toggleViewMode: () => void;
}

export const useUIStore = create<UIStoreState>((set) => ({
  viewMode: 'grid',
  setViewMode: (viewMode) => set({ viewMode }),
  toggleViewMode: () => set((state) => ({ 
    viewMode: state.viewMode === 'grid' ? 'list' : 'grid' 
  })),
}));
