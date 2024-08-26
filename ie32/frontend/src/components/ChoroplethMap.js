import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import './choroplethmap.css';

const ChoroplethMap = () => {
    const mapContainerRef = useRef(null);

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoianlvdGk2Nzk3IiwiYSI6ImNsemRzZWxydDBwczgyanBxMW10cmgxOXcifQ.-U4-1sM_x984t1UzkmlgaA';

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/jyoti6797/cm05a1ny000if01rbf1131wli',  // Replace with your Mapbox Studio style URL
            center: [144.9631, -37.8136], // Melbourne coordinates
            zoom: 10,
        });

        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        return () => {
            map.remove();
        };
    }, []);

    return (
        <div className="choropleth-map-container" ref={mapContainerRef}></div>
    );
};

export default ChoroplethMap;
