import { create } from 'zustand';

enum RequestFormMode {
  View = 'view',
  Edit = 'edit',
}

type State = {
  formMode: RequestFormMode;
};

type Actions = {
  setViewMode: () => void;
  setEditMode: () => void;
  getIsView: () => boolean;
};

export const useRequestViewModeStore = create<State & Actions>((set, get) => ({
  formMode: RequestFormMode.View,
  getIsView: () => get().formMode === RequestFormMode.View,
  setViewMode: () => set({ formMode: RequestFormMode.View }),
  setEditMode: () => set({ formMode: RequestFormMode.Edit }),
}));
