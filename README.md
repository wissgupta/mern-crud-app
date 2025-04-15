📘 MERN User Management System
A full-stack CRUD application built with the MERN stack (MongoDB, Express.js, React, Node.js).
It allows users to register, log in, and manage a list of user records including personal info, address, and notes.

🔧 Features
✅ Secure registration and login using hashed passwords
✅ Each user sees only their own records
✅ Add, edit, and delete user details
✅ Responsive UI using Evergreen UI
✅ Dynamic data grid with AG Grid
✅ Protected routes with client-side routing
✅ Fully styled, clean and intuitive interface
✅ MongoDB database integration with Mongoose

📂 Folder Structure

mern-crud-app/
│
├── backend/             # Express API & MongoDB models
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/            # React + Evergreen + AG Grid frontend
│   ├── src/
│   │   ├── components/
│   │   └── App.js
│   └── public/
│
├── .env                 # Environment variables (Mongo URI & Port)
├── README.md            # You're reading it!
🚀 How to Run the App
⚠️ Prerequisite: Make sure you have Node.js, MongoDB, and npm installed

1️⃣ Clone the repository

git clone https://github.com/yourusername/mern-crud-app.git
cd mern-crud-app
2️⃣ Backend Setup

cd backend
npm install
Create a .env file in the backend/ folder and add:

MONGO_URI=mongodb://localhost:27017/merncrud
PORT=5000
Then start the backend server:

npm start

3️⃣ Frontend Setup
Open a new terminal and run:

cd frontend
npm install
Start the React development server:
npm start

✅ Default Environment
React: http://localhost:3000

Node/Express API: http://localhost:5000

MongoDB: local instance at mongodb://localhost:27017/merncrud

🔐 Login & Session
User credentials are stored securely using bcryptjs

Sessions are stored client-side using localStorage

Routes like /add, /edit/:id, and /table are protected

📌 Technologies Used
MongoDB + Mongoose for database

Express.js as the backend API

React with functional components & hooks

AG Grid for data table UI

Evergreen UI for form inputs and layout

Axios for HTTP requests

React Router for page navigation

👨‍💻 Author
Name: Tarun Gupta

Student ID: C0932284

Course: Full Stack Javascript

Professor: Terry D'Silva


