import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 
import axios from 'axios';
import '../App.css';

const UpdateEmployee = ({ employeeId, onUpdate }) => {
    const [employee, setEmployee] = useState({ name: '', position: '', department: '' });
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/employees/${employeeId}`);
                setEmployee(response.data);
            } catch (err) {
                console.error('Error fetching employee:', err);
                setError('Failed to fetch employee details.');
            } finally {
                setLoading(false);
            }
        };
        fetchEmployee();
    }, [employeeId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prevEmployee) => ({ ...prevEmployee, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); 
        try {
            await axios.put(`http://localhost:5000/api/employees/${employeeId}`, employee);
            onUpdate(); 
        } catch (err) {
            console.error('Error updating employee:', err);
            setError('Failed to update employee details. Please try again.');
        }
    };

    if (loading) {
        return <p>Loading employee details...</p>;
    }

    return (
        <div className="update-employee-container">
            <h2>Update Employee</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="update-employee-form">
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={employee.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="position">Position:</label>
                    <input
                        type="text"
                        id="position"
                        name="position"
                        placeholder="Position"
                        value={employee.position}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="department">Department:</label>
                    <input
                        type="text"
                        id="department"
                        name="department"
                        placeholder="Department"
                        value={employee.department}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Update Employee</button>
            </form>
        </div>
    );
};

UpdateEmployee.propTypes = {
    employeeId: PropTypes.string.isRequired, 
    onUpdate: PropTypes.func.isRequired,    
};

export default UpdateEmployee;
