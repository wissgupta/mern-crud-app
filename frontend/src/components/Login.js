// Import necessary modules and UI components
import React, { useState } from 'react';
import { Button, TextInput, Pane, toaster, Paragraph, Heading, Link } from 'evergreen-ui';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  // Define form state for email and password input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useNavigate is used to redirect users after login
  const navigate = useNavigate();

  // Function that handles login form submission
  const handleLogin = async () => {
    // Basic input validation
    if (!email || !password) {
      toaster.danger("Email and password are required");
      return;
    }

    try {
      // Make login request to backend
      const res = await axios.post('/auth/login', { email, password });

      // Store user credentials in localStorage
      localStorage.setItem('userId', res.data.userId);
      localStorage.setItem('email', res.data.email);

      // Show success message and redirect
      toaster.success("Login successful");
      navigate('/table');
    } catch (err) {
      // Show error message if credentials are invalid
      toaster.danger("Invalid login credentials");
    }
  };

  return (
    // Center the login card vertically and horizontally
    <Pane display="flex" alignItems="center" justifyContent="center" height="100vh" background="tint1">
      <Pane width={400} background="white" padding={32} borderRadius={12} elevation={2}>
        {/* Login title */}
        <Heading size={600} marginBottom={16}>Login</Heading>

        {/* Link to registration if user is new */}
        <Paragraph marginBottom={16}>
          <strong>New user?</strong> Please <Link onClick={() => navigate('/register')}>register here</Link> before logging in.
        </Paragraph>

        {/* Email input */}
        <TextInput
          placeholder="Email"
          width="100%"
          marginBottom={12}
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password input */}
        <TextInput
          placeholder="Password"
          width="100%"
          marginBottom={20}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Submit button */}
        <Button appearance="primary" onClick={handleLogin} width="100%">
          Login
        </Button>
      </Pane>
    </Pane>
  );
}

export default Login;
