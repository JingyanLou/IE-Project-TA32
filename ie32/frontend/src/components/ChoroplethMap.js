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
                style: 'mapbox://styles/jyoti6797/cm05a1ny000if01rbf1131wli',
                center: [longitude || 144.9631, latitude || -37.8136],
                zoom: 14,
                pitch: 0,
                bearing: 0,
            });

            map.addControl(new mapboxgl.NavigationControl(), 'top-right');

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

                // Add a layer to highlight the hovered block
                map.addLayer({
                    id: 'block-highlight-layer',
                    type: 'line',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: []
                        }
                    },
                    paint: {
                        'line-color': '#ffffff',
                        'line-width': 3
                    }
                });

                map.on('mousemove', 'block-level-2021-c33313', (e) => {
                    if (e.features.length > 0) {
                        const feature = e.features[0];
                        const totalEnergy = feature.properties.total;
                        const mouseCoordinates = e.point;

                        // Update the highlight layer with the hovered block geometry
                        map.getSource('block-highlight-layer').setData({
                            type: 'FeatureCollection',
                            features: [feature]
                        });

                        setHoverInfo({
                            coordinates: mouseCoordinates,
                            totalEnergy: totalEnergy
                        });
                    }
                });

                map.on('mouseleave', 'block-level-2021-c33313', () => {
                    setHoverInfo(null);

                    // Remove the highlight by clearing the layer's data
                    map.getSource('block-highlight-layer').setData({
                        type: 'FeatureCollection',
                        features: []
                    });
                });
            });

            mapRef.current = map;
        } else {
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

            mapRef.current.flyTo({
                center: [longitude, latitude],
                zoom: 18,
                pitch: 60,
                bearing: -17.6,
                speed: 1.6,
                curve: 1,
                easing: (t) => t,
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
        <div className="choropleth-map-container" ref={mapContainerRef}>
            {hoverInfo && (
                <div
                    className="map-tooltip"
                    style={{
                        left: `${hoverInfo.coordinates.x + 10}px`, // Offset to avoid covering the pointer
                        top: `${hoverInfo.coordinates.y + 10}px`,
                        opacity: 1 // Ensure tooltip is fully visible
                    }}
                >
                    Total Block consumption <br />
                    <strong>{hoverInfo.totalEnergy} Kwh</strong>
                </div>
            )}
        </div>
    );
};

export default ChoroplethMap;
