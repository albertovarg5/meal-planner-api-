# Meal Planner API

## Description

The Meal Planner API is a RESTful backend application that allows users to create meals, add foods, and track nutritional data over time.

It helps users monitor calories, protein, carbohydrates, and fats in an organized way.

This project demonstrates backend development concepts including authentication, role-based authorization, database relationships, and testing.

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- Sequelize ORM
- SQLite
- JWT (jsonwebtoken)
- bcryptjs
- Jest & Supertest

---

## ⚙️ Setup (Local)

1. Install dependencies:
npm install

2. Seed the database:
npm run seed

3. Start the server:
node server.js

Server runs at:
http://localhost:3000

---

## 🔐 Authentication

This API uses JWT (JSON Web Tokens).

### Register

POST /auth/register

Example request:
{
  "name": "Alberto",
  "email": "alberto@test.com",
  "password": "123456"
}

⚠️ Role is automatically set to "user" and cannot be chosen during registration.

---

### Login

POST /auth/login

Example response:
{
  "message": "Login successful.",
  "token": "YOUR_JWT_TOKEN"
}

---

### Using the Token

Include this header in protected routes:

Authorization: Bearer YOUR_TOKEN

---

## 👥 Roles and Permissions

### User
- Can create, update, and delete their own meals and foods
- Can view their own progress

### Trainer
- Can view all users
- Can view all meals and progress

⚠️ Users cannot register as a trainer. This role must be assigned manually.

---

## 📡 API Endpoints

### Auth
- POST /auth/register → Create user  
- POST /auth/login → Login  

---

### Meals
- GET /meals → Get user meals  
- POST /meals → Create meal  
- PUT /meals/:id → Update meal  
- DELETE /meals/:id → Delete meal  

---

### Foods
- POST /meals/:id/foods → Add food  
- PUT /meals/foods/:foodId → Update food  
- DELETE /meals/foods/:foodId → Delete food  

---

### Progress
- GET /progress → Nutrition summary  

---

### Users
- GET /users/profile → Current user  
- GET /users → Trainer only  
- GET /users/:id/meals → Trainer only  

---

## ⚠️ Error Handling

- 200 → Success  
- 201 → Created  
- 400 → Bad Request  
- 401 → Unauthorized  
- 403 → Forbidden  
- 409 → Conflict (duplicate email)  
- 500 → Server Error  

---

## 🧪 Testing

Run tests with:
npm test

Includes:
- Authentication tests  
- Meals and foods tests  
- Progress tests  
- Role-based access control tests  

---

## 📄 Documentation

Postman API documentation:

👉 PASTE YOUR POSTMAN LINK HERE

---

## 🧠 Features

- JWT Authentication  
- Role-Based Access Control (RBAC)  
- CRUD operations  
- Secure password hashing  
- Error handling and validation  
- Automated testing  

---

## 👨‍💻 Author

Alberto Vargas