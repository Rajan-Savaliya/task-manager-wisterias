// In-memory task storage
// Replace this with a database in a real app

let tasks = [];
let nextId = 1;

// Get tasks with optional search and status filter
function getTasks(searchTerm, statusFilter) {
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
function createTask(title) {
  const task = {
    id: nextId++,
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(task);
  return task;
}

// Update a task by id
function updateTask(id, updates) {
  const task = tasks.find((task) => task.id === id);

  if (!task) return null;

  if (updates.title !== undefined) task.title = updates.title;
  if (updates.completed !== undefined) task.completed = updates.completed;

  return task;
}

// Delete a task by id
function deleteTask(id) {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) return false;

  tasks.splice(index, 1);
  return true;
}

// Reset data (used in tests)
function resetTasks() {
  tasks = [];
  nextId = 1;
}

module.exports = { getTasks, createTask, updateTask, deleteTask, resetTasks };
