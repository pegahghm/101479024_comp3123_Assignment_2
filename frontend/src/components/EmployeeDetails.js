import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../App.css';

const EmployeeDetails = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const token = localStorage.getItem('token');
                const result = await axios.get(
                    `http://localhost:5000/api/emp/employees/${id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setEmployee(result.data);
            } catch (err) {
                console.error('Error fetching employee:', err.message);
                setError('Failed to load employee details.');
            } finally {
                setLoading(false);
            }
        };
        fetchEmployee();
    }, [id]);

    if (loading) {
        return <p>Loading employee details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!employee) {
        return <p>No employee data found.</p>;
    }

    return (
        <div className="modal">
            <h2>Employee Details</h2>
            <p><strong>Name:</strong> {employee.name}</p>
            <p><strong>Position:</strong> {employee.position}</p>
            <p><strong>Department:</strong> {employee.department}</p>
            <p><strong>Salary:</strong> {employee.salary}</p>
        </div>
    );
};

export default EmployeeDetails;
