import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // ✅ This line is necessary
import './QuestionSection.css';
import bg from '../assets/profile.jpg';


const sampleQuestions = {
    HTML: [
        { id: 1, question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language', 'Hyper Tool Multi Language'], answer: ['Hyper Text Markup Language'] },
        { id: 2, question: 'Which tag is used to define a hyperlink?', options: ['<a>', '<link>', '<href>', '<url>'], answer: ['<a>'] },
        { id: 3, question: 'Which tag is used for inserting an image?', options: ['<image>', '<pic>', '<img>', '<src>'], answer: ['<img>'] },
        { id: 4, question: 'Which tag is used to create a numbered list?', options: ['<ol>', '<ul>', '<li>', '<list>'], answer: ['<ol>'] },
        { id: 5, question: 'What is the correct syntax for creating a checkbox in HTML?', options: ['<input type="checkbox">', '<checkbox>', '<input checkbox>', '<box type="check">'], answer: ['<input type="checkbox">'] },
        { id: 6, question: 'Which tag is used for table rows?', options: ['<tr>', '<td>', '<th>', '<row>'], answer: ['<tr>'] },
        { id: 7, question: 'What is the correct HTML for making a text bold?', options: ['<b>', '<strong>', '<bold>', '<em>'], answer: ['<b>', '<strong>'] },
        { id: 8, question: 'What is the default method of a form?', options: ['get', 'post', 'submit', 'put'], answer: ['get'] },
        { id: 9, question: 'What does the alt attribute in <img> tag specify?', options: ['Alternate text', 'Image location', 'Image size', 'None'], answer: ['Alternate text'] },
        { id: 10, question: 'Which tag defines a division or a section?', options: ['<div>', '<section>', '<span>', '<article>'], answer: ['<div>', '<section>', '<article>'] }
    ],
    CSS: [
        { id: 1, question: 'Which property is used to change the text color of an element?', options: ['color', 'text-color', 'fgcolor', 'font-color'], answer: ['color'] },
        { id: 2, question: 'Which CSS property controls the size of text?', options: ['font-size', 'text-size', 'text-style', 'font-style'], answer: ['font-size'] },
        { id: 3, question: 'How do you make each word in a text start with a capital letter?', options: ['text-transform: capitalize', 'text-style: capitalize', 'transform: capitalize', 'text-capitalize'], answer: ['text-transform: capitalize'] },
        { id: 4, question: 'Which property is used to change the background color?', options: ['background-color', 'bgcolor', 'color', 'background'], answer: ['background-color'] },
        { id: 5, question: 'What does the z-index property control?', options: ['Stacking order', 'Font size', 'Text color', 'Border'], answer: ['Stacking order'] },
        { id: 6, question: 'How do you select an element with id "demo"?', options: ['#demo', '.demo', 'demo', '*demo'], answer: ['#demo'] },
        { id: 7, question: 'Which property is used for flexible box layout?', options: ['display: flex', 'flex-direction', 'justify-content', 'align-items'], answer: ['display: flex'] },
        { id: 8, question: 'Which value of position is used to fix an element at a specific position?', options: ['fixed', 'absolute', 'relative', 'static'], answer: ['fixed'] },
        { id: 9, question: 'Which property is used to add shadows to text?', options: ['text-shadow', 'box-shadow', 'shadow-text', 'font-shadow'], answer: ['text-shadow'] },
        { id: 10, question: 'How can you animate an element in CSS?', options: ['@keyframes', 'animation', 'transition', 'All'], answer: ['All'] }
    ],
    Embedded: [
        { id: 1, question: 'What is an embedded system?', options: ['A computer system within a larger system', 'A standalone computer', 'Web application', 'None'], answer: ['A computer system within a larger system'] },
        { id: 2, question: 'Which language is commonly used in embedded systems?', options: ['C', 'Python', 'Java', 'HTML'], answer: ['C'] },
        { id: 3, question: 'Which is an example of an embedded OS?', options: ['FreeRTOS', 'Windows', 'Linux Mint', 'macOS'], answer: ['FreeRTOS'] },
        { id: 4, question: 'What is a microcontroller?', options: ['An integrated circuit', 'An OS', 'A power supply', 'A debugger'], answer: ['An integrated circuit'] },
        { id: 5, question: 'Which pin is used for ground?', options: ['GND', 'VCC', 'TX', 'RX'], answer: ['GND'] },
        { id: 6, question: 'Which of these is NOT a communication protocol?', options: ['I2C', 'SPI', 'UART', 'HTML'], answer: ['HTML'] },
        { id: 7, question: 'Which tool is used for debugging?', options: ['JTAG', 'Multimeter', 'Oscilloscope', 'DMM'], answer: ['JTAG'] },
        { id: 8, question: 'Which device uses embedded systems?', options: ['Washing machine', 'Smartphone', 'Calculator', 'All'], answer: ['All'] },
        { id: 9, question: 'What does ADC stand for?', options: ['Analog to Digital Converter', 'Advanced Device Control', 'Automatic Digital Counter', 'All Digital Circuit'], answer: ['Analog to Digital Converter'] },
        { id: 10, question: 'Which register stores program counter?', options: ['PC', 'IR', 'DR', 'MAR'], answer: ['PC'] }
    ],
    IoT: [
        { id: 1, question: 'What does IoT stand for?', options: ['Internet of Things', 'Internal of Technology', 'Input of Transmission', 'None'], answer: ['Internet of Things'] },
        { id: 2, question: 'Which protocol is used in IoT?', options: ['MQTT', 'SMTP', 'FTP', 'POP'], answer: ['MQTT'] },
        { id: 3, question: 'Which layer handles physical devices in IoT?', options: ['Perception', 'Network', 'Application', 'Transport'], answer: ['Perception'] },
        { id: 4, question: 'Which of these is an IoT platform?', options: ['Arduino', 'ThingSpeak', 'Python', 'MATLAB'], answer: ['ThingSpeak'] },
        { id: 5, question: 'Which technology supports long-range communication?', options: ['LoRa', 'Wi-Fi', 'Bluetooth', 'ZigBee'], answer: ['LoRa'] },
        { id: 6, question: 'Which sensor measures temperature?', options: ['DHT11', 'LDR', 'IR', 'PIR'], answer: ['DHT11'] },
        { id: 7, question: 'What does ESP32 include?', options: ['WiFi and Bluetooth', 'Only WiFi', 'Only Bluetooth', 'None'], answer: ['WiFi and Bluetooth'] },
        { id: 8, question: 'Which protocol is used for RESTful communication?', options: ['HTTP', 'MQTT', 'SMTP', 'ZigBee'], answer: ['HTTP'] },
        { id: 9, question: 'Which is a real-time OS for IoT?', options: ['FreeRTOS', 'Windows', 'Ubuntu', 'Raspbian'], answer: ['FreeRTOS'] },
        { id: 10, question: 'Which microcontroller is commonly used in IoT?', options: ['ESP8266', '555 Timer', '8051', 'None'], answer: ['ESP8266'] }
    ],
    SignalProcessing: [
        { id: 1, question: 'What is signal processing used for?', options: ['Analysis and manipulation of signals', 'Only amplification', 'Power control', 'Data hiding'], answer: ['Analysis and manipulation of signals'] },
        { id: 2, question: 'Which transform is commonly used in DSP?', options: ['Fourier Transform', 'Laplace Transform', 'Z-Transform', 'All'], answer: ['All'] },
        { id: 3, question: 'What is Nyquist rate?', options: ['Twice the bandwidth', 'Half the bandwidth', 'Bandwidth', 'None'], answer: ['Twice the bandwidth'] },
        { id: 4, question: 'What is a discrete signal?', options: ['Defined at discrete times', 'Continuous', 'Analog', 'None'], answer: ['Defined at discrete times'] },
        { id: 5, question: 'Which filter allows all frequencies?', options: ['All-pass', 'Low-pass', 'High-pass', 'Band-pass'], answer: ['All-pass'] },
        { id: 6, question: 'What is convolution?', options: ['Mathematical operation on signals', 'Differentiation', 'Multiplication', 'None'], answer: ['Mathematical operation on signals'] },
        { id: 7, question: 'Which is a windowing technique?', options: ['Hamming', 'Blackman', 'Hanning', 'All'], answer: ['All'] },
        { id: 8, question: 'What is FFT?', options: ['Fast Fourier Transform', 'Full Form Technique', 'Function Filtering Tool', 'None'], answer: ['Fast Fourier Transform'] },
        { id: 9, question: 'Which unit is used to measure signal power?', options: ['dB', 'Hz', 'Volt', 'Ampere'], answer: ['dB'] },
        { id: 10, question: 'Which signal is both time and amplitude discrete?', options: ['Digital', 'Analog', 'Continuous', 'None'], answer: ['Digital'] }
    ],
    Microcontrollers: [
        { id: 1, question: 'What is a microcontroller?', options: ['A small computer on a single IC', 'A sensor', 'A timer', 'None'], answer: ['A small computer on a single IC'] },
        { id: 2, question: 'Which microcontroller is used in Arduino Uno?', options: ['ATmega328P', '8051', 'PIC16F877A', 'STM32'], answer: ['ATmega328P'] },
        { id: 3, question: 'Which pin resets the controller?', options: ['RESET', 'VCC', 'GND', 'RX'], answer: ['RESET'] },
        { id: 4, question: 'Which bus is used to connect devices?', options: ['Data bus', 'Control bus', 'Address bus', 'All'], answer: ['All'] },
        { id: 5, question: 'Which memory is non-volatile?', options: ['ROM', 'RAM', 'Cache', 'Register'], answer: ['ROM'] },
        { id: 6, question: 'Which signal starts execution?', options: ['Clock', 'Reset', 'Enable', 'Power'], answer: ['Clock'] },
        { id: 7, question: 'Which port is used for serial communication?', options: ['UART', 'SPI', 'I2C', 'GPIO'], answer: ['UART'] },
        { id: 8, question: 'Which is a high-level language for microcontrollers?', options: ['C', 'Python', 'Assembly', 'Java'], answer: ['C'] },
        { id: 9, question: 'Which register holds instruction being executed?', options: ['IR', 'PC', 'SP', 'ACC'], answer: ['IR'] },
        { id: 10, question: 'What is PWM used for?', options: ['Controlling power', 'Sending data', 'Reading memory', 'Interrupts'], answer: ['Controlling power'] }
    ],
    JavaScript: [
        { id: 1, question: 'Which keyword declares a variable in JS?', options: ['var', 'let', 'const', 'define'], answer: ['var', 'let', 'const'] },
        { id: 2, question: 'Which symbol is used for comments in JS?', options: ['//', '/*', '<!--', '#'], answer: ['//', '/*'] },
        { id: 3, question: 'What is the output of typeof null?', options: ['null', 'object', 'undefined', 'function'], answer: ['object'] },
        { id: 4, question: 'Which method is used to convert JSON to object?', options: ['JSON.parse()', 'JSON.stringify()', 'JSON.toObject()', 'parseJSON()'], answer: ['JSON.parse()'] },
        { id: 5, question: 'Which are falsy values in JS?', options: ['0', 'false', 'null', 'undefined'], answer: ['0', 'false', 'null', 'undefined'] },
        { id: 6, question: 'Which methods are array methods?', options: ['map()', 'filter()', 'reduce()', 'forEach()'], answer: ['map()', 'filter()', 'reduce()', 'forEach()'] },
        { id: 7, question: 'Which statements are valid loops?', options: ['for', 'while', 'do-while', 'foreach'], answer: ['for', 'while', 'do-while'] },
        { id: 8, question: 'Which object handles date/time?', options: ['Date', 'Time', 'Moment', 'Calendar'], answer: ['Date'] },
        { id: 9, question: 'Which are event types in JS?', options: ['click', 'submit', 'change', 'mouseover'], answer: ['click', 'submit', 'change', 'mouseover'] },
        { id: 10, question: 'Which is the correct way to define a function?', options: ['function test() {}', 'let test = function() {}', 'const test = () => {}', 'define test()'], answer: ['function test() {}', 'let test = function() {}', 'const test = () => {}'] }
    ],
    Java: [
        { id: 1, question: 'Which keyword is used to define a class in Java?', options: ['class', 'struct', 'define', 'object'], answer: ['class'] },
        { id: 2, question: 'Which method is the entry point of Java programs?', options: ['main()', 'start()', 'init()', 'run()'], answer: ['main()'] },
        { id: 3, question: 'Which keyword is used to inherit a class?', options: ['extends', 'implements', 'inherits', 'super'], answer: ['extends'] },
        { id: 4, question: 'Which are primitive types in Java?', options: ['int', 'float', 'char', 'boolean'], answer: ['int', 'float', 'char', 'boolean'] },
        { id: 5, question: 'Which access modifiers are valid?', options: ['public', 'private', 'protected', 'default'], answer: ['public', 'private', 'protected', 'default'] },
        { id: 6, question: 'Which statements are valid loop types?', options: ['for', 'while', 'do-while', 'foreach'], answer: ['for', 'while', 'do-while'] },
        { id: 7, question: 'Which is used for exception handling?', options: ['try', 'catch', 'finally', 'throw'], answer: ['try', 'catch', 'finally', 'throw'] },
        { id: 8, question: 'Which are Java OOP principles?', options: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction'], answer: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction'] },
        { id: 9, question: 'Which collections are part of Java?', options: ['ArrayList', 'HashMap', 'HashSet', 'TreeMap'], answer: ['ArrayList', 'HashMap', 'HashSet', 'TreeMap'] },
        { id: 10, question: 'Which packages are part of core Java?', options: ['java.util', 'java.io', 'java.lang', 'java.net'], answer: ['java.util', 'java.io', 'java.lang', 'java.net'] }
    ],
    Python: [
        { id: 1, question: 'Which keyword defines a function in Python?', options: ['def', 'function', 'define', 'lambda'], answer: ['def'] },
        { id: 2, question: 'Which data types are immutable?', options: ['tuple', 'str', 'int', 'frozenset'], answer: ['tuple', 'str', 'int', 'frozenset'] },
        { id: 3, question: 'Which of the following are valid loops?', options: ['for', 'while', 'loop', 'repeat'], answer: ['for', 'while'] },
        { id: 4, question: 'Which are data structures in Python?', options: ['list', 'tuple', 'dict', 'set'], answer: ['list', 'tuple', 'dict', 'set'] },
        { id: 5, question: 'Which are exception keywords?', options: ['try', 'except', 'finally', 'raise'], answer: ['try', 'except', 'finally', 'raise'] },
        { id: 6, question: 'Which methods are string methods?', options: ['upper()', 'lower()', 'split()', 'replace()'], answer: ['upper()', 'lower()', 'split()', 'replace()'] },
        { id: 7, question: 'Which are built-in functions?', options: ['len()', 'sum()', 'range()', 'max()'], answer: ['len()', 'sum()', 'range()', 'max()'] },
        { id: 8, question: 'Which modules handle JSON?', options: ['json', 'pickle', 'marshal', 'csv'], answer: ['json'] },
        { id: 9, question: 'Which functions are used in list comprehensions?', options: ['for', 'if', 'else', 'lambda'], answer: ['for', 'if', 'else', 'lambda'] },
        { id: 10, question: 'Which are Python numeric types?', options: ['int', 'float', 'complex', 'decimal'], answer: ['int', 'float', 'complex'] }
    ],
    C: [
        { id: 1, question: 'Which header is used for standard I/O?', options: ['stdio.h', 'conio.h', 'math.h', 'stdlib.h'], answer: ['stdio.h'] },
        { id: 2, question: 'Which symbol ends a C statement?', options: [';', ':', '.', ','], answer: [';'] },
        { id: 3, question: 'Which are valid data types?', options: ['int', 'float', 'char', 'double'], answer: ['int', 'float', 'char', 'double'] },
        { id: 4, question: 'Which are control structures in C?', options: ['if', 'switch', 'for', 'while'], answer: ['if', 'switch', 'for', 'while'] },
        { id: 5, question: 'Which storage classes exist?', options: ['auto', 'static', 'register', 'extern'], answer: ['auto', 'static', 'register', 'extern'] },
        { id: 6, question: 'Which memory allocation functions exist?', options: ['malloc', 'calloc', 'realloc', 'free'], answer: ['malloc', 'calloc', 'realloc', 'free'] },
        { id: 7, question: 'Which are valid operators?', options: ['+', '-', '*', '/'], answer: ['+', '-', '*', '/'] },
        { id: 8, question: 'Which format specifiers are valid?', options: ['%d', '%f', '%s', '%c'], answer: ['%d', '%f', '%s', '%c'] },
        { id: 9, question: 'Which are logical operators?', options: ['&&', '||', '!'], answer: ['&&', '||', '!'] },
        { id: 10, question: 'Which keywords are valid in C?', options: ['return', 'continue', 'break', 'goto'], answer: ['return', 'continue', 'break', 'goto'] }
    ]
};
const QuestionSection = () => {
    const { skill = 'Unknown Skill' } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [results, setResults] = useState({});
    const [showScore, setShowScore] = useState(false);
    const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds

    useEffect(() => {
        if (skill && sampleQuestions[skill]) {
            setQuestions(sampleQuestions[skill]);
        }
    }, [skill]);

    useEffect(() => {
        if (questions.length > 0 && !showScore) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        calculateResults();
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [questions, showScore]);

    const handleChange = (questionId, option) => {
        setUserAnswers((prev) => {
            const current = prev[questionId] || [];
            if (current.includes(option)) {
                return { ...prev, [questionId]: current.filter((o) => o !== option) };
            } else {
                return { ...prev, [questionId]: [...current, option] };
            }
        });
    };

    const calculateResults = () => {
        const result = {};
        questions.forEach((q) => {
            const selected = userAnswers[q.id] || [];
            const correct = q.answer.sort().join(',') === selected.sort().join(',');
            result[q.id] = correct;
        });
        setResults(result);
        setShowScore(true);

        const prevProgress = JSON.parse(localStorage.getItem('progress')) || [];
        const updatedProgress = prevProgress.filter(entry => entry.skill !== skill);
        updatedProgress.push({
            skill,
            score: Object.values(result).filter(Boolean).length,
            total: questions.length,
            date: new Date().toLocaleString()
        });
        localStorage.setItem('progress', JSON.stringify(updatedProgress));
    };

    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    return (
        <div
            className="question-container"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <div className="question-card">
                <h2 style={{ textAlign: 'center' }}>{skill} Skill Assessment</h2>
                {!showScore && (
                    <div style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '18px', color: '#00ff99' }}>
                        Time Left: {formatTime(timeLeft)}
                    </div>
                )}
                {questions.length === 0 ? (
                    <p>No questions found for this skill.</p>
                ) : (
                    questions.map((q, idx) => (
                        <div key={q.id}>
                            <h4 style={{ fontSize: '20px' }}>Q{idx + 1}: {q.question}</h4>
                            {q.options.map((opt, i) => (
                                <label key={i} style={{ fontSize: '18px', display: 'block' }}>
                                    <input
                                        type="checkbox"
                                        checked={userAnswers[q.id]?.includes(opt) || false}
                                        onChange={() => handleChange(q.id, opt)}
                                        disabled={showScore}
                                    />
                                    {' '}{opt}
                                </label>
                            ))}
                            {showScore && (
                                <div className={`result ${results[q.id] ? 'correct' : 'incorrect'}`}>
                                    {results[q.id] ? 'Correct ✅' : `Wrong ❌ | Correct: ${q.answer.join(', ')}`}
                                </div>
                            )}
                        </div>
                    ))
                )}
                {!showScore && questions.length > 0 && (
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <button onClick={calculateResults}>Submit</button>
                    </div>
                )}
                {showScore && (
                    <div className="score-summary">
                        ✅ Progress Saved!<br />
                        Score: {Object.values(results).filter(Boolean).length} / {questions.length}
                    </div>
                )}
                <div className="back-button">
                    <button onClick={() => navigate(-1)}>← Back to Skill Selection</button>
                </div>
            </div>
        </div>
    );
};

export default QuestionSection;
