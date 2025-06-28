import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.css';
import bg from '../assets/profile.jpg';

function Login() {
    const [formData, setFormData] = useState({
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
            const res = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/login`,
                formData
            );

            alert('Login successful!');
            navigate('/profile');
        } catch (err) {
            console.error('Login Error:', err);
            alert(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="form-bg" style={{ backgroundImage: `url(${bg})` }}>
            <div className="form-glass">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        onChange={handleChange}
                    />
                    <button type="submit">Log In</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
