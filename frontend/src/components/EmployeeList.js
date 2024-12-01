import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../App.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('You need to log in first!');
          navigate('/login');
        }
        const url = searchTerm ? `http://localhost:5000/api/emp/search?name=${encodeURIComponent(searchTerm)}`
        : 'http://localhost:5000/api/emp/employees';
        const result = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(result.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
        if (error.response && error.response.status === 401) {
          alert('Unauthorized! Please log in.');
          navigate('/login');
        } else {
          alert('An error occurred while fetching employees.');
        }
      }
    };
    fetchEmployees();
  }, [searchTerm, navigate]);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/emp/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee._id !== id));

      alert('Employee deleted successfully!');
    } catch (error) {
      console.error('Error deleting employee:', error);
      if (error.response && error.response.status === 401) {
        alert('Unauthorized! Please log in.');
      } else {
        alert('An error occurred while deleting the employee.');
      }
    }
  };

  return (
    <div>
      <h2>Employee List</h2>
      <div className="search-bar">
        <input
          type="text"
          className="form-control"
          placeholder="Search employees by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
              <td>{employee.salary}</td>
              <td>
                <button className="btn btn-primary btn-sm" onClick={() => handleEdit(employee._id)}>
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(employee._id)}
                  style={{ marginLeft: '10px' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
