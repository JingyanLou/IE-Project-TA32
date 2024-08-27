import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './step3container.css';

mapboxgl.accessToken = 'pk.eyJ1IjoianlvdGk2Nzk3IiwiYSI6ImNtMGF5bjNoNDAycGsybm9vbjVkbWN2NmcifQ.NCGxbDcL13CXjZwhDwaK4g';

const Step3Container = ({ formInput, handleInputChange, handleLocationSelect }) => {
    const geocoderContainerRef = useRef(null);

    useEffect(() => {
        if (geocoderContainerRef.current) {
            geocoderContainerRef.current.innerHTML = ''; // Clear the container to prevent multiple instances

            const geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                types: 'place',
                placeholder: 'Enter your location',
                mapboxgl: mapboxgl,
            });

            geocoder.addTo(geocoderContainerRef.current);

            geocoder.on('result', (e) => {
                handleLocationSelect(e.result);
                console.log('Selected location:', e.result);
            });

            // Clean up the Geocoder instance on component unmount
            return () => {
                geocoder.clear();
            };
        }
    }, [handleLocationSelect]);

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
                        className="form-input-step3"
                    />
                </div>
                <button className="estimate-button-step3">Estimate Now</button>
            </div>
        </div>
    );
};

Step3Container.propTypes = {
    formInput: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleLocationSelect: PropTypes.func.isRequired,
};

export default Step3Container;

