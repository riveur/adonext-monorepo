"use client";

import { Todo } from "@/lib/validation";
import { create } from "zustand";

type TodoModalState = {
  todo?: Todo;
  isModalOpen: boolean;
}

type TodoModalActions = {
  setTodo: (todo: Todo) => void;
  clearTodo: () => void;
  setIsModalOpen: (value: boolean) => void;
}

type TodoModalStore = TodoModalState & TodoModalActions;

const defaultState: TodoModalState = {
  todo: undefined,
  isModalOpen: false,
}

const useTodoModalStore = create<TodoModalStore>()((set) => ({
  ...defaultState,
  setTodo: (todo) => set({ todo, isModalOpen: true }),
  clearTodo: () => set(defaultState),
  setIsModalOpen: (isModalOpen) => {
    if (!isModalOpen) {
      set({ todo: undefined });
    }
    set({ isModalOpen });
  },
}));

export default useTodoModalStore;