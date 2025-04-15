// Import necessary modules and UI components
import React, { useState } from 'react';
import { Button, TextInput, Pane, toaster, Paragraph, Heading, Link } from 'evergreen-ui';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  // State variables for user input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useNavigate is used to redirect user after registration
  const navigate = useNavigate();

  // Handles the registration form submission
  const handleRegister = async () => {
    // Basic input validation
    if (!email || !password) {
      toaster.danger("Email and password are required");
      return;
    }

    try {
      // Send registration request to backend
      await axios.post('/auth/register', { email, password });

      // Notify user and redirect to login page
      toaster.success("Registration successful! You can now log in.");
      navigate('/login');
    } catch (err) {
      // Show error message on failure
      toaster.danger(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    // Centered registration card
    <Pane display="flex" alignItems="center" justifyContent="center" height="100vh" background="tint1">
      <Pane width={400} background="white" padding={32} borderRadius={12} elevation={2}>
        {/* Registration form title */}
        <Heading size={600} marginBottom={16}>Register</Heading>

        {/* Login link for already registered users */}
        <Paragraph marginBottom={16}>
          Already have an account? <Link onClick={() => navigate('/login')}>Login here</Link>.
        </Paragraph>

        {/* Email input */}
        <TextInput
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          width="100%"
          marginBottom={12}
        />

        {/* Password input */}
        <TextInput
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          width="100%"
          marginBottom={20}
        />

        {/* Submit button */}
        <Button appearance="primary" onClick={handleRegister} width="100%">
          Register
        </Button>
      </Pane>
    </Pane>
  );
}

export default Register;
