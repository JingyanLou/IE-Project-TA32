import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './choroplethmap.css';

const ChoroplethMap = ({ longitude, latitude }) => {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const [hoverInfo, setHoverInfo] = useState(null);

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoianlvdGk2Nzk3IiwiYSI6ImNsemRzZWxydDBwczgyanBxMW10cmgxOXcifQ.-U4-1sM_x984t1UzkmlgaA';

        if (!mapRef.current) {
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/jyoti6797/cm05a1ny000if01rbf1131wli',  // Replace with your Mapbox Studio style URL
                center: [longitude || 144.9631, latitude || -37.8136], // Default to Melbourne if no coordinates
                zoom: 14,
                pitch: 0,
                bearing: 0,
            });

            map.addControl(new mapboxgl.NavigationControl(), 'top-right');

            // Add a vector source and layer for the point
            map.on('load', () => {
                map.addSource('point', {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [
                            {
                                type: 'Feature',
                                geometry: {
                                    type: 'Point',
                                    coordinates: [longitude, latitude],
                                },
                                properties: {}
                            }
                        ]
                    }
                });

                map.addLayer({
                    id: 'point-layer',
                    type: 'circle',
                    source: 'point',
                    paint: {
                        'circle-radius': 10,
                        'circle-color': '#ff0000',
                        'circle-stroke-width': 1,
                        'circle-stroke-color': '#ffffff'
                    }
                });

                // Fly to the user's location and adjust the view to show 3D buildings
                map.flyTo({
                    center: [longitude, latitude],
                    zoom: 18, // Zoom in close to the point
                    pitch: 60, // Tilt the map to show 3D buildings
                    bearing: -17.6, // Adjust the bearing to orient the view
                    speed: 1.6, // Fly speed (default is 1.2, higher is faster)
                    curve: 1, // Fly curve (default is 1, making it smoother)
                    easing: (t) => t, // Easing function (linear in this case)
                    essential: true // This animation is essential with respect to prefers-reduced-motion
                });
            });

            // Store the map instance in the ref
            mapRef.current = map;
        } else {
            // Update the source data when longitude/latitude change
            mapRef.current.getSource('point').setData({
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [longitude, latitude],
                        },
                        properties: {}
                    }
                ]
            });

            // Fly to the user's location if the coordinates change
            mapRef.current.flyTo({
                center: [longitude, latitude],
                zoom: 18, // Zoom in close to the point
                pitch: 60, // Tilt the map to show 3D buildings
                bearing: -17.6, // Adjust the bearing to orient the view
                speed: 1.6, // Fly speed
                curve: 1, // Fly curve
                easing: (t) => t, // Easing function
                essential: true
            });
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [longitude, latitude]);

    return (
        <div className="choropleth-map-container" ref={mapContainerRef} style={{ width: '100%', height: '100%' }}></div>
    );
};

export default ChoroplethMap;
