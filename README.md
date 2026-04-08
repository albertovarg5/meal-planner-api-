# Meal Planner API

## Description
This API allows users to create meals, add foods, and track nutrition data. It is built using Node.js, Express, Sequelize, and SQLite.

## Setup

1. Install dependencies:
npm install

2. Seed the database:
npm run seed

3. Start the server:
node server.js

The server will run on:
http://localhost:3000

## Authentication
This API uses JWT authentication. After login, include the token in requests:

Authorization: Bearer YOUR_TOKEN

## Endpoints

### Auth
POST /auth/register - Create a new user  
POST /auth/login - Login and receive a token  

### Meals
GET /meals - Get all meals  
POST /meals - Create a meal  
PUT /meals/:id - Update a meal  
DELETE /meals/:id - Delete a meal  

### Foods
POST /meals/:id/foods - Add food to a meal  
PUT /meals/foods/:foodId - Update a food item  
DELETE /meals/foods/:foodId - Delete a food item  

### Progress
GET /progress - Get nutrition summary  

### Users
GET /users/profile - Get current user profile  

## Testing
Run tests with:
npm test