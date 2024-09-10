import React, { useState, useRef, useEffect } from 'react';
import './buynew.css';
import { getApiBaseUrl } from '../utils/api';

const BuyNew = () => {
    const [selectedAppliance, setSelectedAppliance] = useState('air_conditioner');
    const [selectedApplianceImage, setSelectedApplianceImage] = useState('/images/aircondition.png');
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [isChanging, setIsChanging] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);

    const [error, setError] = useState(null);


    const appliances = [
        { name: 'air conditioner', image: 'aircondition.png', displayName: 'Air Conditioner' },
        { name: 'dryer', image: 'clothdryer.png', displayName: 'Clothes Dryer' },
        { name: 'dishwasher', image: 'dishwasher.png', displayName: 'Dishwasher' },
        { name: 'electric_light', image: 'electriclight.png', displayName: 'Electric Light' },
        { name: 'florescent_lamp', image: 'florescentlamp.png', displayName: 'Florescent Lamp' },
        { name: 'heater', image: 'heater.png', displayName: 'Heater' },
        { name: 'lamp', image: 'lamp.png', displayName: 'Lamp' }
    ];

    const applianceCardsRef = useRef(null);
    const brandComparisonRef = useRef(null);
    const modelSuggestionRef = useRef(null);
    const energyChartRef = useRef(null);

    useEffect(() => {
        if (selectedBrand && energyChartRef.current) {
            const selectedBar = energyChartRef.current.querySelector('.selected');
            if (selectedBar) {
                selectedBar.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }, [selectedBrand]);

    // Add this function to sort brands
    const sortedBrands = [...brands].sort((a, b) => a.consumption - b.consumption);


    useEffect(() => {
        const animateOnScroll = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(animateOnScroll, {
            threshold: 0.1,
        });

        const applianceCards = document.querySelectorAll('.appliance-card');
        applianceCards.forEach((card, index) => {
            setTimeout(() => {
                observer.observe(card);
            }, index * 100);
        });

        if (brandComparisonRef.current) {
            observer.observe(brandComparisonRef.current);
        }

        if (modelSuggestionRef.current) {
            observer.observe(modelSuggestionRef.current);
        }

        const modelItems = document.querySelectorAll('.model-item');
        modelItems.forEach((item, index) => {
            setTimeout(() => {
                observer.observe(item);
            }, index * 100);
        });

        const timer = setTimeout(() => setInitialLoad(false), 1000);
        return () => clearTimeout(timer);
    }, []);


    useEffect(() => {
        const fetchBrands = async () => {
            try {
                setError(null);
                const apiUrl = getApiBaseUrl();
                //const encodedAppliance = encodeURIComponent(selectedAppliance.toLowerCase().replace(' ', '_'));
                const url = `${apiUrl}/brand-data?appliance=${selectedAppliance}`;
                console.log(`Fetching brand data from: ${url}`);
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Received brand data:', data);
                setBrands(data);
            } catch (error) {
                console.error('Error fetching brand data:', error);
                setError(`Failed to fetch brand data: ${error.message}`);
            }
        };

        fetchBrands();
        setSelectedBrand(null);
    }, [selectedAppliance]);
    useEffect(() => {
        const fetchModels = async () => {
            if (selectedBrand) {
                try {
                    setError(null);
                    const apiUrl = getApiBaseUrl();
                    console.log(`Fetching model data from: ${apiUrl}/model-data?appliance=${selectedAppliance}&brand=${selectedBrand.Brand}`);
                    const response = await fetch(`${apiUrl}/model-data?appliance=${selectedAppliance}&brand=${selectedBrand.Brand}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    console.log('Received model data:', data);
                    setModels(data);
                } catch (error) {
                    console.error('Error fetching model data:', error);
                    setError(`Failed to fetch model data: ${error.message}`);
                }
            } else {
                setModels([]);
            }
        };

        fetchModels();
    }, [selectedAppliance, selectedBrand]);


    const highlightText = (text) => {
        return text.split(' ').map((word, index) =>
            word.toLowerCase() === 'lowest' || word.toLowerCase() === 'highest' ?
                <span key={index} className="highlight">{word}</span> :
                word + ' '
        );
    };

    const handleMouseDown = (e) => {
        const slider = applianceCardsRef.current;
        let startX = e.pageX - slider.offsetLeft;
        let scrollLeft = slider.scrollLeft;

        const handleMouseMove = (e) => {
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleApplianceSelect = (appliance) => {
        setIsChanging(true);
        setTimeout(() => {
            setSelectedAppliance(appliance.name);
            setSelectedApplianceImage(`/images/${appliance.image}`);
            setIsChanging(false);
        }, 300);
    };

    const handleBrandSelect = (brand) => {
        setSelectedBrand(brand);
    };



    const getNumericValue = (value) => {
        const num = parseFloat(value);
        return isNaN(num) ? 0 : num;
    };

    const maxConsumption = Math.max(...brands.map(b => getNumericValue(b.Average_Energy_Consumption)));





    return (
        <div className="buy-new-container">
            <section className="appliance-selection">
                <div className="appliance-details">
                    <h2>Select the appliances that you are interested to replace</h2>
                    <div className={`appliance-details-bottom ${initialLoad ? 'initial' : isChanging ? 'changing' : 'show'}`}>
                        <h3>{selectedAppliance}</h3>
                        <p>{brands.length} Different Brand Options Available</p>
                        <p>{selectedBrand ? models.length : 0} Different Model Options Available</p>
                    </div>
                </div>
                <img
                    className={`appliance-image ${initialLoad ? 'initial' : isChanging ? 'changing' : 'show'}`}
                    src={selectedApplianceImage}
                    alt="Selected Appliance"
                />
            </section>

            <div
                className="appliance-cards"
                ref={applianceCardsRef}
                onMouseDown={handleMouseDown}
            >
                {appliances.map((appliance, index) => (
                    <div
                        key={index}
                        className="appliance-card"
                        onClick={() => handleApplianceSelect(appliance)}
                    >
                        <img src={`/images/${appliance.image}`} alt={appliance.name} />
                    </div>
                ))}
            </div>

            <section className="brand-comparison" ref={brandComparisonRef}>
                <div className="brand-comparison-content">
                    <div className="brand-comparison-text">
                        <h3>{highlightText("Compare annual energy consumption across brands for your selected appliance from the lowest  to highest")}</h3>
                        <p>Your Selected Appliances: {selectedAppliance}</p>
                    </div>

                    <div className="energy-chart" ref={energyChartRef}>
                        {brands.map((brand, index) => {
                            const consumption = getNumericValue(brand.Average_Energy_Consumption);
                            const heightPercentage = (consumption / maxConsumption) * 90; // Scale to 90% of chart height
                            return (
                                <div
                                    key={index}
                                    className={`chart-bar ${selectedBrand === brand ? 'selected' : ''} ${heightPercentage >= 90 ? 'max-height' : ''}`}
                                    style={{ height: `${heightPercentage}%` }}
                                    onClick={() => handleBrandSelect(brand)}
                                >
                                    <div className="tooltip">
                                        {consumption.toFixed(2)} kWh/year
                                    </div>
                                    <span className="brand-name">{brand.Brand}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <div className="brand-selection">
                {brands.map((brand, index) => (
                    <button
                        key={index}
                        className={`brand-button ${selectedBrand === brand ? 'selected' : ''}`}
                        onClick={() => handleBrandSelect(brand)}
                    >
                        {brand.Brand}
                    </button>
                ))}
            </div>

            <section className="model-suggestion" ref={modelSuggestionRef}>
                <h3>Top pick for your selected appliances</h3>
                <div className="model-list">
                    {models.map((model, index) => (
                        <div key={index} className="model-item">
                            <span>{model.Model_No}</span>
                            <span>{getNumericValue(model.Star_Rating).toFixed(2)} Stars</span>
                            <span>{getNumericValue(model.Energy_Consumption_kWh_per_hour).toFixed(2)} kWh/hour</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default BuyNew;