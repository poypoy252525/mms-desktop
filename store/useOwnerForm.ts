import { create } from "zustand";

interface OwnerFormStore {
  ownerId: string | undefined;
  setOwnerId: (ownerId: string) => void;
}

export const useOwnerForm = create<OwnerFormStore>((set) => ({
  ownerId: undefined,
  setOwnerId: (ownerId) => set((state) => ({ ...state, ownerId })),
}));
