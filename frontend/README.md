# MERN User Management System

A full-stack **CRUD application** built with the **MERN stack (MongoDB, Express.js, React, Node.js)**.  
It allows users to register, log in, and manage a list of user records including personal info, address, and notes.

---

## 🔧 Features

- ✅ Secure registration and login with hashed passwords
- ✅ User-based data isolation (each user sees only their own records)
- ✅ Create, update, delete, and view user records
- ✅ Responsive UI using [Evergreen UI](https://evergreen.segment.com)
- ✅ Interactive data table with [AG Grid](https://www.ag-grid.com/)
- ✅ Protected routes with client-side routing
- ✅ Clean and accessible layout
- ✅ MongoDB integration using Mongoose

---

## 📂 Folder Structure

mern-crud-app/ │ ├── backend/ # Express API & MongoDB models │ ├── models/ # Mongoose schemas │ ├── routes/ # Authentication & CRUD API endpoints │ └── server.js # Express entry point │ ├── frontend/ # React + Evergreen UI frontend │ ├── src/ │ │ ├── components/ # All reusable React components │ │ └── App.js # Main router and app layout │ └── public/ │ ├── .env # Environment variables ├── README.md # Project documentation

---

## 🚀 How to Run the App

> ⚠️ Prerequisite: Make sure you have **Node.js**, **MongoDB**, and **npm** installed

### 1️⃣ Clone the repository

git clone https://github.com/wissgupta/mern-crud-app.git 

cd mern-crud-app

### 2️⃣ Backend Setup

cd backend npm install

Start the backend server:

npm start

---

### 3️⃣ Frontend Setup

Open a new terminal:

cd frontend npm install npm start

The React app will run at: `http://localhost:3000`  
The backend server runs at: `http://localhost:5000`

---

## 🧪 Test Credentials (optional for demonstration)

You can register a new user or test using this dummy login after creating it:

- Email: `test@example.com`
- Password: `123456`

---

## 🔐 Login & Session

- Users must **register first** before logging in
- Session state is stored using `localStorage`
- Only logged-in users can access:
  - `/add`
  - `/edit/:id`
  - `/table`

---

## 📌 Technologies Used

- MongoDB + Mongoose
- Express.js
- React + React Router
- Axios
- Evergreen UI
- AG Grid
- bcryptjs for password hashing

---

## 👨‍💻 Author

- **Name**: Tarun Gupta  
- **Student ID**: C0932284  
- **Course**: Full Stack Javascript  
- **Professor**: Terry D'Silva

---

## 🏁 Thank You!