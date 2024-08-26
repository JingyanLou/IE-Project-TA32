import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import './step4container.css';
import ChoroplethMap from './ChoroplethMap';

const Step4Container = ({ appliances, userInformation }) => {
    const treemapRef = useRef(null);

    const createTreemap = () => {
        const width = 600;
        const height = 300;

        const data = {
            name: 'root',
            children: appliances.map(appliance => ({
                name: appliance.applianceType,
                value: appliance.dailyHours * appliance.energyConsumption * appliance.quantity,
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

    useEffect(() => {
        if (appliances.length > 0) {
            createTreemap();
        }
    }, [appliances]);  // Remove `createTreemap` from dependencies, define it inside the component

    const totalConsumption = appliances.reduce((total, appliance) => {
        return total + appliance.dailyHours * appliance.energyConsumption * appliance.quantity;
    }, 0);

    const estimatedMonthlyBill = (totalConsumption * 30).toFixed(2);

    const benchmark = 38;

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
                <ChoroplethMap />
            </div>
        </div>
    );
};

Step4Container.propTypes = {
    appliances: PropTypes.array.isRequired,
    userInformation: PropTypes.object.isRequired,
};

export default Step4Container;