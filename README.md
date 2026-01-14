# GigFlow - Freelance Marketplace

A full-stack MERN (MongoDB, Express, React, Node.js) application for posting gigs, bidding, and hiring freelancers.

## 🚀 Features

-   **Authentication**: Secure JWT-based auth with HttpOnly cookies.
-   **Gig Management**: Create, view, search, and filter gigs.
-   **Bidding System**: Freelancers can place bids; Clients can review and hire.
-   **Real-Time Updates**: Instant notifications for hiring actions using Socket.io.
-   **Dashboard**: Manage your posted gigs and active bids.
-   **Transactions**: Atomic hiring process ensuring data integrity (MongoDB Sessions).

## 🛠️ Tech Stack

-   **Frontend**: React (Vite), TypeScript, Tailwind CSS, Shadcn UI
-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB, Mongoose
-   **Real-time**: Socket.io

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Backend Setup
1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `server` directory (and root if needed) based on `.env.example`.
4.  Start the backend server:
    ```bash
    npm run dev
    ```
    The server works on port 5000.

### 3. Frontend Setup
1.  Navigate to the root directory (or specific client folder if applicable).
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The app runs on `http://localhost:5173`.

## ✅ Assignment Compliance

-   **Backend**: Node.js + Express (Verified)
-   **Database**: MongoDB + Mongoose Schemas (Verified)
-   **Auth**: JWT with HttpOnly Cookies (Verified)
-   **State Management**: React Context API (Verified)
-   **Bonus**: MongoDB Transactions implemented for hiring (Verified)
-   **Bonus**: Socket.io real-time notifications implemented (Verified)
