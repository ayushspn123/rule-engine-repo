import React, { useState, useEffect } from 'react';
import api from '../service/api';
import './CombineRule.css'; // Import the updated CSS

function CombineRules() {
  const [rules, setRules] = useState([]);
  const [selectedRuleIds, setSelectedRuleIds] = useState([]);
  const [response, setResponse] = useState('');

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const res = await api.get('/rules/rules');
        setRules(res.data);
      } catch (error) {
        console.error('Error fetching rules:', error);
      }
    };
    fetchRules();
  }, []);

  const handleCheckboxChange = (ruleId) => {
    if (selectedRuleIds.includes(ruleId)) {
      setSelectedRuleIds(selectedRuleIds.filter(id => id !== ruleId));
    } else {
      setSelectedRuleIds([...selectedRuleIds, ruleId]);
    }
  };

  const combineRules = async () => {
    try {
      const res = await api.post('/rules/combine', { rule_ids: selectedRuleIds });
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  };

  const renderRule = (rule) => {
    // console.log(rule.lr);
    const { left, right, value } = rule.ast;
    return (
      <div className="rule-item" key={rule._id}>
        <input
          type="checkbox"
          id={rule._id}
          checked={selectedRuleIds.includes(rule._id)}
          onChange={() => handleCheckboxChange(rule._id)}
          className="rule-checkbox"
        />
        <div className="rule-content">
          <span className="rule-operand">{left?.value}</span>
          <span className="rule-operator">{value}</span>
          <span className="rule-operand">{right?.value}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="combine-rules-container">
      <h2>Combine Rules</h2>
      <div className="rules-list">
        {rules.map(rule => renderRule(rule))}
      </div>
      <button className="combine-button" onClick={combineRules} disabled={selectedRuleIds.length === 0}>
        Combine Selected Rules
      </button>
      <div className="response-message">
        {response && (
          <pre className="response-output">{response}</pre>
        )}
      </div>
    </div>
  );
}

export default CombineRules;
