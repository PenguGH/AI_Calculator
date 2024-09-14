import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './App.css'; // Importing css for styling

const App = () => {
    // less secure way
    // const genAI = new GoogleGenerativeAI('YOUR_API_KEY_HERE');

    // more secure way
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_GEMINI_AI_API_KEY);
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUserButtonClick = (value) => {
        setExpression(prev => prev + value);
    }

    // reset calculator's expression and result displays
    const handleClearExpression = () => {
        setExpression('');
        setResult('');
    }

    // async function to send the user expression as a prompt, wait for Google Gemini to calculate the result, and then display the result response back to the user
    const handleCalculateExpression = async () => {
        setLoading(true);
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const prompt = `Calculate the result for: ${expression}`;
            console.log('Sending prompt:', prompt); // check if prompt is correct
            const result = await model.generateContent(prompt);
            console.log('API Response:', result); // check if result object is correct
            const response = await result.response.text(); // Await text() to get the actual response content
            console.log('Response Text:', response); // check to see what the output is

            // Update the State
            setResult(response.trim()); // Update result state with the trimmed answer from Google Gemini
            setExpression(''); // Clear the expression from the display
        } catch (error) {
            console.error('Error:', error);
            setResult('Error: Unable to calculate');
        } finally {
            setLoading(false);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleCalculateExpression();
        }
    }

    return (
        <div className="calculator">
            <div className="display">
                <input
                    type="text"
                    value={expression}
                    onChange={(e) => setExpression(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="expression-input"
                    placeholder="Enter expression"
                    readOnly
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
                      onClick={() => {
                          if (btn === 'C') {
                              handleClearExpression();
                          } else if (btn === '=') {
                              handleCalculateExpression();
                          } else {
                              handleUserButtonClick(btn);
                          }
                      }}
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