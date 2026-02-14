# Task Manager

A simple full-stack task manager app. Add tasks, mark them complete, delete them, search and filter — all in a clean UI.

> **Note:** Use the `main` branch for code review and testing. The `deployment` branch is used for Vercel deployment (backend logic moved to Next.js API routes).

## Tech Stack

**Backend:** Node.js, Express.js, Jest + Supertest

**Frontend:** Next.js (App Router), TypeScript, React, Plain CSS

## Project Structure

```
├── backend/
│   ├── server.js                # App entry point — sets up Express and middleware
│   ├── routes/
│   │   └── taskRoutes.js        # Defines API routes (GET, POST, PUT, DELETE)
│   ├── controllers/
│   │   └── taskController.js    # Handles requests and sends responses
│   ├── services/
│   │   └── taskService.js       # Data logic — CRUD operations on the task array
│   ├── helpers/
│   │   └── response.js          # Reusable response helper function
│   ├── tests/
│   │   └── api.test.js          # 4 API tests
│   └── package.json
│
├── frontend/
│   ├── app/
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Main page — state and event handlers
│   │   └── globals.css          # All styles
│   ├── components/
│   │   ├── TaskForm.tsx         # Input form to add a new task
│   │   ├── TaskList.tsx         # Renders the list of tasks
│   │   ├── TaskItem.tsx         # Single task row — checkbox, title, delete
│   │   ├── FilterBar.tsx        # Search input and status dropdown
│   │   └── Toast.tsx            # Toast notification for success/error
│   ├── lib/
│   │   └── api.ts               # All API calls to the backend
│   └── package.json
│
└── README.md
```

## How to Run

### 1. Start the backend

```bash
cd backend
npm install
npm run dev
```

This starts the API server on **http://localhost:5001**.

### 2. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

This starts the web app on **http://localhost:3000**. Open it in your browser.

> Start the backend first. The frontend talks to the backend API.

### 3. Run tests

```bash
cd backend
npm test
```

This runs 4 tests:
- GET /tasks — returns a list of tasks
- POST /tasks — creates a new task
- POST /tasks — returns 400 if title is empty
- DELETE /tasks/:id — deletes a task

## API Endpoints

Base URL: `http://localhost:5001`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /tasks | Get all tasks. Use `?search=` and `?status=completed` or `pending` to filter |
| POST | /tasks | Create a task. Send `{ "title": "Task name" }` in the body |
| PUT | /tasks/:id | Update a task. Send `{ "completed": true }` or `{ "title": "New name" }` |
| DELETE | /tasks/:id | Delete a task |

Every response looks like this:

```json
{
  "status": true,
  "message": "Tasks fetched successfully",
  "data": [],
  "statusCode": 200
}
```

## Architecture

This app has two parts that run separately:

**Backend (Express)** — A REST API that stores tasks in a simple JavaScript array (no database). It follows a layered structure:

- **Routes** → define which URL goes where
- **Controllers** → handle the request, call the service, send a response
- **Services** → do the actual work (add, update, delete, filter tasks)
- **Helpers** → small reusable functions (like the response formatter)

This structure makes it easy to add new features. For example, to add a `/users` API, you just create a new route file, a new controller, and a new service — without touching existing code.

**Frontend (Next.js)** — A React app that talks to the backend using `fetch`. The main page manages all the state (tasks, search, filters). Each component has one job — form, list, item, filter, toast. Styles are plain CSS, no libraries.

**How they connect:**

```
User clicks something
  → React calls a function in lib/api.ts
    → api.ts sends a fetch request to the Express backend
      → Express routes it to the right controller
        → Controller calls the service to do the work
          → Service updates the array and returns the result
        → Controller sends a JSON response back
      → api.ts returns the data to React
    → React updates state
  → UI re-renders
```
