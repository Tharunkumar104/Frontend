import React from 'react';
import './Form.css';
import bg from '../assets/profile.jpg';

function Signup() {
    return (
        <div className="form-bg" style={{ backgroundImage: `url(${bg})` }}>
            <div className="form-glass">
                <h2>Sign Up</h2>
                <form>
                    <input type="text" placeholder="Name" required />
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
