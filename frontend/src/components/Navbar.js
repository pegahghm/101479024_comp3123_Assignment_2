import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <nav className="navbar">
          <ul>
            <li><Link to="/employees">Employee List</Link></li>
            <li><Link to="/add-employee">Add Employee</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </ul>
        </nav>
      );
    };
    
    export default Navbar;