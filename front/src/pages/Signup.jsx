import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';
import bg from '../assets/profile.jpg';

function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/signup`, formData);
            alert('Signup successful!');
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.error || 'Signup failed');
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
                        onChange={handleChange}
                    />
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
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
