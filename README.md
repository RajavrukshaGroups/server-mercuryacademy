# Mercury Academy Backend

Backend API for the **Mercury Academy Education CMS**, built with **Node.js**, **Express.js**, and **MongoDB** following a modular and scalable architecture.

---

## 🚀 Features

- JWT Authentication
- Refresh Token Authentication
- Role-based Ready Architecture
- Audit Middleware
- Zod Validation
- Cloudinary Media Upload
- Modular Folder Structure
- Soft Delete Support
- Pagination
- Search
- Filtering
- Dashboard Analytics
- MongoDB Aggregation
- Professional Error Handling

---

# Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Zod
- Cloudinary
- Multer
- bcrypt
- Nodemon

---

# Project Structure

```
src
│
├── config
├── constants
├── helpers
├── middleware
├── modules
│
│── approval
│── auth
│── cities
│── countries
│── course-catalog
│── dashboard
│── leads
│── media
│── specializations
│── states
│── universities
│── university-course
│── users
│
├── routes
├── schemas
├── scripts
├── services
├── utils
├── validations
│
└── server.js
```

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Move into project

```bash
cd mercury-server
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file in the project root.

Example:

```env
NODE_ENV=development

PORT=5000

MONGO_URI=

JWT_SECRET=

JWT_REFRESH_SECRET=

CLIENT_URL=

ADMIN_URL=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

EMAIL_USER=

EMAIL_PASS=
```

---

# Running the Project

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

# Seed Default Admin

Run

```bash
npm run seed-admin
```

Default Login

```
Email:
admin@mercuryacademy.com

Password:
Admin@123
```

Change the password immediately after first login.

---

# Authentication

The project uses

- Access Token
- Refresh Token

### Login

```
POST
/api/v1/auth/login
```

### Profile

```
GET
/api/v1/auth/profile
```

### Change Password

```
PATCH
/api/v1/auth/change-password
```

### Logout

```
POST
/api/v1/auth/logout
```

### Refresh Token

```
POST
/api/v1/auth/refresh-token
```

---

# Modules

## Authentication

- Login
- Logout
- Refresh Token
- Profile
- Change Password

---

## Masters

- Country
- State
- City
- Approval

---

## University

- University
- Course Catalog
- Specialization
- University Course

---

## Media

- Cloudinary Upload
- Update
- Delete
- Search
- Pagination

---

## Lead

- Create Lead
- Update Lead
- Search
- Filter
- Pagination

---

## Dashboard

- Overview
- Lead Statistics
- Recent Leads
- Recent Universities
- Recent Media
- Monthly Leads Analytics
- University-wise Lead Analytics

---

# API Response Format

Success

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Success",
  "data": {}
}
```

Error

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation failed.",
  "errors": []
}
```

---

# Security

- JWT Authentication
- Password Hashing
- Route Protection
- Audit Middleware
- Soft Delete
- Helmet
- CORS

---

# Media Storage

Cloudinary is used for

- Images
- PDFs
- Videos

---

# Dashboard APIs

```
GET /dashboard/overview

GET /dashboard/lead-statistics

GET /dashboard/recent-leads

GET /dashboard/recent-universities

GET /dashboard/recent-media

GET /dashboard/monthly-leads

GET /dashboard/university-wise-leads
```

---

# Coding Standards

- Modular Architecture
- Service Layer Pattern
- Validation Layer
- Middleware-based Authentication
- Common Base Service
- Async/Await
- ES Modules

---

# Author

**Anup SR**

Backend Developer

Mercury Academy CMS
