# Meal Planner and Nutrition Tracker API

## Project Overview
This project is a Meal Planner and Nutrition Tracker API built with Node.js, Express, Sequelize, and SQLite. It helps users create meals, add foods, and track nutrition information such as calories, protein, carbs, and fats. The API also includes JWT authentication and role-based authorization with two roles: user and trainer.

## Technologies Used
- Node.js
- Express.js
- Sequelize ORM
- SQLite
- JWT
- bcryptjs
- Jest
- Supertest
- Postman

## Resource Types
The API includes three main resource types:
- Users
- Meals
- Foods

## Relationships
- One user can have many meals
- One meal can have many foods

## Setup Instructions

### 1. Clone the repository
```bash
git clone YOUR_GITHUB_LINK
cd meal-planner-api