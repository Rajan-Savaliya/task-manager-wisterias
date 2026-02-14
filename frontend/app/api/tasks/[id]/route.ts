import { NextRequest } from "next/server";
import { sendResponse } from "@/lib/response";
import { updateTask, deleteTask } from "@/lib/taskService";

// PUT /api/tasks/:id
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const task = updateTask(parseInt(id), body);

    if (!task) return sendResponse(404, "Task not found");

    return sendResponse(200, "Task updated successfully", task);
  } catch {
    return sendResponse(500, "Failed to update task");
  }
}

// DELETE /api/tasks/:id
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = deleteTask(parseInt(id));

    if (!deleted) return sendResponse(404, "Task not found");

    return sendResponse(200, "Task deleted successfully");
  } catch {
    return sendResponse(500, "Failed to delete task");
  }
}
