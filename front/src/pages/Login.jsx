import React from 'react';
import './Form.css';
import bg from '../assets/profile.jpg';

function Login() {
    return (
        <div className="form-bg" style={{ backgroundImage: `url(${bg})` }}>
            <div className="form-glass">
                <h2>Login</h2>
                <form>
                    <input type="email" placeholder="Email" required />
                    <input type="password" placeholder="Password" required />
                    <button type="submit">Log In</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
