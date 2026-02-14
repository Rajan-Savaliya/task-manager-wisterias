const BASE_URL = "/api";

// Fetch tasks with optional filters
export async function fetchTasks(search?: string, status?: string) {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (status && status !== "all") params.append("status", status);

  const response = await fetch(`${BASE_URL}/tasks?${params}`);
  const result = await response.json();

  if (!response.ok) throw new Error(result.message);
  return result.data;
}

// Create a new task
export async function createTask(title: string) {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message);
  return result.data;
}

// Update a task
export async function updateTask(id: number, updates: { completed?: boolean; title?: string }) {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message);
  return result.data;
}

// Delete a task
export async function deleteTask(id: number) {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message);
  return result.data;
}
