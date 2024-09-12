import React, { useEffect, useRef, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import './step4container.css';
import ChoroplethMap from './ChoroplethMap';
{/* Add this import at the top of your file */ }


const Step4Container = ({ data, appRecommData, appBrandData }) => {
    const treemapRef = useRef(null);
    const appliances = data['Appliances-list'] || [];
    const userInformation = data['User information'] || [];

    const [selectedDevice, setSelectedDevice] = useState('');
    const [selectedAppliance, setSelectedAppliance] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [topBrands, setTopBrands] = useState(5);
    const energyChartRef = useRef(null);

    const uniqueDevices = useMemo(() => {
        const applianceDevices = [...new Set(appliances.map(appliance => appliance[0]))];
        const brandDevices = [...new Set(appBrandData.map(item => item.Device))];
        return applianceDevices.filter(device => brandDevices.includes(device));
    }, [appliances, appBrandData]);

    // Calculate energy consumption for each appliance
    const applianceConsumption = appliances.map(appliance => {
        const [name, quantity, dailyUsageHours, energyConsumptionKWh] = appliance;
        const monthlyConsumption = energyConsumptionKWh * quantity * dailyUsageHours * 30;
        return { name, monthlyConsumption };
    }).sort((a, b) => b.monthlyConsumption - a.monthlyConsumption);

    const maxConsumption = Math.max(...applianceConsumption.map(a => a.monthlyConsumption));

    useEffect(() => {
        if (uniqueDevices.length > 0 && !selectedDevice) {
            setSelectedDevice(uniqueDevices[0]);
        }
    }, [uniqueDevices, selectedDevice]);

    useEffect(() => {
        if (selectedAppliance) {
            updateSuggestions();
        }
    }, [selectedAppliance, topBrands]);

    useEffect(() => {
        if (appliances.length > 0) {
            createTreemap();
        }
    }, [appliances, userInformation]);

    const handleApplianceSelect = (appliance) => {
        setSelectedAppliance(appliance.name);
    };

    const updateSuggestions = () => {
        const filteredSuggestions = appRecommData
            .filter(item => item.Device === selectedAppliance)
            .sort((a, b) => b.Star_Rating - a.Star_Rating)
            .slice(0, topBrands);

        setSuggestions(filteredSuggestions);
    };

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



        if (appliances.length > 0) {
            createTreemap();
        }
    }, [appliances, userInformation]);


    const createTreemap = () => {
        const containerWidth = treemapRef.current.clientWidth;
        const containerHeight = containerWidth / 2; // Maintain the aspect ratio (2:1)

        // Calculate the total consumption across all appliances
        let totalConsumption = appliances.reduce((total, appliance) => {
            return total + (appliance[1] * appliance[2] * appliance[3]);
        }, 0);

        const data = {
            name: 'root',
            children: appliances.map(appliance => {
                // Calculate each appliance's total consumption
                const applianceConsumption = appliance[1] * appliance[2] * appliance[3];

                return {
                    name: appliance[0],  // Appliance type
                    value: applianceConsumption, // Use actual consumption as the value
                    details: {
                        consumption: `${appliance[1] * appliance[2]} kWh`,
                        consumptionPerHour: `${appliance[3]} kWh`,
                        quantity: `${appliance[1]}`,
                        percentage: `${((applianceConsumption / totalConsumption) * 100).toFixed(2)}%`,
                        dailyHours: `${appliance[2]} hours`, // Added daily hours metric
                        totalConsumption: `${applianceConsumption.toFixed(2)} kWh` // Total consumption metric
                    }
                };
            })
        };

        const root = d3.hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value);

        const treemapLayout = d3.treemap()
            .size([containerWidth, containerHeight])
            .padding(3);

        treemapLayout(root);

        const svg = d3.select(treemapRef.current)
            .attr('width', containerWidth)
            .attr('height', containerHeight);

        // Remove old nodes and tooltips
        svg.selectAll('g').remove();
        d3.select('body').selectAll('.treemap-tooltip').remove();

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

        // Create tooltip inside the SVG to ensure it's contained within the component
        const tooltip = d3.select(treemapRef.current.parentNode).append('div')
            .attr('class', 'treemap-tooltip')
            .style('opacity', 0)
            .style('position', 'absolute')
            .style('pointer-events', 'none')
            .style('z-index', 1000)
            .style('overflow', 'hidden');

        const nodes = svg
            .selectAll('g')
            .data(root.leaves())
            .enter()
            .append('g')
            .attr('transform', d => `translate(${d.x0},${d.y0})`)
            .attr('class', 'treemap-node')
            .on('mouseover', function (event, d) {
                tooltip.transition()
                    .duration(200)
                    .style('opacity', 1);
                tooltip.html(`
                    <div class="tooltip-title">Appliance Detail</div>
                    <p><strong>Appliance name</strong> ${d.data.name}</p>
                    <p><strong>Daily Usage</strong> ${d.data.details.dailyHours}</p>
                    <p><strong>Consumption per Hour</strong> ${d.data.details.consumptionPerHour}</p>
                    <p><strong>Total Consumption</strong> ${d.data.details.totalConsumption}</p>
                    <p><strong>Quantity</strong> ${d.data.details.quantity}</p>
                    <p><strong>Percentage</strong> ${d.data.details.percentage}</p>
                `);
            })
            .on('mousemove', function (event) {
                const [tooltipWidth, tooltipHeight] = [tooltip.node().offsetWidth, tooltip.node().offsetHeight];
                const [pageX, pageY] = [event.pageX, event.pageY];

                tooltip
                    .style('left', `${Math.min(pageX + 10, window.innerWidth - tooltipWidth - 10)}px`)
                    .style('top', `${Math.min(pageY + 10, window.innerHeight - tooltipHeight - 10)}px`);
            })
            .on('mouseout', function () {
                tooltip.transition()
                    .duration(200)
                    .style('opacity', 0);
            });

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
            .html(d => {
                return `${d.data.name}<tspan x="5" dy="1.2em">${d.data.details.percentage}</tspan>`;
            });
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
                <h2 className="appliances-title">Your home appliance consumption ranking</h2>
                <div className="appliances-container">
                    <div className="chart-section-step4">
                        <div className="energy-chart-step4" ref={energyChartRef}>
                            {applianceConsumption.map((appliance, index) => {
                                const heightPercentage = (appliance.monthlyConsumption / maxConsumption) * 100;
                                return (
                                    <div
                                        key={index}
                                        className={`chart-bar-step4 ${selectedAppliance === appliance.name ? 'selected' : ''}`}
                                        style={{ height: `${heightPercentage}%` }}
                                        onClick={() => handleApplianceSelect(appliance)}
                                    >
                                        <span className="appliance-name">{appliance.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="suggestion-section">
                        <div className="filters">
                            <label htmlFor="topBrands">Top Brands:</label>
                            <select
                                id="topBrands"
                                value={topBrands}
                                onChange={(e) => setTopBrands(Number(e.target.value))}
                            >
                                <option value={5}>Top 5</option>
                                <option value={10}>Top 10</option>
                            </select>
                        </div>
                        <h3 className="suggestion-title">Energy-efficient appliance suggestions for your selection</h3>
                        <div className="suggestion-list-container">
                            {suggestions.length > 0 ? (
                                <ul className="suggestion-list">
                                    {suggestions.map((item, index) => (
                                        <li key={index} className="suggestion-item">
                                            <span className="suggestion-model">{item.Model_No}</span>
                                            <span className="suggestion-rating">{item.Star_Rating} Stars</span>
                                            <span className="suggestion-consumption">{item.Energy_Consumption_kWh_per_hour.toFixed(2)} kWh/hour</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="no-suggestions">Select an appliance from the chart to see top picks.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>



            <div className="explore-more-section">
                <div className="explore-more-card">
                    <div className="explore-more-image-container">
                        <img src="/images/exploremore.jpg" alt="Explore More" className="explore-more-image" />
                        <div className="explore-more-image-text">
                            Explore more on<br />Energy Saving
                        </div>
                    </div>
                    <div className="explore-more-info">
                        <h2 className="explore-more-title">Explore more on Energy Saving Tips..</h2>
                        <p className="explore-more-description">
                            Our website also offers comprehensive energy-saving tips to help you seamlessly integrate energy efficiency into your daily routine. Whether it's adjusting your home appliances, optimizing your energy usage, or adopting sustainable practices, we've got you covered with practical advice that makes saving energy simple and effective.
                        </p>
                        <button className="explore-more-button">Learn More</button>
                    </div>
                </div>
            </div>


            <div className="black-box-section">
                {/* Any content you'd like to add inside the black box */}
            </div>





        </div>
    );




};

Step4Container.propTypes = {
    data: PropTypes.shape({
        'Appliances-list': PropTypes.array.isRequired,
        'User information': PropTypes.array.isRequired
    }).isRequired,
    appRecommData: PropTypes.array.isRequired,
};

export default Step4Container;