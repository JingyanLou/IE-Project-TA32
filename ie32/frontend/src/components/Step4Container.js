import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import './step4container.css';
import ChoroplethMap from './ChoroplethMap';
import ApplianceBarChart from './ApplianceBarChart';

const Step4Container = ({ data }) => {
    const treemapRef = useRef(null);
    const appliances = data['Appliances-list'] || []; // Ensure appliances is an array
    const userInformation = data['User information'] || []; // Ensure userInformation is defined

    useEffect(() => {

        createTreemap();

        const handleResize = () => {
            createTreemap(); // Recreate the treemap on resize
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };

        // Log the user information when the component mounts
        console.log('Received User Information:', userInformation);
        console.log('Received Appliances List:', appliances);
        console.log(data);

        if (appliances.length > 0) {
            createTreemap();
        }
    }, [appliances, userInformation]);

    const createTreemap = () => {
        const containerWidth = treemapRef.current.clientWidth;
        const containerHeight = containerWidth / 2; // Maintain the aspect ratio (2:1)

        const data = {
            name: 'root',
            children: appliances.map(appliance => ({
                name: appliance[0],  // Appliance type
                value: appliance[1] * appliance[2], // Quantity * Daily Hours
            }))
        };

        const root = d3.hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value);

        const treemapLayout = d3.treemap()
            .size([containerWidth, containerHeight]) // Update size based on container width
            .padding(2);

        treemapLayout(root);

        const svg = d3.select(treemapRef.current)
            .attr('width', containerWidth)
            .attr('height', containerHeight);

        svg.selectAll('g').remove();

        const defs = svg.append('defs');
        defs.append('pattern')
            .attr('id', 'image-pattern')
            .attr('patternUnits', 'objectBoundingBox')
            .attr('width', 1)
            .attr('height', 1)
            .append('image')
            .attr('xlink:href', '/images/treemapitem.jpg')
            .attr('width', containerWidth)
            .attr('height', containerHeight)
            .attr('preserveAspectRatio', 'none');

        const nodes = svg
            .selectAll('g')
            .data(root.leaves())
            .enter()
            .append('g')
            .attr('transform', d => `translate(${d.x0},${d.y0})`)
            .attr('class', 'treemap-node');

        nodes
            .append('rect')
            .attr('width', d => d.x1 - d.x0)
            .attr('height', d => d.y1 - d.y0)
            .attr('rx', 10)
            .attr('fill', 'url(#image-pattern)')
            .attr('stroke', 'white')
            .attr('stroke-width', '2');

        nodes
            .append('text')
            .attr('x', 5)
            .attr('y', 20)
            .attr('font-size', '12px')
            .attr('fill', 'white')
            .text(d => d.data.name);
    };





    // Extract user information
    // Extract user information
    const userLocation = userInformation[0];
    const energyProvider = userInformation[1];
    const household = userInformation[2];
    const usageRate = parseFloat(userInformation[3]); // Cost per kWh
    const dailySupplyCharge = parseFloat(userInformation[4]); // Fixed daily charge in AUD
    const monthlyBenchmark = parseFloat(userInformation[5]).toFixed(2); // Benchmark in kWh

    // Print all values in one console log as a paragraph
    console.log(`User Information: 
        The user is located at longitude ${userLocation?.longitude}, latitude ${userLocation?.latitude}. 
        They have selected the energy provider '${energyProvider}', and their household consists of ${household} members. 
        The energy provider charges a usage rate of $${usageRate} per kWh and a fixed daily supply charge of $${dailySupplyCharge}. 
        The estimated monthly benchmark for their household size is ${monthlyBenchmark} kWh.`);

    // Initialize variables for total electricity consumption and days in month
    let totalElectricityConsumptionKWh = 0;
    const daysInMonth = 30;

    // Loop through each appliance to calculate total electricity consumption
    for (let i = 0; i < appliances.length; i++) {
        const appliance = appliances[i];
        const energyConsumptionKWh = parseFloat(appliance[3]); // Energy consumption in kWh
        const quantity = parseFloat(appliance[1]); // Quantity of the appliance
        const dailyUsageHours = parseFloat(appliance[2]); // Daily usage in hours

        // Debugging: Log the values before calculation
        console.log(`Appliance ${i + 1} details: Energy Consumption=${energyConsumptionKWh} kWh, Quantity=${quantity}, Daily Usage=${dailyUsageHours} hours`);

        // Ensure all values are numbers before proceeding
        if (!isNaN(energyConsumptionKWh) && !isNaN(quantity) && !isNaN(dailyUsageHours)) {
            // Calculate the electricity consumption for this appliance over the entire month in kWh
            const applianceMonthlyConsumptionKWh = energyConsumptionKWh * quantity * dailyUsageHours * daysInMonth;

            // Add this appliance's consumption to the total electricity consumption
            totalElectricityConsumptionKWh += applianceMonthlyConsumptionKWh;

            // Log the monthly electricity consumption for this appliance
            console.log(`Appliance ${i + 1}: Energy Consumption=${energyConsumptionKWh} kWh, Quantity=${quantity}, Daily Usage=${dailyUsageHours} hours, Monthly Electricity Consumption=${applianceMonthlyConsumptionKWh.toFixed(2)} kWh`);
        } else {
            console.warn(`Invalid input for Appliance ${i + 1}: Energy Consumption=${energyConsumptionKWh}, Quantity=${quantity}, Daily Usage=${dailyUsageHours}`);
        }
    }

    // Calculate the estimated monthly electricity cost
    const totalElectricityCostAUD = (totalElectricityConsumptionKWh * usageRate).toFixed(2);

    // Calculate the total supply charge cost
    const totalSupplyChargeCostAUD = (dailySupplyCharge * daysInMonth).toFixed(2);

    // Calculate the final estimated monthly bill
    const estimatedMonthlyBillAUD = (parseFloat(totalElectricityCostAUD) + parseFloat(totalSupplyChargeCostAUD)).toFixed(2);

    // Display the final estimated monthly bill
    console.log(`Total Electricity Consumption: ${totalElectricityConsumptionKWh.toFixed(2)} kWh`);
    console.log(`Total Electricity Cost: ${totalElectricityCostAUD} AUD`);
    console.log(`Total Supply Charge Cost: ${totalSupplyChargeCostAUD} AUD`);
    console.log(`Estimated Monthly Bill: ${estimatedMonthlyBillAUD} AUD`);

    // Mock data for the appliance suggestions
    const applianceSuggestions = [
        { brand: 'SAMSUNG', model: 'AC160T', output: '24kwh/hour', eer: '3.54' },
        { brand: 'SAMSUNG', model: 'AC160T', output: '24kwh/hour', eer: '3.54' },
        { brand: 'SAMSUNG', model: 'AC160T', output: '24kwh/hour', eer: '3.54' },
        { brand: 'SAMSUNG', model: 'AC160T', output: '24kwh/hour', eer: '3.54' },
        { brand: 'SAMSUNG', model: 'AC160T', output: '24kwh/hour', eer: '3.54' },
        { brand: 'SAMSUNG', model: 'AC160T', output: '24kwh/hour', eer: '3.54' },
        { brand: 'SAMSUNG', model: 'AC160T', output: '24kwh/hour', eer: '3.54' },

    ];


    return (
        <div className="step4-container">
            <div className="upper-section">
                <div className="left-section">
                    <div className="insight-section">
                        <div className="insight-bill insight">
                            <h3>Your Estimated Monthly Bill</h3>
                            <p className="insight-value">{estimatedMonthlyBillAUD} AUD</p>
                            {/* Tooltip */}
                            <div className="tooltip">
                                <div className="tooltip-title">Estimation Specification</div>
                                <p>
                                    <strong>Electricity Usage</strong>
                                    <span className="tooltip-value">${totalElectricityConsumptionKWh.toFixed(2)} kWh</span>
                                </p>
                                <p>
                                    <strong>Your Provider Rate</strong>
                                    <span className="tooltip-value">${usageRate.toFixed(2)} AUD/kWh</span>
                                </p>
                                <p>
                                    <strong>Total Energy Cost</strong>
                                    <span className="tooltip-value">${totalElectricityCostAUD} AUD</span>
                                </p>
                                <p>
                                    <strong>Total Supply Charge</strong>
                                    <span className="tooltip-value">${totalSupplyChargeCostAUD} AUD</span>
                                </p>
                            </div>
                        </div>
                        <div className="insight-benchmark insight">
                            <h3>Your Estimated Benchmark</h3>
                            <p className="insight-value">{monthlyBenchmark} kWh</p>
                            <div className="tooltip-benchmark">
                                <div className="tooltip-title">Benchmark Specification</div>
                                <p>
                                    <strong>Season:</strong>
                                    <span className="tooltip-value">Winter</span>
                                </p>
                                <p>
                                    <strong>Household Size:</strong>
                                    <span className="tooltip-value">{household}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="treemap-section">
                        <h3>Your Home Appliance Consumption Ranking</h3>
                        <svg ref={treemapRef}></svg>
                    </div>
                </div>
                <div className="map-section">
                    <ChoroplethMap
                        longitude={userLocation?.longitude}
                        latitude={userLocation?.latitude}
                    />
                </div>
            </div>

            <div className="appliances-section">
                <div className="barchart-section">
                    <h3>Energy-efficient appliance suggestions for your selection.</h3>
                    <ApplianceBarChart /> {/* Render the ApplianceBarChart here */}
                </div>

                <div className="suggestion-section">
                    <h3>Energy-efficient appliance suggestions.</h3>
                    <ul className="suggestion-list">
                        {applianceSuggestions.map((item, index) => (
                            <li key={index} className="suggestion-item">
                                <div>
                                    <strong>{item.brand}</strong>
                                    <br />
                                    {item.model}
                                    <br />
                                    Output range: {item.output}
                                    <br />
                                    EER: {item.eer}
                                </div>
                                <button className="buy-now">Buy now <span role="img" aria-label="buy now">🔗</span></button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="appliances-section">
                <div className="barchart-section">
                    <ApplianceBarChart /> {/* Render the ApplianceBarChart here */}
                </div>

                <div className="suggestion-section">
                    <ApplianceBarChart /> {/* Render the ApplianceBarChart here */}
                </div>
            </div>

        </div>
    );




};

Step4Container.propTypes = {
    data: PropTypes.shape({
        'Appliances-list': PropTypes.array.isRequired,
        'User information': PropTypes.array.isRequired
    }).isRequired,
};

export default Step4Container;
