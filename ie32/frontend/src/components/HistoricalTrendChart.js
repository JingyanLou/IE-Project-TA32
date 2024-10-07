import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './historicaltrendchart.css';

const HistoricalTrendChart = ({ data }) => {
  const [visibleData, setVisibleData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      if (currentIndex < data.length) {
        setVisibleData(prevData => [...prevData, data[currentIndex]]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      } else {
        setVisibleData([]);
        setCurrentIndex(0);
      }
    }, 1000); 

    return () => clearInterval(animationInterval);
  }, [currentIndex, data]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={visibleData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="Year" stroke="#fff" />
        <YAxis yAxisId="left" stroke="#fff" />
        <YAxis yAxisId="right" orientation="right" stroke="#fff" />
        <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
        <Legend />
        <Line 
          yAxisId="left" 
          type="monotone" 
          dataKey="Per capita electricity kWh" 
          stroke="#8884d8" 
          strokeWidth={3} // Increased stroke width
          activeDot={{ r: 8 }} 
          name="Electricity Consumption (kWh)"
        />
        <Line 
          yAxisId="right" 
          type="monotone" 
          dataKey="Annual CO2 emissions (per capita - tonnes)" 
          stroke="#82ca9d" 
          strokeWidth={3} // Increased stroke width
          name="CO2 Emissions (tonnes)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HistoricalTrendChart;