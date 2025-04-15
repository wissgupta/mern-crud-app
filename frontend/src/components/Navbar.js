// Importing required modules and UI components
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Pane, Heading, Button, majorScale } from 'evergreen-ui';

function Navbar() {
  // useNavigate is used to redirect users programmatically
  const navigate = useNavigate();

  // Check if the user is logged in by looking for a stored userId
  const user = localStorage.getItem('userId');

  // Clears the session and redirects to login
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    // Outer container for the navigation bar
    <Pane display="flex" alignItems="center" padding={16} background="tint2" marginBottom={majorScale(2)}>
      {/* Application title aligned to the left */}
      <Heading size={600} flex={1}>User Manager</Heading>

      {/* Links section aligned to the right */}
      <Pane display="flex" alignItems="center" gap={20}>
        {/* Home link is always shown */}
        <Link to="/">Home</Link>

        {/* These links are shown only if the user is logged in */}
        {user && (
          <>
            <Link to="/table">User Table</Link>
            <Link to="/add">Add User</Link>
            {/* Logout button clears user session */}
            <Button appearance="minimal" onClick={handleLogout}>Logout</Button>
          </>
        )}

        {/* If user is not logged in, show login/register links */}
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </Pane>
    </Pane>
  );
}

export default Navbar;
