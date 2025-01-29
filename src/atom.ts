import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage, // Explicitly specify localStorage
});

// Load saved categories from localStorage (prevent reset on refresh)
const savedCategories = JSON.parse(
  localStorage.getItem("customCategories") || "[]"
);

// Load selected category from localStorage (ensure correct category selection)
const savedCategory = localStorage.getItem("selectedCategory") || "TO_DO";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories | string; // Allow dynamic categories
}

// Selected Category State (Persisted)
export const categoryState = atom<Categories | string>({
  key: "category",
  default: savedCategory, // Load saved category from localStorage
  effects_UNSTABLE: [
    persistAtom,
    ({ onSet }) => {
      onSet((newValue) => {
        localStorage.setItem("selectedCategory", newValue); // Manually store selection
      });
    },
  ],
});

// ToDo List State (Persisted)
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// Custom Categories State (Persisted)
export const customCategoriesState = atom<string[]>({
  key: "customCategories",
  default: savedCategories, // Load categories from localStorage
  effects_UNSTABLE: [
    persistAtom,
    ({ onSet }) => {
      onSet((newValue) => {
        localStorage.setItem("customCategories", JSON.stringify(newValue)); // Manually store categories
      });
    },
  ],
});

// Filtered ToDo List Selector
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
