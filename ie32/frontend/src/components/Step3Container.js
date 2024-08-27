import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './step3container.css';

mapboxgl.accessToken = 'pk.eyJ1IjoianlvdGk2Nzk3IiwiYSI6ImNtMGF5bjNoNDAycGsybm9vbjVkbWN2NmcifQ.NCGxbDcL13CXjZwhDwaK4g';

const Step3Container = ({ formInput, handleInputChange, handleNextStep }) => {
    const geocoderContainerRef = useRef(null);

    useEffect(() => {
        if (geocoderContainerRef.current && geocoderContainerRef.current.children.length === 0) {
            const geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                types: 'address',
                placeholder: 'Enter your location',
                mapboxgl: mapboxgl,
                proximity: {
                    longitude: 144.9631,  // Melbourne's Longitude
                    latitude: -37.8136     // Melbourne's Latitude
                },
                countries: 'AU'  // Restrict results to Australia
            });

            geocoder.addTo(geocoderContainerRef.current);

            geocoder.on('result', (e) => {
                const [longitude, latitude] = e.result.geometry.coordinates;
                handleInputChange({
                    target: {
                        name: 'userLocation',
                        value: { longitude, latitude }
                    }
                });
            });

            // Clean up on unmount to ensure the geocoder instance is properly removed
            return () => {
                if (geocoderContainerRef.current) {
                    geocoder.clear();
                }
            };
        }
    }, [handleInputChange]);

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
                        value={formInput.energyProvider || ''}
                        onChange={handleInputChange}
                        className="form-input-step3"
                    >
                        {['Provider A', 'Provider B', 'Provider C'].map((provider, index) => (
                            <option key={index} value={provider}>
                                {provider}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group-step3">
                    <label className="form-label-step3">Household</label>
                    <input
                        type="number"
                        name="household"
                        value={formInput.household || ''}
                        onChange={handleInputChange}
                        min="1"
                        max="5"
                        className="form-input-step3"
                    />
                </div>
                <button
                    className="estimate-button-step3"
                    onClick={handleNextStep}
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
    handleNextStep: PropTypes.func.isRequired, // Add handleNextStep prop
};

export default Step3Container;
