"use client";

import { useState, useEffect } from "react";
import TaskForm from "@/components/TaskForm";
import FilterBar from "@/components/FilterBar";
import TaskList from "@/components/TaskList";
import Toast from "@/components/Toast";
import { fetchTasks, createTask, updateTask, deleteTask } from "@/lib/api";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

interface ToastState {
  message: string;
  type: "success" | "error";
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [toast, setToast] = useState<ToastState | null>(null);

  // Load tasks on first render (no delay)
  useEffect(() => {
    loadTasks();
  }, []);

  // Reload tasks when search or filter changes (with debounce)
  useEffect(() => {
    const timer = setTimeout(() => loadTasks(), 400);
    return () => clearTimeout(timer);
  }, [searchTerm, statusFilter]);

  function showToast(message: string, type: "success" | "error") {
    setToast({ message, type });
  }

  async function loadTasks() {
    try {
      const data = await fetchTasks(searchTerm, statusFilter);
      setTasks(data);
    } catch {
      showToast("Failed to load tasks. Is the backend running?", "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddTask(title: string) {
    try {
      await createTask(title);
      showToast("Task added", "success");
      loadTasks();
    } catch {
      showToast("Failed to add task", "error");
    }
  }

  async function handleToggleTask(id: number, completed: boolean) {
    try {
      await updateTask(id, { completed });
      showToast(completed ? "Task completed" : "Task reopened", "success");
      loadTasks();
    } catch {
      showToast("Failed to update task", "error");
    }
  }

  async function handleDeleteTask(id: number) {
    try {
      await deleteTask(id);
      showToast("Task deleted", "success");
      loadTasks();
    } catch {
      showToast("Failed to delete task", "error");
    }
  }

  return (
    <main className="page">
      <header className="topbar">
        <div className="topbar-inner">
          <span className="logo">TaskManager</span>
        </div>
      </header>

      <div className="content">
        <div className="page-header">
          <h1 className="page-title">Tasks</h1>
          <p className="page-desc">Manage and track your to-do items</p>
        </div>

        <div className="panel">
          <h2 className="panel-label">Add New Task</h2>
          <TaskForm onAddTask={handleAddTask} />
        </div>

        <div className="panel">
          <h2 className="panel-label">All Tasks</h2>

          <FilterBar
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            onSearchChange={setSearchTerm}
            onStatusChange={setStatusFilter}
          />

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

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </main>
  );
}
