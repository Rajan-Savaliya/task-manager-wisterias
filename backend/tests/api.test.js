const request = require("supertest");
const app = require("../server");
const { resetTasks } = require("../data");

// Reset the in-memory data before each test
beforeEach(() => {
  resetTasks();
});

describe("Task Manager API", () => {
  test("GET /tasks should return an array of tasks", async () => {
    const response = await request(app).get("/tasks");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBe(3);
  });

  test("POST /tasks should create a new task", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({ title: "New test task" });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe(true);
    expect(response.body.data.title).toBe("New test task");
    expect(response.body.data.completed).toBe(false);
    expect(response.body.data.id).toBeDefined();
  });

  test("POST /tasks should fail with empty title", async () => {
    const response = await request(app)
      .post("/tasks")
      .send({ title: "" });

    expect(response.status).toBe(400);
    expect(response.body.status).toBe(false);
    expect(response.body.message).toBe("Title is required");
  });

  test("DELETE /tasks/:id should remove a task", async () => {
    const response = await request(app).delete("/tasks/1");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(true);

    // Verify the task is actually gone
    const getResponse = await request(app).get("/tasks");
    expect(getResponse.body.data.length).toBe(2);
  });
});
