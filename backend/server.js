const express = require("express");
const cors = require("cors");
const {
  getAllTasks,
  getFilteredTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("./data");

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Helper to build a consistent response object
function buildResponse(statusCode, message, data = null) {
  return {
    status: statusCode >= 200 && statusCode < 300,
    message: message,
    data: data,
    statusCode: statusCode,
  };
}

// GET /tasks - Get all tasks with optional search and status filters
app.get("/tasks", (req, res) => {
  try {
    const { search, status } = req.query;

    // Use filtered query if search or status is provided
    const hasFilters = search || (status && status !== "all");
    const tasks = hasFilters
      ? getFilteredTasks(search, status)
      : getAllTasks();

    res.status(200).json(buildResponse(200, "Tasks fetched successfully", tasks));
  } catch (error) {
    res.status(500).json(buildResponse(500, "Failed to fetch tasks"));
  }
});

// POST /tasks - Create a new task
app.post("/tasks", (req, res) => {
  try {
    const { title } = req.body;

    // Validate that title exists and is not empty
    if (!title || title.trim() === "") {
      return res.status(400).json(buildResponse(400, "Title is required"));
    }

    const newTask = createTask(title.trim());
    res.status(201).json(buildResponse(201, "Task created successfully", newTask));
  } catch (error) {
    res.status(500).json(buildResponse(500, "Failed to create task"));
  }
});

// PUT /tasks/:id - Update an existing task
app.put("/tasks/:id", (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const updates = req.body;

    const updatedTask = updateTask(taskId, updates);

    if (!updatedTask) {
      return res.status(404).json(buildResponse(404, "Task not found"));
    }

    res.status(200).json(buildResponse(200, "Task updated successfully", updatedTask));
  } catch (error) {
    res.status(500).json(buildResponse(500, "Failed to update task"));
  }
});

// DELETE /tasks/:id - Delete a task
app.delete("/tasks/:id", (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const deleted = deleteTask(taskId);

    if (!deleted) {
      return res.status(404).json(buildResponse(404, "Task not found"));
    }

    res.status(200).json(buildResponse(200, "Task deleted successfully"));
  } catch (error) {
    res.status(500).json(buildResponse(500, "Failed to delete task"));
  }
});

// Only start the server if this file is run directly (not imported in tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
