// Import React and required utilities for form creation and navigation
import React, { useState } from 'react';
import axios from 'axios';
import { TextInput, Textarea, Button, Pane, toaster, Heading } from 'evergreen-ui';
import { useNavigate } from 'react-router-dom';

function UserForm() {
  // Initialize user data state for form inputs
  const [user, setUser] = useState({
    firstName: '', lastName: '', dob: '', address1: '', address2: '',
    city: '', postalCode: '', country: '', phone: '', email: '', notes: ''
  });

  // Hook used to navigate programmatically after form submission
  const navigate = useNavigate();

  // Handle input field changes and update corresponding state
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Validate that important fields are not empty
    const requiredFields = ['firstName', 'lastName', 'email'];
    for (let field of requiredFields) {
      if (!user[field]) {
        toaster.danger(`${field} is required`);
        return;
      }
    }

    // Basic email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(user.email)) {
      toaster.danger('Enter a valid email address');
      return;
    }

    try {
      // Send the new user to backend along with creator's ID
      const userId = localStorage.getItem('userId');
      await axios.post('/api/users', { ...user, userId });
      toaster.success('User added!');
      navigate('/table');
    } catch (error) {
      toaster.danger('Failed to add user');
    }
  };

  return (
    // Form wrapper with visual spacing
    <Pane maxWidth={600} marginX="auto" marginTop={40}>
      {/* Heading at the top of the form */}
      <Heading size={600} marginBottom={24}>Add New User</Heading>

      {/* Dynamically render all form fields from the state object */}
      {Object.keys(user)
        .filter(key => !['_id', '__v', 'userId'].includes(key)) // Exclude backend/system fields
        .map((key) =>
          key !== 'notes' ? (
            <TextInput
              key={key}
              name={key}
              placeholder={key}
              value={user[key] || ''}
              onChange={handleChange}
              marginBottom={12}
              width="100%"
              type={key === 'email' ? 'email' : 'text'}
            />
          ) : (
            <Textarea
              key={key}
              name="notes"
              placeholder="User Notes"
              value={user.notes || ''}
              onChange={handleChange}
              marginBottom={12}
              width="100%"
            />
          )
        )}

      {/* Form submission button */}
      <Pane display="flex" gap={12}>
        <Button appearance="primary" onClick={handleSubmit}>Add User</Button>
        <Button appearance="default" onClick={() => navigate('/table')}>Cancel</Button>
      </Pane>
    </Pane>
  );
}

export default UserForm;
