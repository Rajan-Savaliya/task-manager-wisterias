"use client";

import { useState, useEffect } from "react";
import TaskForm from "@/components/TaskForm";
import FilterBar from "@/components/FilterBar";
import TaskList from "@/components/TaskList";
import {
  fetchTasks,
  createTask as createTaskApi,
  updateTask as updateTaskApi,
  deleteTask as deleteTaskApi,
} from "@/lib/api";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch tasks when filters change (with debounce for search)
  useEffect(() => {
    const timer = setTimeout(() => {
      loadTasks();
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm, statusFilter]);

  async function loadTasks() {
    try {
      setLoading(true);
      setError("");
      const data = await fetchTasks(searchTerm, statusFilter);
      setTasks(data);
    } catch {
      setError("Failed to load tasks. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddTask(title: string) {
    try {
      setError("");
      await createTaskApi(title);
      await loadTasks();
    } catch {
      setError("Failed to add task. Please try again.");
    }
  }

  async function handleToggleTask(id: number, completed: boolean) {
    try {
      setError("");
      await updateTaskApi(id, { completed });
      await loadTasks();
    } catch {
      setError("Failed to update task. Please try again.");
    }
  }

  async function handleDeleteTask(id: number) {
    try {
      setError("");
      await deleteTaskApi(id);
      await loadTasks();
    } catch {
      setError("Failed to delete task. Please try again.");
    }
  }

  return (
    <main className="page">
      {/* Top bar */}
      <header className="topbar">
        <div className="topbar-inner">
          <span className="logo">TaskManager</span>
        </div>
      </header>

      <div className="content">
        {/* Page heading row */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Tasks</h1>
            <p className="page-desc">Manage and track your to-do items</p>
          </div>
        </div>

        {/* Add task panel */}
        <div className="panel">
          <h2 className="panel-label">Add New Task</h2>
          <TaskForm onAddTask={handleAddTask} />
        </div>

        {/* Task list panel */}
        <div className="panel">
          <h2 className="panel-label">All Tasks</h2>

          <FilterBar
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            onSearchChange={setSearchTerm}
            onStatusChange={setStatusFilter}
          />

          {error && <p className="error-message">{error}</p>}

          {loading ? (
            <p className="status-message">Loading...</p>
          ) : (
            <TaskList
              tasks={tasks}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          )}
        </div>
      </div>
    </main>
  );
}
