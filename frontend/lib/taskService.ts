// In-memory task storage
// Replace this with a database in a real app

interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

let tasks: Task[] = [];
let nextId = 1;

// Get tasks with optional search and status filter
export function getTasks(searchTerm?: string, statusFilter?: string): Task[] {
  let result = tasks;

  if (searchTerm) {
    const search = searchTerm.toLowerCase();
    result = result.filter((task) =>
      task.title.toLowerCase().includes(search)
    );
  }

  if (statusFilter === "completed") {
    result = result.filter((task) => task.completed);
  } else if (statusFilter === "pending") {
    result = result.filter((task) => !task.completed);
  }

  return result;
}

// Create a new task
export function createTask(title: string): Task {
  const task: Task = {
    id: nextId++,
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(task);
  return task;
}

// Update a task by id
export function updateTask(id: number, updates: { title?: string; completed?: boolean }): Task | null {
  const task = tasks.find((t) => t.id === id);

  if (!task) return null;

  if (updates.title !== undefined) task.title = updates.title;
  if (updates.completed !== undefined) task.completed = updates.completed;

  return task;
}

// Delete a task by id
export function deleteTask(id: number): boolean {
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) return false;

  tasks.splice(index, 1);
  return true;
}
