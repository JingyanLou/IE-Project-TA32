import React, { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../utils/api'; // Import the base URL function
import './insightpage.css';
import HistoricalTrendChart from '../components/HistoricalTrendChart';
import SeasonalEnergyChart from '../components/SeasonalEnergyChart';
import CarbonFootprintCalculator from '../components/CarbonFootprintCalculator';
import FuturePredictionChart from '../components/FuturePredictionChart';

const Insight = () => {
    const apiUrl = getApiBaseUrl();
    const [historicalTrendData, setHistoricalTrendData] = useState([]);
    const [householdConsumptionData, setHouseholdConsumptionData] = useState([]);
    const [priceDemandData, setPriceDemandData] = useState([]);
    const [forecastResultsData, setForecastResultsData] = useState([]);

    useEffect(() => {
        // Fetch historical trend data
        fetch(`${apiUrl}/historical-trend`)
            .then(response => response.json())
            .then(data => {
                console.log('Raw Historical Trend Data:', data);
                // Ensure the data is in the correct format
                const formattedData = data.map(item => ({
                    Year: item.Year,
                    "Per capita electricity kWh": parseFloat(item["Per capita electricity - kWh"]),
                    "Annual CO2 emissions (per capita - tonnes)": parseFloat(item["Annual CO₂ emissions (per capita - tonnes)"])
                }));
                console.log('Formatted Historical Trend Data:', formattedData);
                setHistoricalTrendData(formattedData);
            })
            .catch(error => console.error('Error fetching historical trend data:', error));

        // Fetch household consumption data
        fetch(`${apiUrl}/household-consumption`)
            .then(response => response.json())
            .then(data => {
                console.log('Raw Household Consumption Data:', data);
                setHouseholdConsumptionData(data);
            })
            .catch(error => console.error('Error fetching household consumption data:', error));

            // Fetch price demand data
        fetch(`${apiUrl}/price-demand`)
        .then(response => response.json())
        .then(data => {
            console.log('Raw Price Demand Data:', data);
            // Ensure the data is in the correct format
            const formattedData = data.map(item => ({
                Date: item.date,
                RRP: parseFloat(item.RRP),
                Type: item.Type
            }));
            console.log('Formatted Price Demand Data:', formattedData);
            setPriceDemandData(formattedData);
        })
        .catch(error => console.error('Error fetching price demand data:', error));

        // Fetch forecast results data
        fetch(`${apiUrl}/forecast-results`)
            .then(response => response.json())
            .then(data => {
                console.log('Raw Forecast Results Data:', data);
                // Ensure the data is in the correct format
                const formattedData = data.map(item => ({
                    Date: item.date,
                    PredictedElectricity: parseFloat(item.predicted_electricity),
                    PredictedCO2: parseFloat(item.predicted_co2),
                    Energy10PctReduction: parseFloat(item.energy_10pct_reduction),
                    CO210PctReduction: parseFloat(item.co2_10pct_reduction),
                    Energy15PctReduction: parseFloat(item.energy_15pct_reduction),
                    CO215PctReduction: parseFloat(item.co2_15pct_reduction),
                    Energy20PctReduction: parseFloat(item.energy_20pct_reduction),
                    CO220PctReduction: parseFloat(item.co2_20pct_reduction)
                }));
                console.log('Formatted Forecast Results Data:', formattedData);
                setForecastResultsData(formattedData);
            })
            .catch(error => console.error('Error fetching forecast results data:', error));

    }, [apiUrl]);

    return (
      <div className="insight-container">
      <div className="insight-header">
        <div className="header-text">
          <h1 className="insight-title">
            Explore Electricity<br />
            Trends and<br />
            Insights
          </h1>
          <p className="insight-subtitle">
            From past, seasonal, future perspective
          </p>
        </div>
        <div className="header-image">
          <img src="/images/sample_insights.png" alt="Electricity Insights" />
        </div>
      </div>
      <div className="content-wrapper">
        <div className="chart-description">
          <h2 className="chart-title">Historical Electricity Consumption</h2>
          <ul>
            <li>Energy consumption has increased over the past years.</li>
            <li>The increase in emission has also resulted in the increase of carbon footprint</li>
          </ul>
        </div>
        <div className="chart-wrapper">
          {historicalTrendData.length > 0 ? (
            <HistoricalTrendChart data={historicalTrendData} />
          ) : (
            <p>Loading chart data...</p>
          )}
        </div>
      </div>
      <div className="content-wrapper">
            {householdConsumptionData.length > 0 ? (
                <SeasonalEnergyChart data={householdConsumptionData} />
            ) : (
                <p>Loading seasonal trend data...</p>
            )}
        </div>
      <div className="content-wrapper">
            <FuturePredictionChart priceData={priceDemandData} emissionData={forecastResultsData} />
        </div>
      <div className="content-wrapper">
            <CarbonFootprintCalculator />
        </div>
    </div>
    
  );
};

    

export default Insight;