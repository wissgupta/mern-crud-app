// Importing core React and React Router modules
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing all components used for rendering different pages
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserForm from './components/UserForm';
import UserEdit from './components/UserEdit';
import UserTable from './components/UserTable';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  // This is the root of our frontend React app, rendering routes and layout
  return (
    <Router>
      {/* Main wrapper that includes the navigation bar and all pages */}
      <div className="container mt-4">
        {/* Navigation bar shown on all pages */}
        <Navbar />

        {/* Routing system that determines what component to render based on the URL */}
        <Routes>
          {/* Home page route */}
          <Route path="/" element={<Home />} />

          {/* Public login and register routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes (require login) */}
          <Route path="/add" element={<ProtectedRoute><UserForm /></ProtectedRoute>} />
          <Route path="/edit/:id" element={<ProtectedRoute><UserEdit /></ProtectedRoute>} />
          <Route path="/table" element={<ProtectedRoute><UserTable /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
