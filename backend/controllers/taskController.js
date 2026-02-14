const sendResponse = require("../helpers/response");
const taskService = require("../services/taskService");

// GET /tasks
function getAllTasks(req, res) {
  try {
    const { search, status } = req.query;
    const tasks = taskService.getTasks(search, status);
    sendResponse(res, 200, "Tasks fetched successfully", tasks);
  } catch {
    sendResponse(res, 500, "Failed to fetch tasks");
  }
}

// POST /tasks
function addTask(req, res) {
  try {
    const { title } = req.body;

    if (!title || title.trim() === "") {
      return sendResponse(res, 400, "Title is required");
    }

    const task = taskService.createTask(title.trim());
    sendResponse(res, 201, "Task created successfully", task);
  } catch {
    sendResponse(res, 500, "Failed to create task");
  }
}

// PUT /tasks/:id
function editTask(req, res) {
  try {
    const id = parseInt(req.params.id);
    const task = taskService.updateTask(id, req.body);

    if (!task) return sendResponse(res, 404, "Task not found");

    sendResponse(res, 200, "Task updated successfully", task);
  } catch {
    sendResponse(res, 500, "Failed to update task");
  }
}

// DELETE /tasks/:id
function removeTask(req, res) {
  try {
    const id = parseInt(req.params.id);
    const deleted = taskService.deleteTask(id);

    if (!deleted) return sendResponse(res, 404, "Task not found");

    sendResponse(res, 200, "Task deleted successfully");
  } catch {
    sendResponse(res, 500, "Failed to delete task");
  }
}

module.exports = { getAllTasks, addTask, editTask, removeTask };
