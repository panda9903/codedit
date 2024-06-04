import { create } from "zustand";

interface CodeStoreInterface {
  code: string;
  language: string;
  setCode: (newCode: string) => void;
  setLanguage: (newLanguage: string) => void;
}

export const codeStore = create<CodeStoreInterface>()((set) => ({
  code: "",
  language: "markdown",
  setCode: (newCode: string) => set({ code: newCode }),
  setLanguage: (newLanguage: string) => set({ language: newLanguage }),
}));

interface SocketStoreInterface {
  socket: any;
  setSocket: (newSocket: any) => void;
}

export const socketStore = create<SocketStoreInterface>()((set) => ({
  socket: null,
  setSocket: (newSocket: any) => set({ socket: newSocket }),
}));

interface DataStoreInterface {
  username: string;
  roomId: string;
  setUsername: (newUsername: string) => void;
  setRoomId: (newRoomId: string) => void;
}

export const dataStore = create<DataStoreInterface>()((set) => ({
  username: "",
  setUsername: (newUsername: string) => set({ username: newUsername }),
  roomId: "",
  setRoomId: (newRoomId: string) => set({ roomId: newRoomId }),
}));
