# Employee Management System API

A RESTful Employee Management System built using ASP.NET Core Web API, C#, Entity Framework Core, and SQLite. This project demonstrates CRUD operations, database integration, REST API development, and backend architecture following modern software engineering practices.

---

## 🚀 Features

* Create Employee Records
* Retrieve Employee Details
* RESTful API Architecture
* SQLite Database Integration
* Entity Framework Core Migrations
* Swagger UI for API Testing
* Clean and Scalable Backend Structure
* OOP-Based Design

---

## 🛠️ Tech Stack

* ASP.NET Core Web API
* C#
* Entity Framework Core
* SQLite
* Swagger UI
* REST APIs

---

## 📂 Project Structure

```bash
EmployeeAPI/
│
├── Controllers/
├── Data/
├── Models/
├── Migrations/
├── Properties/
├── Program.cs
├── appsettings.json
└── employee.db
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/shreyashinde561/Employee-Management-System-API.git
```

---

### 2️⃣ Navigate to Project Folder

```bash
cd Employee-Management-System-API
```

---

### 3️⃣ Restore Packages

```bash
dotnet restore
```

---

### 4️⃣ Apply Database Migration

```bash
dotnet-ef database update
```

---

### 5️⃣ Run the Project

```bash
dotnet run
```

---

## 🌐 Swagger API Testing

After running the project, open:

```bash
http://localhost:5185/swagger
```

---

## 📌 API Endpoints

### GET Employees

```http
GET /api/Employee
```

### Add Employee

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

---

## 📸 Project Output

* Employee data successfully stored in SQLite database
* CRUD APIs tested using Swagger UI

---

## 🎯 Learning Outcomes

* ASP.NET Core Web API Development
* Entity Framework Core Integration
* Database Migration Handling
* REST API Design
* OOP Concepts in C#
* Backend Development Best Practices

---

## 👩‍💻 Author

**Shreya Shinde**

* GitHub: https://github.com/shreyashinde561
* LinkedIn: https://www.linkedin.com/in/shreya-shinde-94b1092bb

---
