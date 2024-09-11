import React, { useState, useEffect, useRef, onBarClick } from 'react';
import './appliancebarchart.css';


const ApplianceBarChart = ({ data, topBrands, onBarClick }) => {
    const [tooltip, setTooltip] = useState({ show: false, content: {}, x: 0, y: 0 });
    const [maxConsumption, setMaxConsumption] = useState(0);
    const chartRef = useRef(null);

    // Remove duplicates and sort data by ranking
    const uniqueData = Array.from(new Set(data.map(item => item.Brand)))
        .map(brand => {
            return data.find(item => item.Brand === brand);
        });

    const handleBarClick = (brand) => {
        console.log('Bar clicked for brand:', brand);
        onBarClick(brand);
    };

    const sortedData = uniqueData
        .sort((a, b) => a.Ranking - b.Ranking)
        .slice(0, topBrands);

    useEffect(() => {
        if (sortedData.length > 0) {
            const max = Math.max(...sortedData.map(item => item.Average_Energy_Consumption));
            setMaxConsumption(max);
        }
    }, [sortedData]);

    const handleMouseOver = (event, item) => {
        const barRect = event.target.getBoundingClientRect();
        const x = barRect.left + barRect.width / 2;
        const y = barRect.bottom + window.scrollY;

        setTooltip({
            show: true,
            content: {
                brand: item.Brand,
                avg: item.Average_Energy_Consumption.toFixed(2),
                low: item.Lowest_Energy_Consumption.toFixed(2),
                high: item.Highest_Energy_Consumption.toFixed(2),
            },
            x,
            y,
        });
    };
    
    const handleMouseOut = () => {
        setTooltip({ show: false, content: {}, x: 0, y: 0 });
    };

    return (
        <div className="barchart-container" ref={chartRef}>
            <div className="barchart">
                {sortedData.map((item, index) => (
                    <div key={index} className="barchart-item">
                        <div
                            className="barchart-bar"
                            style={{ 
                                height: `${(item.Average_Energy_Consumption / maxConsumption) * 200}px`,
                                minHeight: '1px'
                            }}
                            onMouseOver={(e) => handleMouseOver(e, item)}
                            onMouseOut={handleMouseOut}
                            onClick={() => onBarClick(item.Brand)}
                        ></div>
                        <div className="barchart-label" title={item.Brand}>{item.Brand}</div>
                    </div>
                ))}
            </div>
            {tooltip.show && (
                <div
                    className="barchart-tooltip"
                    style={{
                        position: 'fixed',
                        left: `${tooltip.x}px`,
                        top: `${tooltip.y}px`,
                        transform: 'translate(-50%, 10px)',
                    }}
                >
                    <p><strong>Brand:</strong> {tooltip.content.brand}</p>
                    <p><strong>Average:</strong> {tooltip.content.avg} Wh</p>
                    <p><strong>Lowest:</strong> {tooltip.content.low} Wh</p>
                    <p><strong>Highest:</strong> {tooltip.content.high} Wh</p>
                </div>
            )}
        </div>
    );
};

export default ApplianceBarChart;