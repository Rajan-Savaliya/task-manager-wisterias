import { NextRequest } from "next/server";
import { sendResponse } from "@/lib/response";
import { getTasks, createTask } from "@/lib/taskService";

// GET /api/tasks
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const search = searchParams.get("search") || undefined;
    const status = searchParams.get("status") || undefined;

    const tasks = getTasks(search, status);
    return sendResponse(200, "Tasks fetched successfully", tasks);
  } catch {
    return sendResponse(500, "Failed to fetch tasks");
  }
}

// POST /api/tasks
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title } = body;

    if (!title || title.trim() === "") {
      return sendResponse(400, "Title is required");
    }

    const task = createTask(title.trim());
    return sendResponse(201, "Task created successfully", task);
  } catch {
    return sendResponse(500, "Failed to create task");
  }
}
