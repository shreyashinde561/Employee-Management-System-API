# Employee Management System API

A Full Stack Employee Management System built using ASP.NET Core Web API, React.js, C#, Entity Framework Core, JWT Authentication, and SQLite. This project demonstrates CRUD operations, secure authentication, REST API development, database integration, and production deployment using Render and Vercel.

---

# 🚀 Live Demo

## 🌐 Frontend Application

https://employee-management-system-api-11n4.vercel.app

## 🔥 Backend API (Swagger)

https://employee-management-system-api-42ze.onrender.com/swagger

## 💻 GitHub Repository

https://github.com/shreyashinde561/Employee-Management-System-API

---

# 🚀 Features

* Employee CRUD Operations
* JWT Authentication & Authorization
* User Registration & Login
* Protected API Endpoints
* RESTful API Architecture
* SQLite Database Integration
* Entity Framework Core Migrations
* Swagger UI for API Testing
* React Frontend Integration
* Production Deployment Ready
* Clean and Scalable Backend Structure
* OOP-Based Design

---

# 🛠️ Tech Stack

## Backend

* ASP.NET Core Web API
* C#
* Entity Framework Core
* SQLite
* JWT Authentication
* Swagger UI

## Frontend

* React.js
* Axios
* Bootstrap
* Context API

## Deployment

* Render (Backend API)
* Vercel (Frontend)

---

# 📂 Project Structure

```bash
Employee-Management-System-API/
│
├── Controllers/
├── Data/
├── DTOs/
├── Middleware/
├── Models/
├── Services/
├── Migrations/
├── employee-frontend/
├── Program.cs
├── appsettings.json
└── employee.db
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/shreyashinde561/Employee-Management-System-API.git
```

---

## 2️⃣ Navigate to Project Folder

```bash
cd Employee-Management-System-API
```

---

## 3️⃣ Restore Packages

```bash
dotnet restore
```

---

## 4️⃣ Apply Database Migration

```bash
dotnet ef database update
```

---

## 5️⃣ Run Backend API

```bash
dotnet run
```

Backend runs on:

```bash
http://localhost:5000
```

---

## 6️⃣ Run Frontend

Navigate to frontend folder:

```bash
cd employee-frontend
```

Install packages:

```bash
npm install
```

Start frontend:

```bash
npm start
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# 🔐 Authentication

JWT Bearer Authentication is implemented for secure API access.

## Available Authentication APIs

### Register User

```http
POST /api/Auth/register
```

### Login User

```http
POST /api/Auth/login
```

---

# 📌 Employee API Endpoints

## Get All Employees

```http
GET /api/Employee
```

## Get Employee By ID

```http
GET /api/Employee/{id}
```

## Add Employee

```http
POST /api/Employee
```

Sample Request:

```json
{
  "name": "Shreya",
  "department": "IT",
  "email": "shreya@gmail.com",
  "salary": 50000
}
```

## Update Employee

```http
PUT /api/Employee/{id}
```

## Delete Employee

```http
DELETE /api/Employee/{id}
```

---

# 🌐 Swagger API Testing

After running the backend project, open:

```bash
http://localhost:5000/swagger
```

Production Swagger:

```bash
https://employee-management-system-api-42ze.onrender.com/swagger
```

---

# 📸 Project Highlights

* Secure JWT Authentication System
* Full CRUD Employee Management
* SQLite Database with Entity Framework Core
* Swagger API Documentation
* React Frontend Connected to Production API
* Production Deployment using Render & Vercel
* Clean Architecture & Middleware Handling

---

# 🎯 Learning Outcomes

* ASP.NET Core Web API Development
* React Frontend Integration
* JWT Authentication & Authorization
* Entity Framework Core Integration
* Database Migration Handling
* REST API Design
* Production Deployment
* OOP Concepts in C#
* Backend Development Best Practices

---

# 👩‍💻 Author

## Shreya Shinde

### 📧 Email

[shreyashinde561@gmail.com](mailto:shreyashinde561@gmail.com)

### 🔗 LinkedIn

https://www.linkedin.com/in/shreya-shinde-94b1092bb

### 💻 GitHub

https://github.com/shreyashinde561

### 🌐 Portfolio

https://shreyashinde561.github.io/portfolio

---
