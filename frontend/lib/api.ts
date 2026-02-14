// API layer for communicating with the backend

const BASE_URL = "http://localhost:5001";

// Fetch tasks with optional search and status filters
export async function fetchTasks(searchTerm?: string, statusFilter?: string) {
  const params = new URLSearchParams();

  if (searchTerm) params.append("search", searchTerm);
  if (statusFilter && statusFilter !== "all") params.append("status", statusFilter);

  const url = `${BASE_URL}/tasks?${params.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const result = await response.json();
  return result.data;
}

// Create a new task
export async function createTask(title: string) {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.message || "Failed to create task");
  }

  const result = await response.json();
  return result.data;
}

// Update a task (toggle completed or edit title)
export async function updateTask(id: number, updates: { completed?: boolean; title?: string }) {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  const result = await response.json();
  return result.data;
}

// Delete a task by id
export async function deleteTask(id: number) {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  const result = await response.json();
  return result;
}
