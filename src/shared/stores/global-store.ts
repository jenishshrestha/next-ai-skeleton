import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIStoreState {
  isSidebarOpen?: boolean;
}

export const useUIStore = create<UIStoreState>()(
  persist(
    () => ({
      // Initial state
    }),
    {
      name: 'lyre-ui-preferences',
    },
  ),
);
