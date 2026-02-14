// In-memory task storage
// Using a simple array instead of a database for simplicity

let tasks = [
  {
    id: 1,
    title: "Learn React basics",
    completed: true,
    createdAt: "2025-01-15T10:30:00.000Z",
  },
  {
    id: 2,
    title: "Build a task manager app",
    completed: false,
    createdAt: "2025-01-16T09:00:00.000Z",
  },
  {
    id: 3,
    title: "Write unit tests",
    completed: false,
    createdAt: "2025-01-17T14:20:00.000Z",
  },
];

// Auto-increment counter for new task IDs
let nextId = 4;

// Get all tasks
function getAllTasks() {
  return tasks;
}

// Get tasks filtered by search term and/or status
function getFilteredTasks(searchTerm, statusFilter) {
  let filteredTasks = [...tasks];

  // Filter by search term (case-insensitive, partial match)
  if (searchTerm) {
    const lowerSearch = searchTerm.toLowerCase();
    filteredTasks = filteredTasks.filter((task) =>
      task.title.toLowerCase().includes(lowerSearch)
    );
  }

  // Filter by completion status
  if (statusFilter === "completed") {
    filteredTasks = filteredTasks.filter((task) => task.completed === true);
  } else if (statusFilter === "pending") {
    filteredTasks = filteredTasks.filter((task) => task.completed === false);
  }

  return filteredTasks;
}

// Create a new task with auto-generated id and timestamp
function createTask(title) {
  const newTask = {
    id: nextId++,
    title: title,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  return newTask;
}

// Update an existing task by id
function updateTask(id, updates) {
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return null;
  }

  // Only allow updating title and completed fields
  if (updates.title !== undefined) {
    tasks[taskIndex].title = updates.title;
  }
  if (updates.completed !== undefined) {
    tasks[taskIndex].completed = updates.completed;
  }

  return tasks[taskIndex];
}

// Delete a task by id
function deleteTask(id) {
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return false;
  }

  tasks.splice(taskIndex, 1);
  return true;
}

// Reset tasks to initial state (used in tests)
function resetTasks() {
  tasks = [
    {
      id: 1,
      title: "Learn React basics",
      completed: true,
      createdAt: "2025-01-15T10:30:00.000Z",
    },
    {
      id: 2,
      title: "Build a task manager app",
      completed: false,
      createdAt: "2025-01-16T09:00:00.000Z",
    },
    {
      id: 3,
      title: "Write unit tests",
      completed: false,
      createdAt: "2025-01-17T14:20:00.000Z",
    },
  ];
  nextId = 4;
}

module.exports = {
  getAllTasks,
  getFilteredTasks,
  createTask,
  updateTask,
  deleteTask,
  resetTasks,
};
