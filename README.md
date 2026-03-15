# Library Management System – Backend

## Overview

The Library Management System Backend provides REST APIs for managing books, users, authors, rentals, and analytics within a digital library platform.

The backend is built using **Node.js, Express.js, and MySQL**, following a modular **MVC architecture** for scalability and maintainability.

It supports **role-based access control** for:

* Admin
* Author
* Reader

---

## Tech Stack

* Node.js
* Express.js
* MySQL
* JWT Authentication
* Multer (File Upload)
* Rate Limiting Middleware

---

## Project Structure

```
src
│
├── config
│   └── db.js
│
├── controllers
│   ├── authController.js
│   ├── bookController.js
│   ├── issueController.js
│   ├── ratingController.js
│   ├── analyticsController.js
│   ├── authorController.js
│   ├── manuscriptController.js
│   ├── notificationController.js
│   ├── reviewController.js
│   ├── wishlistController.js
│   └── userController.js
│
├── middleware
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   ├── rateLimiter.js
│   └── upload.js
│
├── models
│   ├── Book.js
│   ├── Issue.js
│   ├── Rating.js
│   └── User.js
│
├── routes
│   ├── authRoutes.js
│   ├── bookRoutes.js
│   ├── issueRoutes.js
│   ├── ratingRoutes.js
│   ├── authorRoutes.js
│   ├── manuscriptRoutes.js
│   ├── wishlistRoutes.js
│   ├── notificationRoutes.js
│   └── analyticsRoutes.js
│
└── utils
```

---

## Features

### Authentication

* User registration and login
* JWT authentication
* Role-based authorization

### Book Management

* Add books
* Update books
* Delete books
* Browse available books

### Issue & Return System

* Issue books
* Track return status
* Maintain issue history

### Ratings & Reviews

* Users can rate books
* Write reviews for books

### Author Module

* Author onboarding
* Manuscript submissions

### Wishlist

* Users can maintain reading wishlists

### Notifications

* Event-based notification service

### Analytics

* Admin insights and activity metrics

---

## Installation

### Clone repository

```
git clone https://github.com/Nanekar123/library-backend.git
cd library-backend
```

### Install dependencies

```
npm install
```

### Setup environment variables

Create `.env`

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=library_db
JWT_SECRET=secretkey
```

### Start server

```
npm start
```

Server runs at:

```
http://localhost:5000
```

---

## API Modules

| Module        | Description           |
| ------------- | --------------------- |
| Auth          | Authentication APIs   |
| Books         | Book management       |
| Issues        | Book issue and return |
| Ratings       | Book ratings          |
| Authors       | Author management     |
| Manuscripts   | Author submissions    |
| Wishlist      | User wishlist         |
| Notifications | User notifications    |
| Analytics     | Admin analytics       |

---

## Security

* JWT authentication
* Role-based access control
* Rate limiting
* Input validation

---

## Author

Supriya Nanekar

GitHub:
https://github.com/Nanekar123
