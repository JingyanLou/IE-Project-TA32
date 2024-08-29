import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './step3container.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Step3Container = ({ formInput, handleInputChange, handleNextStep, energyProviders, benchmarkData }) => {
    const geocoderContainerRef = useRef(null);

    useEffect(() => {
        if (geocoderContainerRef.current && geocoderContainerRef.current.children.length === 0) {
            console.log('Initializing Mapbox Geocoder');
            const geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                types: 'address',
                placeholder: 'Enter your location',
                mapboxgl: mapboxgl,
                proximity: {
                    longitude: 144.9631,
                    latitude: -37.8136
                },
                countries: 'AU'
            });

            geocoder.addTo(geocoderContainerRef.current);

            geocoder.on('result', (e) => {
                const [longitude, latitude] = e.result.geometry.coordinates;
                console.log('Geocoder result:', { longitude, latitude });
                handleInputChange({
                    target: {
                        name: 'userLocation',
                        value: { longitude, latitude }
                    }
                });
            });

            return () => {
                if (geocoderContainerRef.current) {
                    console.log('Clearing Mapbox Geocoder');
                    //geocoder.clear();
                }
            };
        }
    }, [handleInputChange]);

    const handleEstimateNowClick = () => {
        const userInformation = {
            userLocation: formInput.userLocation,
            energyProvider: formInput.energyProvider,
            household: formInput.household,
            usageRate: formInput.usageRate,
            supplyCharge: formInput.supplyCharge,
            monthlyBenchmark: formInput.monthlyBenchmark,
        };

        console.log('Estimate Now Clicked. User Information:', userInformation);
        handleNextStep();
    };

    const handleEnergyProviderChange = (e) => {
        const selectedValue = e.target.value;

        console.log('Energy Provider selected:', selectedValue);

        // Update energyProvider, usageRate, and supplyCharge based on selection
        if (selectedValue === 'Not selected') {
            handleInputChange({
                target: {
                    name: 'energyProvider',
                    value: 'Not selected'
                }
            });

            handleInputChange({
                target: {
                    name: 'usageRate',
                    value: 0
                }
            });

            handleInputChange({
                target: {
                    name: 'supplyCharge',
                    value: 0
                }
            });
        } else {
            const selectedPlan = energyProviders.find(provider => provider.Plan === selectedValue);

            handleInputChange({
                target: {
                    name: 'energyProvider',
                    value: selectedPlan?.Plan || ''
                }
            });

            handleInputChange({
                target: {
                    name: 'usageRate',
                    value: selectedPlan?.UsageRate || 0
                }
            });

            handleInputChange({
                target: {
                    name: 'supplyCharge',
                    value: selectedPlan?.SupplyCharge || 0
                }
            });
        }

        // Log the form input state after changes
        setTimeout(() => {
            console.log('Updated formInput state after energy provider change:', { ...formInput, energyProvider: selectedValue });
        }, 0);
    };


    const handleHouseholdChange = (e) => {
        const householdSize = e.target.value;
        console.log('Household size selected:', householdSize);

        // Filter to find the correct benchmark based on the household size and season "Winter"
        const selectedBenchmark = benchmarkData.find(
            benchmark => benchmark.Season === 'Winter' && benchmark['Household size'] === householdSize
        );

        console.log('Selected Benchmark for household size:', selectedBenchmark);

        // Update household size and monthly benchmark
        handleInputChange({
            target: {
                name: 'household',
                value: householdSize
            }
        });

        handleInputChange({
            target: {
                name: 'monthlyBenchmark',
                value: selectedBenchmark?.['Monthly Benchmark (kWh)'] || 0
            }
        });

        // Log the updated formInput state after changes
        setTimeout(() => {
            console.log('Updated formInput state after household change:', {
                ...formInput,
                household: householdSize,
                monthlyBenchmark: selectedBenchmark?.['Monthly Benchmark (kWh)'] || 0
            });
        }, 0);
    };


    return (
        <div className="step3-container">
            <h2 className="form-title-step3">Enter your information</h2>
            <div className="form-container-step3">
                <div className="form-group-step3">
                    <label className="form-label-step3">User Location</label>
                    <div ref={geocoderContainerRef} className="form-input-step3 location-input"></div>
                </div>

                <div className="form-group-step3">
                    <label className="form-label-step3">Energy Provider</label>
                    <select
                        name="energyProvider"
                        value={formInput.energyProvider}
                        onChange={handleEnergyProviderChange}
                        className="form-input-step3"
                    >
                        <option value="Not selected">Not selected</option>
                        {energyProviders.map((provider, index) => (
                            <option key={index} value={provider.Plan}>
                                {provider.Provider} - {provider.Plan}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group-step3">
                    <label className="form-label-step3">Household Size</label>
                    <select
                        name="household"
                        value={formInput.household}
                        onChange={handleHouseholdChange}
                        className="form-input-step3"
                    >
                        <option value="Not selected">Not selected</option>
                        {['1', '2', '3', '4', '5+'].map((size, index) => (
                            <option key={index} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    className="estimate-button-step3"
                    onClick={handleEstimateNowClick}
                >
                    Estimate Now
                </button>
            </div>
        </div>
    );
};

Step3Container.propTypes = {
    formInput: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleNextStep: PropTypes.func.isRequired,
    energyProviders: PropTypes.array.isRequired,
    benchmarkData: PropTypes.array.isRequired,
};

export default Step3Container;
