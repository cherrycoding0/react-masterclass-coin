import React, { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  categoryState,
  customCategoriesState,
  toDoSelector,
  Categories,
} from "../atom";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [customCategories, setCustomCategories] = useRecoilState(
    customCategoriesState
  );
  const [newCategory, setNewCategory] = useState("");

  // Ensure categories load from localStorage after refresh
  useEffect(() => {
    const savedCategories = JSON.parse(
      localStorage.getItem("customCategories") || "[]"
    );
    setCustomCategories(savedCategories);

    const savedCategory =
      localStorage.getItem("selectedCategory") || Categories.TO_DO;
    setCategory(savedCategory);
  }, []);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const selectedCategory = event.currentTarget.value;
    setCategory(selectedCategory);
    localStorage.setItem("selectedCategory", selectedCategory); // Ensure persistence
  };

  const handleAddCategory = () => {
    if (newCategory.trim() !== "" && !customCategories.includes(newCategory)) {
      const updatedCategories = [...customCategories, newCategory];
      setCustomCategories(updatedCategories);
      localStorage.setItem(
        "customCategories",
        JSON.stringify(updatedCategories)
      ); // Ensure persistence
      setNewCategory("");
    }
  };

  return (
    <div>
      <h1>💌 To Do List</h1>

      {/* Category Selection */}
      <select value={category} onChange={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
        {customCategories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Add Category */}
      <div>
        <input
          type="text"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={handleAddCategory}>Add</button>
      </div>

      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
