import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';
import '../App.css';


const AddEmployee = () => {
  const [employee, setEmployee] = useState({ name: '', position: '', department: '', salary: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/emp/add', employee, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('Employee added successfully!');
      setEmployee({ name: '', position: '', department: '', salary: '' });
    } catch (error) {
      setMessage('Error adding employee');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Add New Employee
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={employee.name}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Position"
          name="position"
          value={employee.position}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Department"
          name="department"
          value={employee.department}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Salary"
          name="salary"
          value={employee.salary}
          onChange={handleChange}
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Add Employee
        </Button>
      </form>
      {message && (
        <Typography variant="body1" color={message.includes('success') ? 'green' : 'red'} align="center" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default AddEmployee;
