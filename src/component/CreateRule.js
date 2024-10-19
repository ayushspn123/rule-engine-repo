import React, { useState } from 'react';
import api from '../service/api';

function CreateRule() {
  const [ruleString, setRuleString] = useState('');
  const [response, setResponse] = useState(null); // Changed to null to handle the absence of a response
  const [loading, setLoading] = useState(false);

  const createRule = async () => {
    if (!ruleString) {
      setResponse({ error: 'Error: Rule string cannot be empty' });
      return;
    }

    setLoading(true);
    setResponse(null); // Clear previous response

    try {
      const res = await api.post('/rules/create', { rule_string: ruleString });
      setResponse(res.data); // Store the entire response data
      setRuleString(''); // Reset input field
    } catch (error) {
      setResponse({ error: error.response?.data?.message || error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Create Rule</h2>
      <input
        type="text"
        value={ruleString}
        onChange={(e) => setRuleString(e.target.value)}
        placeholder="Enter rule (e.g., age > 30 AND salary > 50000)"
      />
      <button onClick={createRule} disabled={loading}>
        {loading ? 'Creating...' : 'Create Rule'}
      </button>
      {response && <RuleDisplay response={response} />}
    </div>
  );
}

// New RuleDisplay Component
function RuleDisplay({ response }) {
  if (response.error) {
    return <p>{response.error}</p>; // Display error message if it exists
  }

  return (
    <div className="rule-display">
      <h3>Rule Created Successfully!</h3>
      <p><strong>Name:</strong> {response.name}</p>
      <p><strong>AST:</strong></p>
      <pre>{JSON.stringify(response.ast, null, 2)}</pre> {/* Format AST nicely */}
      <p><strong>ID:</strong> {response._id}</p>
      <p><strong>Created At:</strong> {new Date(response.createdAt).toLocaleString()}</p>
    </div>
  );
}

export default CreateRule;
