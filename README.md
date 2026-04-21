# Meal Planner API

## Description

This API allows users to create meals, add foods, and track nutrition data. It is built using Node.js, Express, Sequelize, and SQLite.

The goal of this API is to help users manage their daily meals and monitor calories, protein, carbs, and fats over time.

---

## Setup

1. Install dependencies:
   npm install

2. Seed the database:
   npm run seed

3. Start the server:
   node server.js

The server will run on:
http://localhost:3000

---

## Authentication

This API uses JWT authentication.

### Register

POST /auth/register
Creates a new user (role is always set to "user")

### Login

POST /auth/login
Returns a JWT token

### Using the Token

Include this in your requests:

Authorization: Bearer YOUR_TOKEN

---

## Roles and Permissions

This API includes role-based access control:

### User

* Can create, update, and delete their own meals and foods
* Can view their own progress

### Trainer

* Can view all users
* Can view all meals and progress

⚠️ Important:
Users cannot register as a trainer. This role must be assigned manually.

---

## Endpoints

### Auth

POST /auth/register - Create a new user
POST /auth/login - Login and receive a token

---

### Meals

GET /meals - Get all meals for logged-in user
POST /meals - Create a new meal
PUT /meals/:id - Update a meal
DELETE /meals/:id - Delete a meal

---

### Foods

POST /meals/:id/foods - Add food to a meal
PUT /meals/foods/:foodId - Update a food item
DELETE /meals/foods/:foodId - Delete a food item

---

### Progress

GET /progress - Get nutrition summary (calories, protein, carbs, fats)

---

### Users

GET /users/profile - Get current user profile

GET /users (Trainer only) - Get all users
GET /users/:id/meals (Trainer only) - Get meals for a specific user

---

## Error Handling

This API returns appropriate status codes:

* 200 - Success
* 201 - Created
* 400 - Bad request (invalid input)
* 401 - Unauthorized (missing or invalid token)
* 403 - Forbidden (not allowed)
* 409 - Conflict (duplicate email)
* 500 - Server error

---

## Testing

Run tests with:
npm test

Includes:

* Authentication tests
* Meal and food tests
* Progress tests
* Security tests (role protection and validation)

---

## Technologies Used

* Node.js
* Express.js
* Sequelize ORM
* SQLite
* JWT (jsonwebtoken)
* bcryptjs
* Jest (testing)
* Supertest

---

## Notes

This project was developed as a backend final project and demonstrates:

* RESTful API design
* Authentication and authorization
* Database relationships
* Error handling and validation
* Automated testing

---

## Author

Alberto Vargas
