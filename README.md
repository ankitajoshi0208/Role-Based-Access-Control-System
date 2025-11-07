# Role-Based-Access-Control-System

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
## Screenshots
<img width="1351" height="606" alt="image" src="https://github.com/user-attachments/assets/40c4aa23-c3d3-4be1-9494-7e716398f1fd" />
<img width="1353" height="595" alt="image" src="https://github.com/user-attachments/assets/16d87218-cff4-4023-b714-5dbb9b839028" />
<img width="574" height="588" alt="image" src="https://github.com/user-attachments/assets/a8a6b271-140d-4ddd-8792-88b4c64b618c" />
<img width="523" height="597" alt="image" src="https://github.com/user-attachments/assets/5121398b-9b1b-4ddf-ad16-ff040c082ce0" />





