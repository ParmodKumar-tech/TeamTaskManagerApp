
# TeamTaskManager

A full-stack task and project management application built with a React + Vite frontend and an Express + MongoDB backend.

## Overview

- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT authentication, request validation with Joi.
- **Frontend:** React, Vite, Tailwind, React Router, Axios, React Hook Form.
- **Features:** user signup/login, secure auth cookie, task updation, project CRUD, protected routes, form validation.

## Repository Structure

- `backend/`
  - `app.js` — Express server configuration, CORS, cookie parsing, route mounting.
  - `src/db/db.config.js` — MongoDB connection.
  - `src/routes/` — API routes for tasks, projects, and users.
  - `src/controllers/` — controller logic for CRUD operations and authentication.
  - `src/models/` — Mongoose schemas for users, tasks, and projects.
  - `src/middlewares/` — authentication and validation middleware.
  - `src/validations/` — Joi schemas for request validation.
  - `src/utils/` — JWT token generation.

- `frontend/`
  - `src/main.jsx` — app entry point.
  - `src/App.jsx` — app layout and route definitions.
  - `src/pages/` — login, signup, and dashboard pages.
  - `src/components/` — reusable UI pieces for tasks, forms, headers, and overview cards.
  - `src/api/` — API clients for tasks, projects, and users.
  - `src/contexts/` — authentication context.

## Key API Endpoints

- `POST /api/v1/user/signup` — create a new user.
- `POST /api/v1/user/login` — sign in and store JWT in a cookie.
- `GET /api/v1/user/logout` — clear auth cookie.
- `GET /api/v1/task` — return all tasks for authenticated user.
- `POST /api/v1/task` — create a new task.
- `GET /api/v1/task/:task_id` — get a single task.
- `PUT /api/v1/task/:task_id` — update a task.
- `PATCH /api/v1/task/:task_id` — update specific task fields.
- `DELETE /api/v1/task/:task_id` — delete a task.
- `GET /api/v1/project` — return all projects for authenticated user.
- `POST /api/v1/project` — create a new project.
- `PUT /api/v1/project/:project_id` — update a project.
- `DELETE /api/v1/project/:project_id` — delete a project.

## Environment Variables

Create a `.env` file in `backend/` with the following values:

```env
PORT=5000
MONGO_DB_URL=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
FRONTEND_URL=http://localhost:5173
```

## Setup and Run

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Notes

- The backend uses an auth cookie named `authToken` for protected API access.
- The frontend communicates with the backend via Axios and uses React Router for navigation.
- Validation middleware ensures request payloads match expected schemas before controller execution.

## Recommended Workflow

1. Start MongoDB and ensure `MONGO_DB_URL` is valid.
2. Configure `backend/.env`.
3. Run the backend server.
4. Run the frontend development server.
5. Open the frontend app in the browser and sign up or log in.
