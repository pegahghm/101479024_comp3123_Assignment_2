import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import '../App.css';
import '../Signup.css';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); 
        try {
            const response = await axios.post('http://localhost:5000/api/user/signup', { email, password });
            
            if (response.status === 201) {
                navigate('/employees'); 
            } else {
                setError('Signup failed. Please try again.');
            }
        } catch (err) {
            console.error('Error signing up:', err);
            setError('An error occurred during signup. Please try again later.');
        }
    };

    return (
        <div className="signup-container">
            <h2 className='login-form h2'>Sign Up</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="signup-form">
                <div className='signup-form div'>
                    <label className='signup-form label'>Email:</label>
                    <input className='signup-form input'
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='signup-form div'>
                    <label className='signup-form label'>Password:</label>
                    <input className='signup-form input'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className='signup-form button' type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
