// Import necessary libraries for grid functionality, routing, and UI
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AgGridReact } from '@ag-grid-community/react';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';
import { Button, Heading, Pane } from 'evergreen-ui';
import { useNavigate } from 'react-router-dom';

// Register the required AG Grid module
ModuleRegistry.registerModules([ClientSideRowModelModule]);

function UserTable() {
  // React state to hold the fetched user data
  const [rowData, setRowData] = useState([]);

  // useNavigate is used to go to edit/add pages
  const navigate = useNavigate();

  // Fetch all users for the logged-in user when the component loads
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    axios.get(`/api/users/${userId}`)
      .then((res) => setRowData(res.data))
      .catch((err) => console.error('Error fetching users:', err));
  }, []);

  // Handle the Delete button action for each row
  const handleDelete = async (id) => {
    if (window.confirm('Delete this user?')) {
      try {
        await axios.delete(`/api/users/${id}`);
        // Remove the deleted user from state without refetching
        setRowData(prev => prev.filter(user => user._id !== id));
      } catch (err) {
        console.error('Failed to delete user:', err);
      }
    }
  };

  // Define the columns for AG Grid
  const columnDefs = [
    { headerName: "First Name", field: "firstName", sortable: true },
    { headerName: "Last Name", field: "lastName", sortable: true },
    { headerName: "Email", field: "email" },
    {
      headerName: "Actions",
      // Custom cell renderer to include Edit and Delete buttons
      cellRenderer: (params) => (
        <>
          <Button
            appearance="primary"
            marginRight={8}
            onClick={() => navigate(`/edit/${params.data._id}`)}
          >
            Edit
          </Button>
          <Button
            appearance="danger"
            onClick={() => handleDelete(params.data._id)}
          >
            Delete
          </Button>
        </>
      )
    }
  ];

  return (
    <Pane background="tint1" padding={24} borderRadius={8}>
      {/* Table title and "Add" button */}
      <Heading size={600} marginBottom={16}>User Table</Heading>

      <Button appearance="primary" marginBottom={16} onClick={() => navigate('/add')}>
        Add New User
      </Button>

      {/* AG Grid table container */}
      <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
        <AgGridReact
          rowData={rowData}           // The data to display
          columnDefs={columnDefs}     // The column configuration
          pagination={true}           // Enable pagination
          rowModelType="clientSide"   // Use client-side row model
        />
      </div>
    </Pane>
  );
}

export default UserTable;
