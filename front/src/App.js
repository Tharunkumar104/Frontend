import React, { useEffect, useState } from 'react';

function App() {
    const [apiData, setApiData] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/api/your-endpoint`)
            .then(res => res.json())
            .then(data => {
                console.log("API Data:", data);
                setApiData(data);
            })
            .catch(err => {
                console.error("Error fetching data:", err);
            });
    }, []);

    return (
        <div>
            <h1>Hello from React!</h1>
            <h2>Backend API Response:</h2>
            <pre>{apiData ? JSON.stringify(apiData, null, 2) : "Loading..."}</pre>
        </div>
    );
}

export default App;
