import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import PrivateRoute from './components/PrivateRoute';
import EditEmployee from './components/EditEmployee';
import EmployeeDetails from './components/EmployeeDetails';
import './App.css';


const App = () => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  
  return (
    <Router>
      <div>
        {/* Display Navbar only if the user is logged in */}
        {localStorage.getItem('token') && <Navbar />}
        
        <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/employees" /> : <Navigate to="/login" />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/employees"
            element={
              <PrivateRoute>
                <EmployeeList />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-employee"
            element={
              <PrivateRoute>
                <AddEmployee />
              </PrivateRoute>
            }
          />
        <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <EditEmployee />
              </PrivateRoute>
            }
          />
          <Route
            path="/details/:id"
            element={
              <PrivateRoute>
                <EmployeeDetails />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
