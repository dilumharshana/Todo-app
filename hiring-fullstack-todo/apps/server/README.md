# 🚀 Todo App - Backend API
---

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas (Cloud)
- **ODM**: Mongoose
- **Environment**: Dotenv

---

## Prerequisites
- Node.js (v20.x or higher recommended)
- A MongoDB Atlas account 

---

## Setup & Installation

1. **Install dependencies:**
   ```bash```
    npm install

2. **Configure Environment Variables:**
    PORT=3300
    MONGO_URI=your_mongodb_atlas_connection_string
    NODE_ENV=development

3. **Start the server:**
     ```bash``
    npm run dev 

---


## API Endpoints

1. **Fetch all TODO items:**
    GET,/api/todos,

2. **Create a new TODO item**
    POST,/api/todos

3. **Update title or description**
    PUT,/api/todos/:id

4. **Toggle completion status (isDone)**
    PATCH,/api/todos/:id/done

5. **Remove a TODO item**
    DELETE,/api/todos/:id


---


## Project Structure


/server
├── /src
│   ├── /config      # Database connection setup
│   ├── /constants   # Server constant values
│   ├── /controllers # Business logic for routes
│   ├── /middleware  # Global error handling and logging
│   ├── /models      # Mongoose schemas
│   ├── /routes      # Route definitions
└── server.js        # Entry point


---

## Assumptions & Limitations

* Security: For the purpose of this assignment, no Authentication/Authorization (JWT) is implemented.

* CORS: Configured to allow all origins for easy testing during the review process.

* Database: Assumes the user has whitelisted 0.0.0.0/0 in MongoDB Atlas Network Access to allow the recruiter to connect.