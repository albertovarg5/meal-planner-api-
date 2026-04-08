# Meal Planner API

## Description
This API allows users to create meals, add foods, and track nutrition.

## Setup

1. Install dependencies:
npm install

2. Seed database:
npm run seed

3. Start server:
node server.js

## Endpoints

### Auth
POST /auth/register
POST /auth/login

### Meals
GET /meals
POST /meals
PUT /meals/:id
DELETE /meals/:id

### Foods
POST /meals/:id/foods
PUT /meals/foods/:foodId
DELETE /meals/foods/:foodId

### Progress
GET /progress

### Users
GET /users/profile