import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './seasonalenergychart.css';

const SeasonalEnergyChart = ({ data }) => {
  const [formattedData, setFormattedData] = useState([]);
  const [householdSize, setHouseholdSize] = useState(1);
  const [hoveredBar, setHoveredBar] = useState(null);

  useEffect(() => {
    if (data && data.length > 0) {
      const formatted = data.map(item => ({
        Season: item.Season,
        State: item.State,
        "Household size": parseInt(item["Household size"], 10),
        "Benchmark (kWh)": parseFloat(item["Benchmark (kWh)"])
      }));
      setFormattedData(formatted);
    }
  }, [data]);

  const filteredData = formattedData.filter(item => item['Household size'] === householdSize);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label}`}</p>
          <p className="value">{`Benchmark: ${payload[0].value.toFixed(2)} kWh`}</p>
        </div>
      );
    }
    return null;
  };

  const CustomBar = (props) => {
    const { x, y, width, height, index } = props;
    const isHovered = index === hoveredBar;

    return (
      <g>
        <rect
          x={x + width * 0.3}
          y={y}
          width={width * 0.4}
          height={height}
          rx={10}
          ry={10}
          fill={isHovered ? 'url(#glowGradient)' : 'url(#normalGradient)'}
          fillOpacity={isHovered ? 1 : 0.7}
          onMouseEnter={() => setHoveredBar(index)}
          onMouseLeave={() => setHoveredBar(null)}
        />
      </g>
    );
  };

  return (
    <div className="seasonal-trend-chart custom-chart-container">
      <div className="chart-description">
        <h2 className="chart-title">Seasonal Trends in Energy Usage in Melbourne</h2>
        <p>Understand how household size and season impact your energy costs. Start planning ahead.</p>
      </div>
      <div className="chart-wrapper">
        <div className="chart-controls">
          <label htmlFor="household-size">Household Size</label>
          <select 
            id="household-size" 
            value={householdSize} 
            onChange={(e) => setHouseholdSize(parseInt(e.target.value, 10))}
          >
            {[...new Set(formattedData.map(item => item['Household size']))].map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredData}>
            <defs>
              <linearGradient id="normalGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ae2fdb" />
                <stop offset="100%" stopColor="#7209b7" />
              </linearGradient>
              <linearGradient id="glowGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f0f" />
                <stop offset="50%" stopColor="#ae2fdb" />
                <stop offset="100%" stopColor="#0ff" />
              </linearGradient>
            </defs>
            <XAxis dataKey="Season" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="Benchmark (kWh)" 
              shape={<CustomBar />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SeasonalEnergyChart;