import React, { useEffect, useState } from 'react';
import bg from '../assets/profile.jpg';
import './Progress.css';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from 'recharts';

function Progress() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('progress')) || [];
        setData(stored);
    }, []);

    const handleReset = () => {
        localStorage.removeItem('progress');
        setData([]);
    };

    return (
        <div
            className="progress-container"
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                padding: '60px 20px'
            }}
        >
            <h2 style={{ textAlign: 'center', color: 'white', marginBottom: '30px' }}>📊 Your Progress</h2>

            {data.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'white' }}>No progress recorded yet.</p>
            ) : (
                <>
                    <table className="progress-table">
                        <thead>
                            <tr>
                                <th>Skill</th>
                                <th>Score</th>
                                <th>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, i) => (
                                <tr key={i}>
                                    <td>{row.skill}</td>
                                    <td>{row.score} / {row.total}</td>
                                    <td>{row.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div style={{
                        marginTop: '50px',
                        background: 'rgba(255,255,255,0.95)',
                        padding: '30px',
                        borderRadius: '10px',
                        maxWidth: '800px',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}>
                        <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>📈 Skill-wise Score Chart</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="skill" stroke="#333" />
                                <YAxis domain={[0, 10]} stroke="#333" />
                                <Tooltip wrapperStyle={{ backgroundColor: '#f5f5f5', borderRadius: '5px' }} />
                                <Bar dataKey="score" fill="#82ca9d" barSize={40} radius={[5, 5, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '30px' }}>
                        <button
                            onClick={handleReset}
                            style={{
                                padding: '10px 20px',
                                fontSize: '16px',
                                backgroundColor: '#ff4d4d',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                        >
                            Reset Progress
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Progress;