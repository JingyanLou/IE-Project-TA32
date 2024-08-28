import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import './step4container.css';
import ChoroplethMap from './ChoroplethMap';

const Step4Container = ({ data }) => {
    const treemapRef = useRef(null);
    const appliances = data['Appliances-list'] || []; // Ensure appliances is an array
    const userInformation = data['User information'] || []; // Ensure userInformation is defined

    useEffect(() => {
        // Log the user information when the component mounts
        console.log('Received User Information:', userInformation);
        console.log('Received Appliances List:', appliances);
        console.log(data);

        if (appliances.length > 0) {
            createTreemap();
        }
    }, [appliances, userInformation]);

    const createTreemap = () => {
        const width = 600;
        const height = 300;

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
            .size([width, height])
            .padding(2);

        treemapLayout(root);

        const svg = d3.select(treemapRef.current)
            .attr('width', width)
            .attr('height', height);

        svg.selectAll('g').remove();

        const defs = svg.append('defs');
        defs.append('pattern')
            .attr('id', 'image-pattern')
            .attr('patternUnits', 'objectBoundingBox')
            .attr('width', 1)
            .attr('height', 1)
            .append('image')
            .attr('xlink:href', '/images/treemapitem.jpg')
            .attr('width', 600)
            .attr('height', 300)
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
    const userLocation = userInformation[0];
    const energyProvider = userInformation[1];
    const household = userInformation[2];
    const usageRate = parseFloat(userInformation[3]); // Cost per kWh
    const dailySupplyCharge = parseFloat(userInformation[4]); // Fixed daily charge in AUD
    const monthlyBenchmark = parseFloat(userInformation[5]); // Benchmark in kWh

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
        const powerKWh = parseFloat(appliance[0]); // Ensure power consumption is in kWh
        const quantity = parseFloat(appliance[1]); // Ensure quantity is a number
        const dailyUsageHours = parseFloat(appliance[2]); // Ensure daily hours of usage is a number

        // Debugging: Log the values before calculation
        console.log(`Appliance ${i + 1} details: Power=${powerKWh} kW, Quantity=${quantity}, Daily Usage=${dailyUsageHours} hours`);

        // Ensure all values are numbers before proceeding
        if (!isNaN(powerKWh) && !isNaN(quantity) && !isNaN(dailyUsageHours)) {
            // Calculate the electricity consumption for this appliance over the entire month in kWh
            const applianceMonthlyConsumptionKWh = powerKWh * quantity * dailyUsageHours * daysInMonth;

            // Add this appliance's consumption to the total electricity consumption
            totalElectricityConsumptionKWh += applianceMonthlyConsumptionKWh;

            // Log the monthly electricity consumption for this appliance
            console.log(`Appliance ${i + 1}: Power=${powerKWh} kW, Quantity=${quantity}, Daily Usage=${dailyUsageHours} hours, Monthly Electricity Consumption=${applianceMonthlyConsumptionKWh.toFixed(2)} kWh`);
        } else {
            console.warn(`Invalid input for Appliance ${i + 1}: Power=${powerKWh}, Quantity=${quantity}, Daily Usage=${dailyUsageHours}`);
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

    return (
        <div className="step4-container">
            <div className="left-section">
                <div className="insight-section">
                    <div className="insight-bill insight">
                        <h3>Your Estimated Monthly Bill</h3>
                        <p className="insight-value">{estimatedMonthlyBillAUD} AUD</p>
                    </div>
                    <div className="insight-benchmark insight">
                        <h3>Your Estimated Benchmark</h3>
                        <p className="insight-value">{monthlyBenchmark} kWh</p>
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
    );
};

Step4Container.propTypes = {
    data: PropTypes.shape({
        'Appliances-list': PropTypes.array.isRequired,
        'User information': PropTypes.array.isRequired
    }).isRequired,
};

export default Step4Container;
