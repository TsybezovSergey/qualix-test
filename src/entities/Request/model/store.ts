import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Category } from '../consts';

export type RequestItem = {
  id: string;
  title: string;
  description: string;
  category?: Category;
  createdAt: string;
};

interface RequestState {
  requests: RequestItem[];
}

interface RequestActions {
  addRequest: (request: Omit<RequestItem, 'id' | 'createdAt'>) => void;
  updateRequest: (id: string, updatedData: Partial<Omit<RequestItem, 'id' | 'createdAt'>>) => void;
  deleteRequest: (id: string) => void;
  getRequestById: (id: string) => RequestItem | undefined;
}

type RequestStore = RequestState & RequestActions;

export const useRequestStore = create<RequestStore>()(
  persist(
    (set, get) => ({
      requests: [],

      addRequest: (request) => {
        const newRequest: RequestItem = {
          ...request,
          id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ requests: [...state.requests, newRequest] }));
      },

      updateRequest: (id, updatedData) => {
        set((state) => ({
          requests: state.requests.map((req) => (req.id === id ? { ...req, ...updatedData } : req)),
        }));
      },

      deleteRequest: (id) => {
        set((state) => ({
          requests: state.requests.filter((req) => req.id !== id),
        }));
      },

      getRequestById: (id) => get().requests.find((req) => req.id === id),
    }),
    {
      name: 'requests-storage',
    },
  ),
);
