# 📚 Library Management System – Backend

## 🚀 Overview

The **Library Management System Backend** provides RESTful APIs for managing books, users, authors, rentals, reviews, notifications, and analytics within a digital library platform.

The system is built using **Node.js, Express.js, and MySQL** and follows a modular **MVC architecture** for maintainability and scalability.

The application supports **role-based access control** for:

* Admin
* Author
* Reader

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MySQL
* JWT Authentication
* Multer (File Uploads)
* Axios
* Rate Limiting Middleware
* Docker 🐳

---

## 🏗️ System Architecture

The application follows a **three-tier architecture**.

```
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

---

## 📁 Project Structure

```
library-backend
│
├── src
│   ├── config
│   │   └── db.js
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   └── utils
│
├── uploads
├── server.js
├── Dockerfile
├── .dockerignore
├── package.json
└── README.md
```

---

## ✨ Key Features

* Role-based authentication (Admin, Author, Reader)
* Book catalog management
* Book issue and return lifecycle
* Ratings and reviews system
* Author manuscript submission
* Wishlist functionality
* Admin analytics dashboard
* Notification services
* Dockerized backend for easy deployment

---

## 📡 API Documentation

Swagger UI available at:

```
http://localhost:5000/api-docs
```

---

## 📌 Example API Endpoints

### 🔐 Login

POST `/api/auth/login`

```
{
  "email": "user@example.com",
  "password": "password123"
}
```

---

### 📚 Get Books

GET `/api/books`

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

## ⚙️ Installation (Without Docker)

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
DB_PORT=3306
JWT_SECRET=secretkey
```

Run server

```
npm start
```

---

## 🐳 Docker Setup (Recommended)

### 1️⃣ Build Docker Image

```
docker build -t library-backend .
```

### 2️⃣ Run Container

```
docker run -p 5000:5000 --env-file .env library-backend
```

### 3️⃣ Important Configuration

Make sure `.env` contains:

```
DB_HOST=host.docker.internal
DB_PORT=3306
```

---

## 🌐 Access Application

```
http://localhost:5000
```

Swagger Docs:

```
http://localhost:5000/api-docs
```

---

## 🧠 Deployment Notes

* Backend is containerized using Docker
* Environment variables are managed via `.env`
* MySQL runs on host machine and connects via Docker network
* Application is production-ready and scalable

---

## 💻 Frontend Repository

Frontend UI:

https://github.com/Nanekar123/library-frontend

---

## 👩‍💻 Author

**Supriya Nanekar**

GitHub:
https://github.com/Nanekar123

---

## 🏁 Conclusion

This project demonstrates a complete backend system with:

* Scalable architecture
* Secure authentication
* RESTful API design
* Docker-based deployment

---
