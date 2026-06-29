# 🚀 DevConnect

> **A production-ready MERN Stack platform that enables developers to connect, collaborate, and grow together.**

DevConnect is a full-stack social networking platform built specifically for developers. Users can create professional profiles, discover developers based on their skills, send connection requests, chat in real time, and leverage AI to generate professional bios.

The project is built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)** and follows industry-standard backend architecture with **Mongoose**, secure JWT authentication, and scalable REST APIs.

---

# 🌟 Features

* 🔐 Secure User Authentication (JWT + Cookies)
* 🔒 Password Encryption using Bcrypt
* 👤 User Registration, Login & Logout
* ✏️ Profile Management
* 🤝 Send & Manage Connection Requests
* 👥 Developer Feed
* 💬 Real-Time Chat
* 🤖 AI-Powered Bio Generator
* 🔍 Discover Developers by Skills
* 🛡️ Protected APIs using Authentication Middleware
* ⚡ RESTful API Architecture
* 📦 Scalable Backend with MongoDB & Mongoose

---

# 🛠 Tech Stack

## Frontend

* React.js
* Redux Toolkit
* Tailwind CSS
* Axios

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

## Authentication & Security

* JWT (JSON Web Token)
* Bcrypt
* Cookie Parser

## Deployment

* AWS EC2
* Ubuntu Server
* Nginx Reverse Proxy
* Cloudflare DNS
* GoDaddy Domain
* SSL Configuration

---

# 🚀 API Endpoints

## Authentication

| Method | Endpoint  | Description                   |
| ------ | --------- | ----------------------------- |
| POST   | `/signup` | Register a new user           |
| POST   | `/login`  | Authenticate user             |
| POST   | `/logout` | Logout the authenticated user |

### Profile

| Method | Endpoint                 | Description                     |
| ------ | ------------------------ | ------------------------------- |
| GET    | `/profile/view`          | View logged-in user profile     |
| PATCH  | `/profile/edit`          | Update profile details          |
| POST   | `/profile/ai-suggestion` | Generate AI-powered profile bio |

### Connection Requests

| Method | Endpoint                             | Description                           |
| ------ | ------------------------------------ | ------------------------------------- |
| POST   | `/request/send/:status/:toUserId`    | Send a connection request             |
| POST   | `/request/review/:status/:requestId` | Accept or reject a connection request |

### User

| Method | Endpoint                  | Description                        |
| ------ | ------------------------- | ---------------------------------- |
| GET    | `/user/requests/received` | Fetch received connection requests |
| GET    | `/user/connections`       | Fetch all accepted connections     |
| GET    | `/feed`                   | Retrieve the developer feed        |

### Chat

| Method | Endpoint              | Description                                      |
| ------ | --------------------- | ------------------------------------------------ |
| GET    | `/chat/:targetUserId` | Retrieve chat history with a connected developer |

---

# 🔐 Authentication Flow

* User Registration
* Secure Password Hashing using Bcrypt
* JWT Token Generation
* Cookie-Based Authentication
* Protected Routes using Middleware
* Authorization for Secure API Access

---

# 🏗 Backend Highlights

* Built scalable REST APIs
* MongoDB schema design using Mongoose
* JWT-based Authentication & Authorization
* Password Encryption using Bcrypt
* Cookie-based Session Management
* Input Validation
* Centralized Error Handling
* Reusable Middleware
* RESTful API Design
* CRUD Operations
* API Testing using Postman

---

# 🤖 AI Features

### AI Profile Bio Generator

Generate professional developer bios automatically based on:

* Skills
* Experience
* Tech Stack
* Career Goals

This feature helps developers create attractive and professional profiles within seconds.

---

# ☁ Deployment

The application is deployed using production-grade cloud infrastructure.

* AWS EC2
* Ubuntu Server
* Nginx Reverse Proxy
* Cloudflare DNS
* GoDaddy Domain
* SSL Security

---

# 🚀 Future Enhancements

* Video Calling
* Push Notifications
* Email Verification
* Forgot Password
* Resume Analysis using AI
* AI Skill Recommendations
* Google & GitHub OAuth Login
* CI/CD Pipeline
* Docker Containerization
* Kubernetes Deployment
* Microservices Architecture

---

# 🎯 Project Goal

DevConnect aims to provide developers with a modern platform where they can showcase their technical expertise, build meaningful professional connections, collaborate on projects, communicate seamlessly, and leverage AI to enhance their networking experience.

---

# 👨‍💻 Author

**Lenka Prasanth Kumar**

GitHub: **https://github.com/Prasanth2799**

---

## ⭐ Support

If you found this project useful, consider giving it a **⭐ Star**. Your support motivates me to build more production-ready applications and contribute to the developer community.

**Built with ❤️ using the MERN Stack**
