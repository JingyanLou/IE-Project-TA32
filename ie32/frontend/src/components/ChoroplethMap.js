import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import './choroplethmap.css';

const ChoroplethMap = ({ longitude, latitude }) => {
    const mapContainerRef = useRef(null);

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoianlvdGk2Nzk3IiwiYSI6ImNsemRzZWxydDBwczgyanBxMW10cmgxOXcifQ.-U4-1sM_x984t1UzkmlgaA';

        console.log('Received Longitude:', longitude, 'Latitude:', latitude);

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/jyoti6797/cm05a1ny000if01rbf1131wli',  // Replace with your Mapbox Studio style URL
            center: [longitude || 144.9631, latitude || -37.8136], // Default to Melbourne if no coordinates
            zoom: 14,  // Set an initial zoom level where the marker is visible
            pitch: 0,  // Set pitch to 0 to remove perspective
            bearing: 0,  // Set bearing to 0 to ensure north is up
        });

        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        if (longitude && latitude) {
            new mapboxgl.Marker({ anchor: 'center' })
                .setLngLat([longitude, latitude])
                .addTo(map);
        }

        return () => {
            map.remove();
        };
    }, [longitude, latitude]);

    return (
        <div className="choropleth-map-container" ref={mapContainerRef}></div>
    );
};

export default ChoroplethMap;
