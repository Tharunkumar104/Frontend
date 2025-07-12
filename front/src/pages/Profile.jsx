import React, { useState, useEffect } from 'react';
import './Profile.css';
import bg from '../assets/profile.jpg'; // Update path if needed

function Profile({ userId: propUserId }) {
    // Try to get userId from props or localStorage
    const userId = propUserId || localStorage.getItem('userId');

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        branch: '',
        skills: '',
        college: '',
        github: '',
        hackerrank: '',
        linkedin: '',
        codechef: ''
    });

    const [isEditing, setIsEditing] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch user name and email from backend
    useEffect(() => {
        if (!userId) {
            setError('No user ID found. Please log in again.');
            setLoading(false);
            return;
        }

        console.log('Fetching profile for userId:', userId); // Debug: log userId

        fetch(`/api/profile/${userId}`)
            .then(res => {
                console.log('Fetch response status:', res.status); // Debug: log status
                if (!res.ok) throw new Error('Failed to fetch profile');
                return res.json();
            })
            .then(data => {
                console.log('Fetched profile data:', data); // Debug: log data
                setUserData(prev => ({
                    ...prev,
                    name: data.name || '',
                    email: data.email || ''
                }));
                setLoading(false);
            })
            .catch((err) => {
                console.error('Fetch error:', err); // Debug: log error
                setError('Could not load profile.');
                setLoading(false);
            });
    }, [userId]);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsEditing(false);
        // Optionally, send updated data to backend here
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    if (loading) {
        return (
            <div className="page" style={{ backgroundImage: `url(${bg})` }}>
                <div className="form-container">
                    <h1 className="profile-title">Profile</h1>
                    <div>Loading profile...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page" style={{ backgroundImage: `url(${bg})` }}>
                <div className="form-container">
                    <h1 className="profile-title">Profile</h1>
                    <div style={{ color: 'red' }}>{error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="page" style={{ backgroundImage: `url(${bg})` }}>
            <div className="form-container">
                <h1 className="profile-title">Profile</h1>

                {isEditing ? (
                    <form onSubmit={handleSubmit} className="profile-form">
                        <label>Name:
                            <input type="text" name="name" value={userData.name} onChange={handleChange} required />
                        </label>
                        <label>Email:
                            <input type="email" name="email" value={userData.email} onChange={handleChange} required />
                        </label>
                        <label>Branch:
                            <input type="text" name="branch" value={userData.branch} onChange={handleChange} required />
                        </label>
                        <label>Skills:
                            <input type="text" name="skills" value={userData.skills} onChange={handleChange} placeholder="e.g., HTML, C++, VLSI" />
                        </label>
                        <label>College Name:
                            <input type="text" name="college" value={userData.college} onChange={handleChange} />
                        </label>
                        <label>GitHub Link:
                            <input type="url" name="github" value={userData.github} onChange={handleChange} />
                        </label>
                        <label>HackerRank Profile:
                            <input type="url" name="hackerrank" value={userData.hackerrank} onChange={handleChange} />
                        </label>
                        <label>LinkedIn Profile:
                            <input type="url" name="linkedin" value={userData.linkedin} onChange={handleChange} />
                        </label>
                        <button type="submit">Save</button>
                    </form>
                ) : (
                    <div className="profile-display">
                        <div className="profile-row"><span>Name:</span><span>{userData.name}</span></div>
                        <div className="profile-row"><span>Email:</span><span>{userData.email}</span></div>
                        <div className="profile-row"><span>Branch:</span><span>{userData.branch}</span></div>
                        <div className="profile-row"><span>Skills:</span><span>{userData.skills}</span></div>
                        <div className="profile-row"><span>College:</span><span>{userData.college}</span></div>
                        <div className="profile-row"><span>GitHub:</span>
                            <span><a href={userData.github} target="_blank" rel="noopener noreferrer">{userData.github}</a></span>
                        </div>
                        <div className="profile-row"><span>HackerRank:</span>
                            <span><a href={userData.hackerrank} target="_blank" rel="noopener noreferrer">{userData.hackerrank}</a></span>
                        </div>
                        <div className="profile-row"><span>LinkedIn:</span>
                            <span><a href={userData.linkedin} target="_blank" rel="noopener noreferrer">{userData.linkedin}</a></span>
                        </div>
                        <button onClick={handleEdit}>Edit Profile</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
