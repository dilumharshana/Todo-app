# 🚀 Fullstack Todo Application (React / Node)

This project uses a Monorepo structure to manage both the Backend API and the Frontend Web application seamlessly.

---

## Tech Stack

* Frontend (`/apps/web`)
- **React** + **Vite**
- **Tailwind CSS** 
- **React Hook Form** + **Zod** (Type-safe Schema Validation)
- **React Context API** (Global State Management)
- **Lucide React** (Consistent Iconography)
- **React Hot Toast** (User Feedback/Notifications)

* Backend (`/apps/api`)
- **Node.js** + **Express.js**
- **MongoDB Atlas** 
- **Mongoose** 
- **Global Error Handling Middleware**

# --- You can read back end README.md file inside app/we folder for mode details about server setup---


---


### Infrastructure
- **Turborepo**


---


## 📂 Project Structure

/
├── apps/
│   ├── api/           # Express Backend
│   └── web/           # Vite + React Frontend
├── turbo.json         # Turborepo Configuration
└── package.json       # Root Workspaces & Shared Scripts


---


## Setup & Installation

# Install all dependencies for both apps at once
    ```bash```
    npm install

# Environment Configuration

**Backend (apps/server/.env)**

    1. Create a .env file in the apps/api folder and add bellow variables with your value:

    PORT=3300
    MONGO_URI=your_mongodb_atlas_connection_string
    NODE_ENV=development

**Frontend (apps/client/.env)**

    1. Create a .env file in the apps/api folder and add bellow variables with your value:

    VITE_API_URL=http://localhost:3300/api


---


# Running the Application

**You can start both the Frontend and Backend simultaneously with a single command from the root folder:**

    ```bash``
    npm start

*Frontend: http://localhost:5173
*Backend API: http://localhost:5000/api/todos




