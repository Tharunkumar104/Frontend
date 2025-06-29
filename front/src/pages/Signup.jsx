import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.css';
import bg from '../assets/profile.jpg';

function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make sure your VITE_API_BASE_URL is set correctly in your .env
            const res = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/signup`,
                formData
            );

            alert('Signup successful! Please log in.');
            navigate('/login');
        } catch (err) {
            // Enhanced error handling for all possible failure cases
            console.error('Signup Error:', err);

            if (err.response) {
                // Server responded with a status other than 2xx
                alert(
                    err.response.data?.error ||
                    err.response.data?.message ||
                    `Signup failed: ${err.response.statusText}`
                );
            } else if (err.request) {
                // Request was made but no response received
                alert('No response from server. Please try again later.');
            } else {
                // Something else happened
                alert('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="form-bg" style={{ backgroundImage: `url(${bg})` }}>
            <div className="form-glass">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
