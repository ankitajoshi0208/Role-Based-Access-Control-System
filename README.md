# RBAC Capstone Project

A Role-Based Access Control (RBAC) web application with a Node/Express + MongoDB backend and a React frontend. Users can register, log in, and create/read/update/delete posts according to their assigned role (admin, editor, viewer).

---

## Features

- JWT-based authentication (register / login)
- Role-based authorization (admin, editor, viewer)
- CRUD for posts with role checks:
  - Admin: create / edit / delete / view all
  - Editor: create / edit own / view all
  - Viewer: view only
- Clean React dashboard UI with posts management
- Database seeding for dev users

---

## Tech Stack

- Backend: Node.js, Express, Mongoose (MongoDB)
- Auth: bcryptjs, jsonwebtoken
- Frontend: React
- Dev tools: nodemon, dotenv, cors

---

## Prerequisites

- Node.js >= 16
- npm
- MongoDB running locally or accessible via URI

---

## Repository layout (relevant)

- backend/
  - src/
    - config/dbConnect.js
    - controllers/authController.js
    - controllers/postController.js
    - middlewares/authMiddleware.js
    - middlewares/roleMiddleware.js
    - models/userModel.js
    - models/Post.js
    - routes/authRoutes.js
    - routes/userRoutes.js
    - routes/postRoutes.js
    - seed.js
    - index.js
  - .env (not committed)
- rbac-frontend/
  - src/components/ (Dashboard, Posts, Auth, etc.)
  - package.json

---

## Environment variables

Create a `.env` file for the backend (place in `backend/` folder):

```env
MONGO_URI=mongodb://127.0.0.1:27017/rbac_db
PORT=7002
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```
#Screenshots
<img width="1350" height="606" alt="image" src="https://github.com/user-attachments/assets/f9031057-c7a0-42cf-8ff1-3a1b0e843a49" />
<img width="1347" height="596" alt="image" src="https://github.com/user-attachments/assets/efaf90a1-7e52-480b-887a-e881b3111066" />


