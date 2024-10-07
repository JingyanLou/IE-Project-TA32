import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const FuturePredictionChart = ({ priceData, emissionData }) => {
  const [selectedPrediction, setSelectedPrediction] = useState('emission');
  const [reductionPercentage, setReductionPercentage] = useState(0);

  const formatXAxis = (tickItem) => {
    return new Date(tickItem).getFullYear();
  };

  // Function to remove duplicate years
  const removeDuplicateYears = (data) => {
    const uniqueYears = new Set();
    return data.filter(item => {
      const year = new Date(item.Date).getFullYear();
      if (!uniqueYears.has(year)) {
        uniqueYears.add(year);
        return true;
      }
      return false;
    });
  };

  const formatYAxis = (value) => {
    if (selectedPrediction === 'price') {
      return `$${value.toFixed(2)}`;
    } else {
      return `${value.toFixed(2)} kWh`;
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p>{`Year: ${formatXAxis(label)}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value.toFixed(2)} ${entry.name.includes('CO2') ? 'kg' : (selectedPrediction === 'price' ? '$' : 'kWh')}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const chartData = selectedPrediction === 'price' ? priceData : emissionData;
    const uniqueData = removeDuplicateYears(chartData);

    return (
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={uniqueData}>
          <XAxis 
            dataKey="Date" 
            tickFormatter={formatXAxis} 
            stroke="#666"
            type="category"
            domain={['dataMin', 'dataMax']}
          />
          <YAxis 
            yAxisId="left" 
            stroke="#666" 
            tickFormatter={formatYAxis}
          />
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            stroke="#666" 
            tickFormatter={(value) => `${value.toFixed(2)} kg`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area 
            yAxisId="left" 
            type="monotone" 
            dataKey={selectedPrediction === 'price' ? 'RRP' : 
              (reductionPercentage === 0 ? 'PredictedElectricity' : `Energy${reductionPercentage}PctReduction`)} 
            name={selectedPrediction === 'price' ? 'Price' : 'Energy Consumption'}
            stroke={selectedPrediction === 'price' ? '#a865b5' : '#7b679a'}
            fill={selectedPrediction === 'price' ? '#a865b5' : '#7b679a'}
            fillOpacity={0.6} 
          />
          {selectedPrediction === 'emission' && (
            <Area 
              yAxisId="right" 
              type="monotone" 
              dataKey={reductionPercentage === 0 ? 'PredictedCO2' : `CO2${reductionPercentage}PctReduction`} 
              name="CO2 Emissions"
              stroke="#a865b5" 
              fill="#a865b5" 
              fillOpacity={0.6} 
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="future-prediction-chart">
      <h2>Future Predictions on Energy Price and Consumption</h2>
      <p className="chart-description">
        Visualize your predicted energy consumption (in kWh) and CO2 emissions (in kg) over the coming years, and see how small changes in usage can significantly reduce your carbon footprint.
      </p>
      <div className="chart-controls">
        <select value={selectedPrediction} onChange={(e) => setSelectedPrediction(e.target.value)}>
          <option value="price">Price Prediction</option>
          <option value="emission">Emission Prediction</option>
        </select>
        {selectedPrediction === 'emission' && (
          <select value={reductionPercentage} onChange={(e) => setReductionPercentage(parseInt(e.target.value))}>
            <option value="0">No Reduction</option>
            <option value="10">10% Reduction</option>
            <option value="15">15% Reduction</option>
            <option value="20">20% Reduction</option>
          </select>
        )}
      </div>
      {renderChart()}
    </div>
  );
};

export default FuturePredictionChart;