import React from 'react';
import './PageStyles.css';

function Home() {
    return (
        <div className="page">
            <div className="home-container">
                <h1 className="home-title">Welcome to Skill Tracker</h1>
                <p className="home-subtitle">
                    Track your coding journey and sharpen your skills across competitive platforms.
                </p>

                <div className="home-section">
                    <h2>📈 Track Your Progress</h2>
                    <p>
                        View your performance in real-time across coding platforms like:
                        <strong> HackerRank, LeetCode, Codeforces, CodeChef, and GitHub</strong>.
                    </p>
                </div>

                <div className="home-section">
                    <h2>🧠 Practice by Skills</h2>
                    <p>
                        Select from core skills such as <strong>DSA, HTML, CSS, Python, Java, C/C++</strong> or domain-specific
                        topics like <strong>Embedded Systems, VLSI</strong> to solve curated MSQs.
                    </p>
                </div>

                <div className="home-section">
                    <h2>⏱ Timed Quizzes</h2>
                    <p>
                        Improve under pressure with <strong>3-minute timed assessments</strong> for every skill quiz.
                    </p>
                </div>

                <div className="home-section">
                    <h2>🎯 Personalized Dashboard</h2>
                    <p>
                        Analyze your strengths and weaknesses with visual progress stats and personalized insights.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Home;
