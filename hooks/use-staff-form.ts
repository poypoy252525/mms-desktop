import { RefObject } from "react";
import { create } from "zustand";

interface StaffForm {
  formRef: RefObject<HTMLFormElement> | undefined;
  setFormRef: (ref: RefObject<HTMLFormElement>) => void;
}

export const useStaffForm = create<StaffForm>((set) => ({
  formRef: undefined,
  setFormRef: (formRef) => set({ formRef }),
}));
