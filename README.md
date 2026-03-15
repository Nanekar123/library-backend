# Library Management System – Backend

## Overview

The **Library Management System Backend** provides RESTful APIs for managing books, users, authors, rentals, reviews, notifications, and analytics within a digital library platform.

The system is built using **Node.js, Express.js, and MySQL** and follows a modular **MVC architecture** for maintainability and scalability.

The application supports **role-based access control** for:

* Admin
* Author
* Reader

---

## Tech Stack

* Node.js
* Express.js
* MySQL
* JWT Authentication
* Multer (File Uploads)
* Axios (API communication)
* Rate Limiting Middleware

---

## System Architecture

The application follows a **three-tier architecture**.

Frontend → Backend → Database

```text
React Frontend
      │
      │ HTTP Requests
      ▼
Node.js / Express Backend
      │
      │ SQL Queries
      ▼
MySQL Database
```

### Components

**Frontend**

* React based UI
* Sends API requests using Axios

**Backend**

* Express REST APIs
* Business logic and authentication

**Database**

* MySQL relational database
* Stores books, users, issues and analytics data

---

## Project Structure

```
library-backend
│
├── src
│   ├── config
│   │   └── db.js
│
│   ├── controllers
│   │   ├── authController.js
│   │   ├── bookController.js
│   │   ├── issueController.js
│   │   ├── ratingController.js
│   │   ├── analyticsController.js
│   │   ├── authorController.js
│   │   ├── manuscriptController.js
│   │   ├── notificationController.js
│   │   ├── reviewController.js
│   │   ├── wishlistController.js
│   │   └── userController.js
│
│   ├── middleware
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   ├── rateLimiter.js
│   │   └── upload.js
│
│   ├── models
│   │   ├── Book.js
│   │   ├── Issue.js
│   │   ├── Rating.js
│   │   └── User.js
│
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── bookRoutes.js
│   │   ├── issueRoutes.js
│   │   ├── ratingRoutes.js
│   │   ├── authorRoutes.js
│   │   ├── manuscriptRoutes.js
│   │   ├── wishlistRoutes.js
│   │   ├── notificationRoutes.js
│   │   └── analyticsRoutes.js
│
│   └── utils
│
├── uploads
├── server.js
├── package.json
└── README.md
```

---

## Key Features

* Role-based authentication (Admin, Author, Reader)
* Book catalog management
* Book issue and return lifecycle
* Ratings and reviews system
* Author manuscript submission
* Wishlist functionality
* Admin analytics dashboard
* Notification services

---

## Example API Endpoints

### Login

POST `/api/auth/login`

Request

```
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response

```
{
  "token": "jwt_token",
  "user": {
    "id": 1,
    "role": "reader"
  }
}
```

---

### Get Books

GET `/api/books`

Response

```
[
  {
    "id": 1,
    "title": "Atomic Habits",
    "author": "James Clear",
    "rating": 4.8
  }
]
```

---

## Installation

Clone repository

```
git clone https://github.com/Nanekar123/library-backend.git
cd library-backend
```

Install dependencies

```
npm install
```

Create `.env`

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=library_db
JWT_SECRET=secretkey
```

Start server

```
npm start
```

Server runs at

```
http://localhost:5000
```

---

## Frontend Repository

Frontend UI:

https://github.com/Nanekar123/library-frontend

---

## Author

Supriya Nanekar

GitHub
https://github.com/Nanekar123
