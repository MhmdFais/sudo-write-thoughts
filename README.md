# Sudo Write { Thoughts } - Blogging Platform

Sudo Write { Thoughts } is a blogging platform where users can read articles, comment on posts, and interact with others. Registered users can create, update, and comment on posts, while unregistered users can view content and comments but cannot participate until logged in.

The platform includes a React frontend and an Express backend with the following functionalities:

- Frontend: Displays articles, allows user registration, and enables users to post comments.
- Backend: Handles authentication, article management (CRUD), and comment posting.

# Live Preview

# Screenshots

![image](https://github.com/user-attachments/assets/5a550b0e-2d0e-4b18-b8d3-7fd190548757)

![image](https://github.com/user-attachments/assets/eaa58161-0335-495d-8420-1391fbf9ea85)

![image](https://github.com/user-attachments/assets/e4b5daf7-c13f-4a26-87d3-bbf4f3cafe6c)

![image](https://github.com/user-attachments/assets/3814ab77-5630-47bb-ba97-7bd7af2eb4c8)

![image](https://github.com/user-attachments/assets/7494fc95-3b3d-441f-9795-c4a3829fbf45)

![image](https://github.com/user-attachments/assets/cda97272-628c-4a2f-a637-1ccf296f256d)

![image](https://github.com/user-attachments/assets/139e7a93-ce41-4c1f-9049-3ee25afb4633)

![image](https://github.com/user-attachments/assets/042f9a40-be66-45c8-9d1b-09a5f2566293)

![image](https://github.com/user-attachments/assets/d8fc5296-00c0-44ff-9a63-b0c99acdfc99)

![image](https://github.com/user-attachments/assets/3e257c65-acc0-489c-9716-4d02875ce05c)

![image](https://github.com/user-attachments/assets/a8d45791-bd8b-4d00-9593-14db6a802892)

![image](https://github.com/user-attachments/assets/a2d05c87-aa14-405d-b5ef-3473ce8ed552)


# Key Features

- User Authentication: Only logged-in users can comment or post articles.
- Role-Based Access: Admin users can manage (create, update, delete) posts.
- Commenting System: Users can post comments, and admins can delete inappropriate comments.
- TinyMCE Editor: Articles are created and displayed using TinyMCE in read-only mode.
- Protected Routes: Users must log in to access certain features, like posting comments.

# Frontend Installation

1. Clone the repository

```
git clone https://github.com/MhmdFais/sudo-write-thoughts
cd client
```

2. Install dependencies

```
npm install
```

3. Set up environment variables

# Backend Installation

1. Navigate to the backend folder

```
cd ../server
```

2. Install backend dependencies

```
npm install
```

3. Set up environment variables

4. Make sure you have a PostgreSQL database running

5. Run database migrations to set up the database schema

```
npx prisma migrate deploy
```

# Environment Variables

Frontend .env

```
VITE_REACT_APP_API_URL=<your_backend_base_url>   # Example: http://localhost:4000
VITE_MCE_API_KEY=<your_tinymce_api_key>          # Get from https://www.tiny.cloud/
```

Backend .env

```
PORT=4000
DATABASE_URL=<your_postgresql_database_url>      # Example: postgresql://user:pass@localhost:5432/db_name
JWT_SECRET=<your_jwt_secret>                     # Secret key for JWT signing
```

# How to Run

## Backend

1. Navigate to the backend folder

```
cd server
```

2. Start the backend server

```
npm run dev
```

## Frontend

1. Navigate to the frontend folder

```
cd client
```

2. Start the frontend development server

```
npm run dev
```

# Technologies

## Frontend:

- React: Library for building the UI.
- React Router: Client-side routing.
- Axios: To make HTTP requests to the backend.
- TinyMCE: WYSIWYG editor for creating and displaying post content.
- Vite: Fast development server and build tool.

## Backend:

- Node.js: Backend runtime environment.
- Express.js: Web framework for building the backend.
- PostgreSQL: Database for storing user and blog data.
- Prisma: ORM for database queries.
- JWT: For user authentication.
- bcrypt: For password hashing.

# API Endpoints

## Auth Routes

- POST /auth/register: Register a new user.
- POST /auth/login: Log in and get a JWT.
- POST /auth/logout: Log out the user by invalidating the refresh token.

## Post Routes

- GET /posts: Get all blog posts.
- GET /posts/:id: Get details of a single post.
- POST /admin/posts: Create a new post (Admin only).
- PATCH /admin/posts/:id: Edit an existing post (Admin only).
- DELETE /admin/posts/:id: Delete a post (Admin only).

## Comment Routes

- POST /posts/:id/comment: Add a comment to a post (Logged-in users only).
- DELETE /admin/posts/:id/comment/:commentId: Delete a comment (Admin only).

# Contributions

Feel free to fork this project, open issues, or submit pull requests to improve the platform!
