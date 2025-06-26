import React, { useState } from 'react';
import './PageStyles.css';

function Problems() {
    const questions = [
        {
            question: `What will be the output of the following JavaScript code?

\`\`\`javascript
console.log(typeof null);
\`\`\``,
            options: ["object", "null", "undefined", "number"],
            answer: "object"
        },
        {
            question: `What is the output of the following C code?

\`\`\`c
#include<stdio.h>
int main() {
    int a = 5;
    printf("%d", a++);
    return 0;
}
\`\`\``,
            options: ["5", "6", "Compilation Error", "Garbage Value"],
            answer: "5"
        },

    ];

    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const handleOptionChange = (index, option) => {
        setSelectedAnswers(prev => ({ ...prev, [index]: option }));
    };

    const checkAnswers = () => {
        setShowResults(true);
    };

    return (
        <div className="page">
            <h1>Find the Output - MCQs</h1>
            {questions.map((q, index) => (
                <div key={index} className="question-card">
                    <pre className="question-text"><strong>Q{index + 1}:</strong> {q.question}</pre>
                    <div className="options-container">
                        {q.options.map((opt, i) => (
                            <label key={i} className="option-label">
                                <input
                                    type="radio"
                                    name={`q-${index}`}
                                    value={opt}
                                    checked={selectedAnswers[index] === opt}
                                    onChange={() => handleOptionChange(index, opt)}
                                    disabled={showResults}
                                />
                                {opt}
                            </label>
                        ))}
                    </div>
                    {showResults && (
                        <p className={selectedAnswers[index] === q.answer ? "correct" : "wrong"}>
                            {selectedAnswers[index] === q.answer
                                ? "✅ Correct"
                                : `❌ Wrong - Correct Answer: ${q.answer}`}
                        </p>
                    )}
                </div>
            ))}
            {!showResults && (
                <button onClick={checkAnswers} className="submit-button">Submit</button>
            )}
        </div>
    );
}

export default Problems;
