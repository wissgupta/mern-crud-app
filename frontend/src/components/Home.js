// Import required modules and UI components
import React from 'react';
import { Pane, Heading, Paragraph, Button } from 'evergreen-ui';
import { useNavigate } from 'react-router-dom';

function Home() {
  // useNavigate lets us redirect users programmatically
  const navigate = useNavigate();

  // Check if the user is logged in using localStorage
  const user = localStorage.getItem('userId');

  return (
    <Pane display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="80vh" padding={24}>
      {/* Main heading shown to all users */}
      <Heading size={700} marginBottom={24}>Welcome to the User Management System</Heading>

      {/* Display different instructions depending on login status */}
      {!user ? (
        <>
          {/* Message for users who are not logged in */}
          <Paragraph size={500} textAlign="center" marginBottom={16}>
            This is a secure MERN stack application. You must register and log in to access features.
          </Paragraph>
          <Paragraph size={500} marginBottom={24}>
            If you're new, please click below to register.
          </Paragraph>

          {/* Button to go to registration page */}
          <Button appearance="primary" onClick={() => navigate('/register')}>Register</Button>
        </>
      ) : (
        <>
          {/* Message shown to logged-in users */}
          <Paragraph size={500} textAlign="center" marginBottom={16}>
            You are logged in! Use the navigation menu to manage your users.
          </Paragraph>

          {/* Button to jump to the main user table */}
          <Button appearance="primary" onClick={() => navigate('/table')}>Go to User Table</Button>
        </>
      )}
    </Pane>
  );
}

export default Home;
