import React, { useState, useEffect } from 'react';
import axios from './../service/api'; // Adjust path as necessary
import './Evalute.css'; // Import the CSS file for styling
import { ToastContainer, toast } from 'react-toastify'; // Import toast library
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

function EvaluateRule() {
  const [rules, setRules] = useState([]); // State for storing fetched rules
  const [selectedRule, setSelectedRule] = useState(''); // State for selected rule AST
  const [userData, setUserData] = useState(''); // State for user data input
  const [response, setResponse] = useState(''); // State for storing evaluation response

  // Fetch rules from API on component mount
  useEffect(() => {
    const fetchRules = async () => {
      try {
        const res = await axios.get('/rules/rules'); // API call to get rules
        setRules(res.data); // Store fetched rules in state
      } catch (error) {
        console.error('Error fetching rules:', error); // Log errors
      }
    };
    fetchRules(); // Call the function to fetch rules
  }, []);

  // Function to evaluate the selected rule against user data
  const evaluateRule = async () => {
    try {
      const parsedAST = JSON.parse(selectedRule); // Parse the selected rule AST
      const parsedData = JSON.parse(userData); // Parse user data
      const res = await axios.post('/rules/evaluate', { rule_ast: parsedAST, data: parsedData });
      setResponse(`Result: ${res.data.eligible ? 'Eligible' : 'Not Eligible'}`); // Set response message
      toast.success(`Evaluation Complete: ${res.data.eligible ? 'Eligible' : 'Not Eligible'}`); // Show success toast
    } catch (error) {
      setResponse(`Error: ${error.message}`); // Handle errors
      toast.error(`Error: ${error.message}`); // Show error toast
    }
  };

  return (
    <div className="evaluate-rule-container">
      <h2>Evaluate Rule</h2>
      {/* Dropdown to select a rule */}
      <select 
        onChange={(e) => setSelectedRule(e.target.value)} 
        value={selectedRule} 
        className="rule-dropdown"
      >
        <option value="">Select a rule</option>
        {rules.map(rule => (
          <option key={rule._id} value={JSON.stringify(rule.ast)}>
            {rule.name || rule._id} {/* Display rule name or ID */}
          </option>
        ))}
      </select>

      {/* Display selected rule details */}
      {selectedRule && (
        <div className="selected-rule">
          <h3>Selected Rule:</h3>
          <pre>{JSON.stringify(JSON.parse(selectedRule), null, 2)}</pre>
        </div>
      )}

      {/* Text area for user data input */}
      <textarea
        value={userData}
        onChange={(e) => setUserData(e.target.value)} // Update state as user types
        placeholder="Enter user data JSON (e.g., { age: 35, salary: 60000 })"
        rows={4}
        className="user-data-input"
      />

      {/* Button to evaluate the rule */}
      <button 
        onClick={evaluateRule} 
        disabled={!selectedRule || !userData} 
        className="evaluate-button"
      >
        <i className="fas fa-check-circle"></i> Evaluate
      </button>

      {/* Display evaluation result */}
      <p className={`response-message ${response.includes('Error') ? 'error' : 'success'}`}>
        {response}
      </p>

      <ToastContainer /> {/* Toast container for notifications */}
    </div>
  );
}

export default EvaluateRule;
