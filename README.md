# Task Manager

A simple full-stack task manager application built with Express.js and Next.js.

## Tech Stack

**Backend:**
- Node.js
- Express.js
- Jest + Supertest (testing)

**Frontend:**
- Next.js (App Router)
- TypeScript
- React (useState, useEffect)
- Plain CSS

## Project Structure

```
task-manager-wisterias/
├── backend/                  # Express API server
│   ├── server.js             # API routes and Express setup
│   ├── data.js               # In-memory data store and helper functions
│   ├── package.json
│   └── tests/
│       └── api.test.js       # API endpoint tests
├── frontend/                 # Next.js frontend
│   ├── app/
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Main page (state management)
│   │   └── globals.css       # All styles
│   ├── components/
│   │   ├── TaskForm.tsx      # Add new task form
│   │   ├── TaskList.tsx      # Renders list of tasks
│   │   ├── TaskItem.tsx      # Single task with checkbox and delete
│   │   └── FilterBar.tsx     # Search and status filter
│   └── lib/
│       └── api.ts            # API helper functions
└── README.md
```

## Setup Instructions

### Backend

```bash
cd backend
npm install
npm run dev
```

The API server will run on **http://localhost:5001**.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on **http://localhost:3000**.

> **Note:** Start the backend first, then the frontend. The frontend calls the backend API.

## Running Tests

```bash
cd backend
npm test
```

This runs 4 tests:
1. GET /tasks returns an array of tasks
2. POST /tasks creates a new task
3. POST /tasks fails with empty title
4. DELETE /tasks/:id removes a task

## API Documentation

Base URL: `http://localhost:5001`

All responses follow this format:
```json
{
  "status": true/false,
  "message": "Description",
  "data": null or object/array,
  "statusCode": 200
}
```

### Endpoints

#### GET /tasks
Fetch all tasks. Supports optional query parameters:
- `search` — filter by title (case-insensitive, partial match)
- `status` — filter by status: `all`, `completed`, or `pending`

**Example:** `GET /tasks?search=react&status=pending`

#### POST /tasks
Create a new task.

**Body:** `{ "title": "Task name" }`

Returns `400` if title is missing or empty.

#### PUT /tasks/:id
Update a task.

**Body:** `{ "completed": true }` or `{ "title": "New title" }`

Returns `404` if task not found.

#### DELETE /tasks/:id
Delete a task by ID.

Returns `404` if task not found.

## Architecture

The app follows a simple client-server architecture:

1. **User interacts** with the React frontend
2. **Frontend calls** the backend API using fetch
3. **Backend processes** the request and updates the in-memory array
4. **Backend returns** a JSON response
5. **Frontend updates** state and re-renders the UI

Data is stored in a simple JavaScript array (no database). Data resets when the server restarts.

### Key Design Decisions

- **In-memory storage** — keeps the project simple with no database setup
- **Separate frontend/backend** — demonstrates API integration skills
- **Plain CSS** — shows understanding of styling without relying on frameworks
- **TypeScript on frontend** — adds type safety while keeping code readable
- **Debounced search** — prevents excessive API calls while typing
