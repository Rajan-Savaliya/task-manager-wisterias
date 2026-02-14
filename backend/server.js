const express = require("express");
const cors = require("cors");
const { getTasks, createTask, updateTask, deleteTask } = require("./data");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// Send a JSON response
function sendResponse(res, code, message, data = null) {
  res.status(code).json({
    status: code >= 200 && code < 300,
    message,
    data,
    statusCode: code,
  });
}

// GET /tasks
app.get("/tasks", (req, res) => {
  try {
    const { search, status } = req.query;
    const tasks = getTasks(search, status);
    sendResponse(res, 200, "Tasks fetched successfully", tasks);
  } catch {
    sendResponse(res, 500, "Failed to fetch tasks");
  }
});

// POST /tasks
app.post("/tasks", (req, res) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === "") {
      return sendResponse(res, 400, "Title is required");
    }

    const task = createTask(title.trim());
    sendResponse(res, 201, "Task created successfully", task);
  } catch {
    sendResponse(res, 500, "Failed to create task");
  }
});

// PUT /tasks/:id
app.put("/tasks/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const task = updateTask(id, req.body);

    if (!task) return sendResponse(res, 404, "Task not found");

    sendResponse(res, 200, "Task updated successfully", task);
  } catch {
    sendResponse(res, 500, "Failed to update task");
  }
});

// DELETE /tasks/:id
app.delete("/tasks/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = deleteTask(id);

    if (!deleted) return sendResponse(res, 404, "Task not found");

    sendResponse(res, 200, "Task deleted successfully");
  } catch {
    sendResponse(res, 500, "Failed to delete task");
  }
});

// Start server only when run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
