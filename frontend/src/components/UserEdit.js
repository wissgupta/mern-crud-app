// Import required modules for routing, form input, and backend requests
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextInput, Textarea, Button, Pane, toaster, Heading } from 'evergreen-ui';

function UserEdit() {
  // Get the user ID from the URL (e.g., /edit/:id)
  const { id } = useParams();

  // useNavigate lets us programmatically redirect after update/delete
  const navigate = useNavigate();

  // Initialize state to hold user data
  const [user, setUser] = useState({
    firstName: '', lastName: '', dob: '', address1: '', address2: '',
    city: '', postalCode: '', country: '', phone: '', email: '', notes: ''
  });

  // Fetch user data when the component loads using the ID from the URL
  useEffect(() => {
    axios.get(`/api/users/record/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error('Failed to fetch user:', err));
  }, [id]);

  // Update local state when any input field changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle the update button click
  const handleUpdate = async () => {
    // Check for required fields
    const requiredFields = ['firstName', 'lastName', 'email'];
    for (let field of requiredFields) {
      if (!user[field]) {
        toaster.danger(`${field} is required`);
        return;
      }
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(user.email)) {
      toaster.danger('Please enter a valid email address');
      return;
    }

    try {
      // Send the updated user data to backend
      await axios.put(`/api/users/${id}`, user);
      toaster.success('User updated!');
      navigate('/table');
    } catch (error) {
      toaster.danger('Failed to update user');
    }
  };

  // Handle the delete button click
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/api/users/${id}`);
        toaster.success('User deleted!');
        navigate('/table');
      } catch (error) {
        toaster.danger('Failed to delete user');
      }
    }
  };

  return (
    <Pane maxWidth={600} marginX="auto" marginTop={40}>
      {/* Page title */}
      <Heading size={600} marginBottom={24}>Edit User</Heading>

      {/* Render input fields based on user object keys */}
      {Object.keys(user)
        .filter(key => !['_id', '__v', 'userId'].includes(key)) // Exclude system fields
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

      {/* Buttons for updating and deleting */}
      <Pane display="flex" gap={12}>
        <Button appearance="primary" onClick={handleUpdate}>Update</Button>
        <Button appearance="danger" onClick={handleDelete}>Delete</Button>
      </Pane>
    </Pane>
  );
}

export default UserEdit;
