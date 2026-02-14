"use client";

import { useState } from "react";

interface TaskFormProps {
  onAddTask: (title: string) => void;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    // Don't submit empty titles
    if (title.trim() === "") return;

    onAddTask(title.trim());
    setTitle("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-input"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" className="add-button">
        Add Task
      </button>
    </form>
  );
}
