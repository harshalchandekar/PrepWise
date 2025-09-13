
## Personal Finance Tracker (MERN)

### Backend (Node.js + Express + MongoDB)

- Endpoints:
  - POST `/api/transactions`
  - GET `/api/transactions`
  - GET `/api/transactions/:id`
  - PUT `/api/transactions/:id`
  - DELETE `/api/transactions/:id`

#### Setup

1. Create `.env` in `backend/` (see `.env.example`).
2. Install deps and run server:

```bash
cd backend
npm install
npm run server
```

### Frontend (React + Vite + Tailwind)

Routes:
- `/` Dashboard/List
- `/add` Add new transaction
- `/:id/edit` Edit transaction
- `/:id/delete` Delete confirmation

#### Setup

1. Create `.env` in `frontend/` (see `.env.example`).
2. Install deps and run dev server:

```bash
cd frontend
npm install
npm start
```

By default, the frontend expects the API at `http://localhost:5000/api`.

### Folder Structure

- `backend/`
  - `src/`
    - `models/`, `controllers/`, `routes/`, `config/`, `middleware/`
  - `.env.example`
- `frontend/`
  - `src/`
    - `pages/`, `components/`, `services/`
  - `.env.example`

### Notes

- Income amounts displayed in green, expenses in red on the dashboard.
- After add/update/delete, the app navigates back to the dashboard and refreshes data.
