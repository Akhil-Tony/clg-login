import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  phone: string;
  age: string;
  gender: string;
  email: string;
  completedLevels: number[];
  progress: number;
}

interface AppState {
  users: User[];
  currentUser: User | null;
  registerUser: (user: Omit<User, 'id' | 'completedLevels' | 'progress'>) => void;
  loginUser: (email: string) => boolean;
  logoutUser: () => void;
  completeLevel: (levelId: number) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      registerUser: (userData) => {
        const newUser: User = {
          ...userData,
          id: Math.random().toString(36).substring(7),
          completedLevels: [],
          progress: 0,
        };
        set((state) => ({ users: [...state.users, newUser], currentUser: newUser }));
      },
      loginUser: (email) => {
        const users = get().users;
        const user = users.find(u => u.email === email);
        if (user) {
          set({ currentUser: user });
          return true;
        }
        return false;
      },
      logoutUser: () => set({ currentUser: null }),
      completeLevel: (levelId) => {
        const current = get().currentUser;
        if (!current) return;
        if (!current.completedLevels.includes(levelId)) {
          const updatedLevels = [...current.completedLevels, levelId];
          const progress = Math.round((updatedLevels.length / 5) * 100);
          
          const updatedUser = { ...current, completedLevels: updatedLevels, progress };
          set((state) => ({
            currentUser: updatedUser,
            users: state.users.map(u => u.id === updatedUser.id ? updatedUser : u)
          }));
        }
      },
    }),
    {
      name: 'cannalogic-storage',
    }
  )
);
