import React, { useState, useRef, useEffect } from 'react';
import './buynew.css';

const BuyNew = () => {
    const [selectedAppliance, setSelectedAppliance] = useState('Air Conditioner');
    const [selectedApplianceImage, setSelectedApplianceImage] = useState('/images/aircondition.png');
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [isChanging, setIsChanging] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);

    const appliances = [
        { name: 'Air Conditioner', image: 'aircondition.png' },
        { name: 'Cloth Dryer', image: 'clothdryer.png' },
        { name: 'Dishwasher', image: 'dishwasher.png' },
        { name: 'Electric Light', image: 'electriclight.png' },
        { name: 'Florescent Lamp', image: 'florescentlamp.png' },
        { name: 'Heater', image: 'heater.png' },
        { name: 'Lamp', image: 'lamp.png' }
    ];

    const applianceCardsRef = useRef(null);
    const brandComparisonRef = useRef(null);
    const modelSuggestionRef = useRef(null);

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
        // Simulating API call to get brands for the selected appliance
        const fetchBrands = () => {
            const brandData = [
                { id: 1, name: 'Sony', consumption: Math.random() * 100 + 50 },
                { id: 2, name: 'AGL', consumption: Math.random() * 100 + 50 },
                { id: 3, name: 'STK', consumption: Math.random() * 100 + 50 },
                { id: 4, name: 'HX', consumption: Math.random() * 100 + 50 },
                { id: 5, name: 'Hisense', consumption: Math.random() * 100 + 50 },
                { id: 6, name: 'Newbie', consumption: Math.random() * 100 + 50 },
                { id: 7, name: 'Dafuq', consumption: Math.random() * 100 + 50 },
                { id: 8, name: 'Very Long Brand Name', consumption: Math.random() * 100 + 50 },
                { id: 9, name: 'Another Long Brand Name', consumption: Math.random() * 100 + 50 },
            ];
            setBrands(brandData);
        };

        fetchBrands();
        setSelectedBrand(null);
    }, [selectedAppliance]);

    useEffect(() => {
        // Simulating API call to get models for the selected appliance and brand
        const fetchModels = () => {
            if (selectedBrand) {
                const modelData = [
                    { id: 1, name: 'Model A', rating: 3.5, consumption: 1.2 },
                    { id: 2, name: 'Model B', rating: 4.0, consumption: 1.0 },
                    { id: 3, name: 'Model C', rating: 3.8, consumption: 1.1 },
                    { id: 4, name: 'Model D', rating: 4.2, consumption: 0.9 },
                    { id: 5, name: 'Model E', rating: 3.7, consumption: 1.3 },
                ];
                setModels(modelData);
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
                        <h3>{highlightText("Compare annual energy consumption across brands for your selected appliance from the lowest to highest")}</h3>
                        <p>Your Selected Appliances: {selectedAppliance}</p>
                    </div>
                    <div className="energy-chart">
                        {brands.map((brand) => (
                            <div
                                key={brand.id}
                                className={`chart-bar ${selectedBrand === brand ? 'selected' : ''}`}
                                style={{ height: `${(brand.consumption / Math.max(...brands.map(b => b.consumption))) * 100}%` }}
                                onClick={() => handleBrandSelect(brand)}
                            >
                                <span className="brand-name">{brand.name}</span>
                                <div className="tooltip">
                                    Energy Consumption: {brand.consumption.toFixed(2)} kWh/year
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="brand-selection">
                {brands.map((brand) => (
                    <button
                        key={brand.id}
                        className={`brand-button ${selectedBrand === brand ? 'selected' : ''}`}
                        onClick={() => handleBrandSelect(brand)}
                    >
                        {brand.name}
                    </button>
                ))}
            </div>

            <section className="model-suggestion" ref={modelSuggestionRef}>
                <h3>Top pick for your selected appliances</h3>
                <div className="model-list">
                    {models.map((model) => (
                        <div key={model.id} className="model-item">
                            <span>{model.name}</span>
                            <span>{model.rating.toFixed(2)} Stars</span>
                            <span>{model.consumption.toFixed(2)} kWh/hour</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default BuyNew;