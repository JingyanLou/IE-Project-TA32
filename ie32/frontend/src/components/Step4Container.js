import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import './step4container.css';

const Step4Container = ({ appliances, userInformation }) => {
    const treemapRef = useRef(null);

    useEffect(() => {
        if (appliances.length > 0) {
            createTreemap();
        }
    }, [appliances]);

    const createTreemap = () => {
        const width = 600;
        const height = 300;

        const root = d3.hierarchy({ children: appliances })
            .sum(d => d.dailyHours * d.energyConsumption * d.quantity)
            .sort((a, b) => b.value - a.value);

        const treemapLayout = d3.treemap()
            .size([width, height])
            .padding(2);

        treemapLayout(root);

        const svg = d3.select(treemapRef.current)
            .attr('width', width)
            .attr('height', height);

        svg.selectAll('g').remove(); // Clear previous treemap if any

        const nodes = svg
            .selectAll('g')
            .data(root.leaves())
            .enter()
            .append('g')
            .attr('transform', d => `translate(${d.x0},${d.y0})`);

        nodes
            .append('rect')
            .attr('width', d => d.x1 - d.x0)
            .attr('height', d => d.y1 - d.y0)
            .attr('fill', d => d3.interpolateBlues(d.value / root.value));

        nodes
            .append('text')
            .attr('x', 3)
            .attr('y', 15)
            .text(d => d.data.applianceType)
            .attr('font-size', '12px')
            .attr('fill', 'white');
    };

    // Calculate the estimated monthly bill based on appliances data
    const totalConsumption = appliances.reduce((total, appliance) => {
        return total + appliance.dailyHours * appliance.energyConsumption * appliance.quantity;
    }, 0);

    const estimatedMonthlyBill = (totalConsumption * 30).toFixed(2); // Example calculation

    // Define a fixed benchmark for now
    const benchmark = 38; // kWh

    return (
        <div className="step4-container">
            <div className="left-section">
                <div className="insight-section">
                    <div className="insight-bill insight">
                        <h3>Your Estimated Monthly Bill</h3>
                        <p className="insight-value">{estimatedMonthlyBill} AUD</p>
                    </div>
                    <div className="insight-benchmark insight">
                        <h3>Your Estimated Benchmark</h3>
                        <p className="insight-value">{benchmark} kWh</p>
                    </div>
                </div>
                <div className="treemap-section">
                    <h3>Your Home Appliance Consumption Ranking</h3>
                    <svg ref={treemapRef}></svg>
                </div>
            </div>
            <div className="map-section">
                <div className="map-placeholder">Map Placeholder</div>
            </div>
        </div>
    );
};

Step4Container.propTypes = {
    appliances: PropTypes.array.isRequired,
    userInformation: PropTypes.object.isRequired,
};

export default Step4Container;
