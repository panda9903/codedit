import { create } from "zustand";

interface CodeStoreInterface {
  code: string;
  language: string;
  setCode: (newCode: string) => void;
  setLanguage: (newLanguage: string) => void;
}

export const codeStore = create<CodeStoreInterface>()((set) => ({
  code: "",
  language: "",
  setCode: (newCode: string) => set({ code: newCode }),
  setLanguage: (newLanguage: string) => set({ language: newLanguage }),
}));
