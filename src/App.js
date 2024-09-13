import React, { useState } from 'react';
import './App.css'; // Importing css for styling

const App = () => {
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState('');


    return (
        <div className="calculator">
            <div className="display">
                <input
                    type="text"
                    value={expression}
                    onChange={(e) => setExpression(e.target.value)}
                    className="expression-input"
                    placeholder="Enter expression"
                />
            </div>
            <div className="buttons">
                {['7', '8', '9', '/',
                  '4', '5', '6', '*',
                  '1', '2', '3', '-',
                  '0', '^', 'log', '+',
                  'e^', 'log10', '(', ')', 
                  'sin', 'cos', 'tan', 'sec',
                  'C', 'cot', 'csc', '='].map((btn) => (
                    <button
                      key={btn}
                      
                    >
                      {btn}
                    </button>
                ))}
            </div>
            <div className="result-display">
                {loading ? <p>Loading ...</p> : <p>Result: {result}</p>}
            </div>
        </div>
    );
};

export default App;