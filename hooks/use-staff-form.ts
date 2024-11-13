import { RefObject } from "react";
import { create } from "zustand";

interface StaffForm {
  formRef: RefObject<HTMLFormElement> | undefined;
  setFormRef: (ref: RefObject<HTMLFormElement>) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useStaffForm = create<StaffForm>((set) => ({
  formRef: undefined,
  setFormRef: (formRef) => set((state) => ({ ...state, formRef })),
  loading: false,
  setLoading: (loading) => set((state) => ({ ...state, loading })),
}));
