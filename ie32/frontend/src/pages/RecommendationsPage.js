// src/pages/RecommendationsPage.js
import React from 'react';
import ModelViewer from '../components/ModelViewer';

function RecommendationsPage() {
    return (
        <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <ModelViewer />
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                pointerEvents: 'none',  // Ensures the overlay doesn't block the canvas interaction
            }}>
                <h1 style={{ color: 'white', zIndex: 2 }}>Appliance Usage Recommendations</h1>
            </div>
        </div>
    );
}

export default RecommendationsPage;
