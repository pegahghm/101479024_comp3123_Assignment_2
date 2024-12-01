import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../EditEmployee.css';

const EditEmployee = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    position: '',
    department: '',
    salary: ''
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/emp/employees/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data) {
          setEmployee({
            name: response.data.name || '',
            position: response.data.position || '',
            department: response.data.department || '',
            salary: response.data.salary || '',
          });
        } else {
          console.error('Invalid response:', response);
        }
      } catch (error) {
        console.error('Error fetching employee:', error);
        alert('Failed to fetch employee details.');
      }
    };
    fetchEmployee();
  }, [id]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:5000/api/emp/employees/${id}`, employee,{ headers: { Authorization: `Bearer ${token}` } });
      console.log('Employee updated:', response.data);
      navigate('/employees'); 
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };


  return (
    <div className="Edit_container">
      <h2 className='Edit_Form h2'>Edit Employee</h2>
      <form onSubmit={handleSubmit} className='Edit_Form'>
        <div className="Edit_Form div">
          <label className='Edit_Form label'>Name:</label>
          <input className='Edit_Form input'
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="Edit_Form div">
          <label className='Edit_Form label'>Position:</label>
          <input className='Edit_Form input'
            type="text"
            name="position"
            value={employee.position}
            onChange={handleChange}
            required
          />
        </div>
        <div className="Edit_Form div">
          <label className='Edit_Form label'>Department:</label>
          <input className='Edit_Form input'
            type="text"
            name="department"
            value={employee.department}
            onChange={handleChange}
            required
          />
        </div>
        <div className="Edit_Form div">
          <label className='Edit_Form label'>Salary:</label>
          <input className='Edit_Form input'
            type="text"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
            required
          />
        </div>
        <button className='Edit_Form button' type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditEmployee;
