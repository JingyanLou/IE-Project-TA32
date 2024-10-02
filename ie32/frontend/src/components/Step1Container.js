import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './step1container.css';

const Step1Container = ({
    appliances = [],
    applianceData = [],
    formInput = {},
    handleInputChange = () => { },
    handleAddAppliance = () => { },
    handleDeleteAppliance = () => { },
    handleUploadImage = () => { },
    uploadedImages = [],
    handleDetectedAppliance = () => { }
}) => {
    const [inputMethod, setInputMethod] = useState('manual');

    const handleDailyHoursInput = (e) => {
        let value = e.target.value.replace(/[^0-9]/g, '');
        if (value !== '') {
            value = Math.max(1, Math.min(24, parseInt(value)));
        }
        e.target.value = value;
        handleInputChange(e);
    };

    const handleQuantityInput = (e) => {
        let value = e.target.value.replace(/[^0-9]/g, '');
        if (value !== '') {
            value = Math.max(1, Math.min(10, parseInt(value)));
        }
        e.target.value = value;
        handleInputChange(e);
    };

    const renderManualInput = () => (
        <div className="form-container">
            <div className="form-group">
                <label>Appliance Type</label>
                <select
                    name="applianceType"
                    value={formInput.applianceType}
                    onChange={handleInputChange}
                >
                    {applianceData.map((appliance, index) => (
                        <option key={index} value={appliance.Device}>
                            {appliance.Device}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Daily Hours</label>
                <input
                    type="number"
                    name="dailyHours"
                    value={formInput.dailyHours}
                    onChange={handleInputChange}
                    onInput={handleDailyHoursInput}
                    min="1"
                    max="24"
                />
            </div>
            <div className="form-group">
                <label>Quantity</label>
                <input
                    type="number"
                    name="quantity"
                    value={formInput.quantity}
                    onChange={handleInputChange}
                    onInput={handleQuantityInput}
                    min="1"
                    max="10"
                />
            </div>
            <button className="add-appliance-button" onClick={handleAddAppliance}>
                Add Appliance
            </button>
        </div>
    );

    const renderImageUpload = () => (
        <div className="upload-container">
            <div className="drag-drop-area" onDrop={handleDrop} onDragOver={handleDragOver}>
                <img src="/images/upload.png" alt="Upload" />
                <p>Drag and drop to upload</p>
                <p>Or</p>
                <label className="file-input-label">
                    <input type="file" onChange={handleFileSelect} accept="image/*" multiple />
                    Add files
                </label>
            </div>
            <p className="file-info">Supported file type: Jpeg,png</p>
            <p className="file-info">Maximum upload files size: 128MB</p>
        </div>
    );

    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        handleUploadImage(files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        handleUploadImage(files);
    };
    return (
        <div className="step1-container">


            <div className="content-columns">
                <div className="column-wrapper">
                    <div className="input-method-toggle">
                        <button
                            className={`toggle-button ${inputMethod === 'manual' ? 'active' : ''}`}
                            onClick={() => setInputMethod('manual')}
                        >
                            Manual
                        </button>
                        <button
                            className={`toggle-button ${inputMethod === 'upload' ? 'active' : ''}`}
                            onClick={() => setInputMethod('upload')}
                        >
                            Upload Picture
                        </button>
                    </div>

                    <div className="column input-column">
                        {inputMethod === 'manual' ? renderManualInput() : renderImageUpload()}
                    </div>

                </div>

                <div className="column-wrapper">
                    <h2 className="column-title">Uploaded Images</h2>
                    <div className="column uploaded-images-column">
                        <div className="uploaded-images-list">
                            {uploadedImages && uploadedImages.map((image, index) => (
                                <div key={index} className="uploaded-image-item">
                                    <img src={image.thumbnail} alt={image.name} className="image-thumbnail" />
                                    <div className="image-info">
                                        <p className="image-name">{image.name}</p>
                                        <div className="progress-bar-image">
                                            <div className="progress-image" style={{ width: `${image.progress}%` }}></div>
                                        </div>
                                        <p className="status">{image.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="column-wrapper">
                    <h2 className="column-title">Your Appliances</h2>
                    <div className="column">
                        <div className="appliances-list">
                            {appliances && appliances.map((appliance, index) => (
                                <div key={index} className="appliance-item">
                                    <img
                                        src={`/images/${appliance[4] === 'detected' ? 'detected.png' : 'manual.png'}`}
                                        alt={appliance[4]}
                                        className="appliance-icon"
                                    />
                                    <div className="appliance-info">
                                        <p className="appliance-name-step1">{appliance[0]}</p>
                                        <div className="appliance-inputs">
                                            <label htmlFor={`dailyHours-${index}`}>Daily Hours:</label>
                                            <input
                                                type="number"
                                                name="dailyHours"
                                                value={appliance[2]}
                                                onChange={(e) => handleInputChange(e, index)}
                                                onInput={(e) => handleDailyHoursInput(e, index)}
                                                min="1"
                                                max="24"
                                                placeholder="Hours"
                                            />
                                            <label htmlFor={`quantity-${index}`}>Quantity:</label>
                                            <input
                                                type="number"
                                                name="quantity"
                                                value={appliance[1]}
                                                onChange={(e) => handleInputChange(e, index)}
                                                onInput={(e) => handleQuantityInput(e, index)}
                                                min="1"
                                                max="10"
                                                placeholder="Qty"
                                            />
                                        </div>
                                    </div>
                                    <button className="delete-button" onClick={() => handleDeleteAppliance(index)}>
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Step1Container.propTypes = {
    appliances: PropTypes.array,
    applianceData: PropTypes.array,
    formInput: PropTypes.object,
    handleInputChange: PropTypes.func,
    handleAddAppliance: PropTypes.func,
    handleDeleteAppliance: PropTypes.func,
    handleUploadImage: PropTypes.func,
    uploadedImages: PropTypes.array,
    handleDetectedAppliance: PropTypes.func,
};

export default Step1Container;