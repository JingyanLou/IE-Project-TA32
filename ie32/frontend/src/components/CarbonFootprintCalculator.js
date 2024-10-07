import React, { useState } from 'react';
import './carbonfootprintcalculator.css'

const CarbonFootprintCalculator = () => {
  const [monthlyConsumption, setMonthlyConsumption] = useState('500');
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Only allow positive integers
    if (value === '' || /^[1-9]\d*$/.test(value)) {
      setMonthlyConsumption(value);
    }
  };

  const calculateEmissions = () => {
    if (monthlyConsumption === '') {
      alert('Please enter a valid monthly consumption value.');
      return;
    }
    const emissionFactor = 1.17;
    const emissions = (parseInt(monthlyConsumption) * emissionFactor) / 1000; // Convert to tonnes
    setResult(emissions.toFixed(3));
  };

  return (
    <div className="carbon-calculator">
      <div className="calculator-content">
        <div className="calculator-left">
          <h2 className="calculator-title">Be aware of your carbon footprint</h2>
          <p className="calculator-description">
            Understand how household<br />
            size and season impact<br />
            your energy costs.
          </p>
          <div className="input-group">
            <div>
              <label htmlFor="monthlyConsumption" className="input-label">
                Monthly Consumption (kWh)
              </label>
              <div className="input-button-wrapper">
                <input
                  id="monthlyConsumption"
                  type="text"
                  inputMode="numeric"
                  pattern="[1-9][0-9]*"
                  placeholder="500"
                  value={monthlyConsumption}
                  onChange={handleInputChange}
                  className="input-field"
                />
                <button onClick={calculateEmissions} className="calculate-button">
                  Calculate
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="calculator-right">
          <img
            src="/images/sample_co2.png"
            alt="Carbon footprint"
            className="carbon-image"
          />
          {result !== null && (
            <div className="result-display">
              <p className="result-text">As per your monthly consumption, your emission is:</p>
              <p className="result-value">{result} <span className="result-unit">tonnes of CO2</span></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarbonFootprintCalculator;