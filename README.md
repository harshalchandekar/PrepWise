E-commerce Single Page App
==========================

Stack
-----
- Backend: Node.js, Express, MongoDB (Mongoose), JWT auth
- Frontend: React (Vite), react-router, simple contexts for Auth and Cart
- Extras: docker-compose with MongoDB and mongo-express

Features
--------
- Auth: signup and login returning JWT
- Items: CRUD with filters (price min/max, category, q)
- Cart: add, update, remove; persists via anonymous sessionId even when logged out
- Frontend pages: Signup, Login, Listing with filters + Add to cart, Cart page

Getting Started
---------------
1) Start MongoDB (recommended via Docker):

```bash
docker compose up -d
```

Mongo Express UI will be at `http://localhost:8081`.

2) Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

3) Seed items

```bash
cd backend
npm run seed
```

4) Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Open `http://localhost:5173`.

Notes
-----
- Change `CLIENT_ORIGIN` in `backend/.env` if your frontend runs elsewhere.
- The cart persists by storing a `sessionId` in `localStorage` and passing it via `x-session-id` header.
- For admin-like item creation/update/delete, current setup just requires a valid user token.

# PrepWise

**PrepWise** is an AI-powered mock interview platform that simulates real interview experiences and provides instant feedback to help users prepare and excel in their job interviews.

## Tech Stack

- **Next.js** (App Router, TypeScript)
- **React**
- **Tailwind CSS**
- **Firebase** (Authentication, Firestore)
- **Vapi SDK** (Voice AI Interviewer)
- **Sonner** (UI Notifications)

## Features
- Real-time AI interviewer with voice interaction
- User authentication and session management
- Dynamic question sets and interview flows
- Instant transcript and feedback generation
- Modern, responsive UI

---

> Built to empower candidates with realistic interview practice and actionable insights.
