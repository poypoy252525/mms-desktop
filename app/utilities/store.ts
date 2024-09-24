import { create } from "zustand";
import { Death } from "@prisma/client";

type DeathStore = {
  death: Death | undefined;
  setDeath: (death: Death | undefined) => void;
  removeDeath: (deathId: string) => void;
};

const useStore = create<DeathStore>((set) => ({
  death: undefined,
  setDeath: (death) => set(() => ({ death: death })),
  removeDeath: (deathId: string) => set({}),
}));

export default useStore;
