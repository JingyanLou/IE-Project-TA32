import React, { useState, useRef } from 'react';
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
    handleDetectedAppliance = () => { },
    handleDeleteImage = () => { }
}) => {
    const [inputMethod, setInputMethod] = useState('manual');
    const fileInputRef = useRef(null);


    const handleDailyHoursInput = (e, index) => {
        let value = e.target.value;

        // Allow empty string for user typing
        if (value !== '') {
            value = Math.min(24, Math.max(0, parseFloat(value)));
            value = isNaN(value) ? 0 : Number(value.toFixed(1));
        }

        if (index !== undefined) {
            // Update appliance list item
            const updatedAppliances = [...appliances];
            updatedAppliances[index][2] = value;
            handleInputChange({ target: { name: 'Appliances-list', value: updatedAppliances } });
        } else {
            // Update form input
            handleInputChange({ target: { name: 'dailyHours', value } });
        }
    };

    const handleQuantityInput = (e, index) => {
        let value = e.target.value;

        // Allow empty string for user typing
        if (value !== '') {
            value = Math.min(10, Math.max(1, parseInt(value)));
            value = isNaN(value) ? 1 : value;
        }

        if (index !== undefined) {
            // Update appliance list item
            const updatedAppliances = [...appliances];
            updatedAppliances[index][1] = value;
            handleInputChange({ target: { name: 'Appliances-list', value: updatedAppliances } });
        } else {
            // Update form input
            handleInputChange({ target: { name: 'quantity', value } });
        }
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
                    <option value="">Select an appliance</option>
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
                    onChange={(e) => handleDailyHoursInput(e)}
                    onBlur={(e) => handleDailyHoursInput(e)}
                    min="0"
                    max="24"
                    step="0.1"
                />
            </div>
            <div className="form-group">
                <label>Quantity</label>
                <input
                    type="number"
                    name="quantity"
                    value={formInput.quantity}
                    onChange={(e) => handleQuantityInput(e)}
                    onBlur={(e) => handleQuantityInput(e)}
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
            <div className="drag-drop-area" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                <img src="/images/upload.png" alt="Upload" />
                <p>Drag and drop to upload</p>
                <p>Or</p>
                <label className="file-input-label">
                    <input
                        type="file"
                        onChange={handleFileSelect}
                        accept="image/*"
                        multiple
                        ref={fileInputRef}
                    />
                    Add files
                </label>
            </div>
            <p className="file-info">Supported file type: JPEG</p>
            <p className="file-info">You can upload up to 5 images.</p>
            <p className="file-info">Maximum file size: 10MB per image</p>
            <p className="file-info">Our system can detect common household appliances.</p>
            <p className="file-info">Your images will not be stored or shared.</p>

        </div>
    );

    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        handleFilesSelected(files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                console.log("Base64 string length:", reader.result.length);
                console.log("Base64 string prefix:", reader.result.substring(0, 50));
                resolve(reader.result.split(',')[1]); // Remove the data URL prefix
            };
            reader.onerror = (error) => reject(error);
        });
    };

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        handleFilesSelected(files);
        // Clear the file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleFilesSelected = (files) => {
        const duplicates = [];
        const oversizedFiles = [];
        const maxFileSize = 10 * 1024 * 1024; // 10MB in bytes
        const remainingSlots = 5 - uploadedImages.length;

        const newImages = Array.from(files).slice(0, remainingSlots).filter(file => {
            // Check for duplicates
            const isDuplicate = uploadedImages.some(img => img.name === file.name);
            if (isDuplicate) {
                duplicates.push(file.name);
                return false;
            }

            // Check file size
            if (file.size > maxFileSize) {
                oversizedFiles.push(file.name);
                return false;
            }

            return true;
        }).map(file => ({
            file,
            name: file.name,
            thumbnail: URL.createObjectURL(file),
            status: 'queued',
            progress: 0
        }));

        if (duplicates.length > 0) {
            alert(`Duplicate image(s) detected: ${duplicates.join(', ')}. You can only upload each image once.`);
        }

        if (oversizedFiles.length > 0) {
            alert(`The following file(s) exceed the 10MB size limit: ${oversizedFiles.join(', ')}`);
        }

        if (files.length > remainingSlots) {
            alert(`You can only upload a maximum of 5 images.`);
        }

        if (newImages.length > 0) {
            handleUploadImage(newImages);
        }
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
                            {uploadedImages.map((image, index) => (
                                <div key={index} className="uploaded-image-item">
                                    <img src={image.thumbnail} alt={image.name} className="image-thumbnail" />
                                    <div className="image-info">
                                        <p className="image-name">{image.name}</p>
                                        <div className="progress-bar-image">
                                            <div className="progress-image" style={{ width: `${image.progress}%` }}></div>
                                        </div>
                                        <p className="status">{image.status}</p>
                                    </div>
                                    <button className="delete-button" onClick={() => handleDeleteImage(index)}>
                                        ✕
                                    </button>
                                    {image.status === 'uploaded' && (
                                        <div className="s1c-tooltip">
                                            <strong>Detected Objects:</strong>
                                            <ul>
                                                {image.detectedObjects && image.detectedObjects.map((obj, i) => (
                                                    <li key={i}>{obj}</li>
                                                ))}
                                            </ul>
                                            <strong>Filter Appliances:</strong>
                                            <ul>
                                                {image.filteredObjects && image.filteredObjects.map((obj, i) => (
                                                    <li key={i}>{obj}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
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
                                <div
                                    key={index}
                                    className={`appliance-item ${appliance[4] === 'detected' ? 'detected-appliance' : ''}`}
                                >
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
                                                onChange={(e) => handleDailyHoursInput(e, index)}
                                                onBlur={(e) => handleDailyHoursInput(e, index)}
                                                min="0"
                                                max="24"
                                                step="0.1"
                                                placeholder="Hours"
                                            />
                                            <label htmlFor={`quantity-${index}`}>Quantity:</label>
                                            <input
                                                type="number"
                                                name="quantity"
                                                value={appliance[1]}
                                                onChange={(e) => handleQuantityInput(e, index)}
                                                onBlur={(e) => handleQuantityInput(e, index)}
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
    handleDeleteImage: PropTypes.func,
};

export default Step1Container;