import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuestionSection.css';
import bg from '../assets/profile.jpg';

const Skills = () => {
    const [selectedDomain, setSelectedDomain] = useState('');
    const [selectedSkill, setSelectedSkill] = useState('');
    const navigate = useNavigate();

    const domainSkills = {
        'Computer Science': ['HTML', 'CSS', 'JavaScript', 'Java', 'Python', 'C'],
        'Electronics': ['VLSI', 'Embedded', 'IoT', 'Signal Processing', 'Microcontrollers']
    };

    const handleDomainChange = (domain) => {
        setSelectedDomain(domain);
        setSelectedSkill('');
    };

    const handleSkillChange = (skill) => {
        setSelectedSkill(skill);
        if (skill) navigate(`/questions/${skill}`);
    };

    return (
        <div
            className="skills-container"
            style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: 'Segoe UI, sans-serif',
                color: 'white',
                padding: '2rem'
            }}
        >
            <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                padding: '2rem',
                borderRadius: '10px',
                maxWidth: '600px',
                width: '100%',
                boxShadow: '0 4px 15px rgba(0,0,0,0.4)'
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Choose Your Domain and Skill</h2>

                <div style={{ marginBottom: '2rem' }}>
                    <label htmlFor="domain" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Select Domain:</label>
                    <select
                        id="domain"
                        value={selectedDomain}
                        onChange={(e) => handleDomainChange(e.target.value)}
                        style={{
                            padding: '0.6rem 1rem',
                            borderRadius: '6px',
                            fontSize: '1rem',
                            marginLeft: '1rem',
                            backgroundColor: '#fff',
                            color: '#333',
                            border: 'none'
                        }}
                    >
                        <option value="">--Choose Domain--</option>
                        {Object.keys(domainSkills).map((domain) => (
                            <option key={domain} value={domain}>{domain}</option>
                        ))}
                    </select>
                </div>

                {selectedDomain && (
                    <div style={{ marginBottom: '2rem' }}>
                        <label htmlFor="skill" style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Select Skill:</label>
                        <select
                            id="skill"
                            value={selectedSkill}
                            onChange={(e) => handleSkillChange(e.target.value)}
                            style={{
                                padding: '0.6rem 1rem',
                                borderRadius: '6px',
                                fontSize: '1rem',
                                marginLeft: '1rem',
                                backgroundColor: '#fff',
                                color: '#333',
                                border: 'none'
                            }}
                        >
                            <option value="">--Choose Skill--</option>
                            {domainSkills[selectedDomain].map((skill) => (
                                <option key={skill} value={skill}>{skill}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Skills;
