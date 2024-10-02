import React, { useState, useEffect } from 'react';
import './uploadpage.css';
import Step1Container from '../components/Step1Container';
import Step2Container from '../components/Step2Container';
import Step3Container from '../components/Step3Container';
import Step4Container from '../components/Step4Container';
import { getApiBaseUrl } from '../utils/api'; // Import the base URL function

const Upload = () => {

    const apiUrl = getApiBaseUrl(); // Get the base API URL

    const [currentStep, setCurrentStep] = useState(1);

    const [data, setData] = useState({
        'Appliances-list': [],
        'User information': [],
    });

    const [applianceData, setApplianceData] = useState([]);

    const [formInput, setFormInput] = useState({
        applianceType: '',
        dailyHours: '',
        quantity: 1,
        userLocation: '',
        energyProvider: '',
        household: '1',
    });

    const [energyProviders, setEnergyProviders] = useState([]);

    const [benchmarkData, setBenchmarkData] = useState([]);
    const [appBrandData, setAppBrandData] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState('');
    const [topBrands, setTopBrands] = useState(5);
    const [appRecommData, setAppRecommData] = useState([]);
    const [uploadedImages, setUploadedImages] = useState([]);



    // Fetch appliance data from the backend
    // Fetch appliance data from the backend
    useEffect(() => {
        console.log(`Fetching from ${apiUrl}/appliances`);
        fetch(`${apiUrl}/appliances`)
            .then(response => response.json())
            .then(data => {
                setApplianceData(data);
                setFormInput(prevFormInput => ({
                    ...prevFormInput,
                    applianceType: data[0]?.Device || '',
                    dailyHours: data[0]?.['Average Daily Hours'] || 10,
                }));
            })
            .catch(error => console.error('Error fetching data:', error));

        console.log(`Fetching from ${apiUrl}/energy-providers`);
        fetch(`${apiUrl}/energy-providers`)
            .then(response => response.json())
            .then(data => {
                setEnergyProviders(data);
            })
            .catch(error => console.error('Error fetching energy providers:', error));

        console.log(`Fetching from ${apiUrl}/benchmark-vic`);
        fetch(`${apiUrl}/benchmark-vic`)
            .then(response => response.json())
            .then(data => {
                setBenchmarkData(data);
            })
            .catch(error => console.error('Error fetching benchmark data:', error));

        console.log(`Fetching from ${apiUrl}/app_recomm_iter2`);
        fetch(`${apiUrl}/app_recomm_iter2`)
            .then(response => response.json())
            .then(data => {
                setAppRecommData(data);
            })
            .catch(error => console.error('Error fetching recommendation data:', error));


        console.log(`Fetching from ${apiUrl}/app_brand_data_iter2`);
        fetch(`${apiUrl}/app_brand_data_iter2`)
            .then(response => response.json())
            .then(data => {
                console.log('Received app brand data:', data); // Add this line
                setAppBrandData(data);
                if (data.length > 0) {
                    setSelectedDevice(data[0].Device);
                }
            })
            .catch(error => console.error('Error fetching app brand data:', error));

    }, [apiUrl]);

    const handleNextStep = () => {
        if (currentStep === 1 && data['Appliances-list'].length === 0) {
            alert("Please add at least one appliance before proceeding.");
            return;
        }

        if (currentStep === 3) {
            const { userLocation, energyProvider, household } = formInput;

            if (!userLocation) {
                alert("Please enter your location.");
                return;
            }

            if (!energyProvider || energyProvider === 'Not selected') { //! to check if undefined, "" to check if empty, "Not selected" to check if not selected
                alert("Please select an energy provider.");
                return;
            }

            if (!household || household === 'Not selected') {
                alert("Please select your household size.");
                return;
            }
        }

        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };


    const handlePrevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        if (index !== undefined) {
            setData(prevData => ({
                ...prevData,
                'Appliances-list': prevData['Appliances-list'].map((appliance, i) =>
                    i === index ? { ...appliance, [name]: value } : appliance
                )
            }));
        } else {
            setFormInput(prevInput => ({ ...prevInput, [name]: value }));

            // If the appliance type changes, update the daily hours
            if (name === 'applianceType') {
                const selectedAppliance = applianceData.find(appliance => appliance.Device === value);
                if (selectedAppliance) {
                    setFormInput(prevInput => ({
                        ...prevInput,
                        dailyHours: selectedAppliance['Average Daily Hours'] || ''
                    }));
                }
            }
        }
    };

    const handleAddAppliance = () => {
        const newAppliance = [
            formInput.applianceType,
            formInput.quantity,
            formInput.dailyHours,
            0, // Energy Consumption (kWh/hour)
            'manual' // Source
        ];
        setData(prevData => ({
            ...prevData,
            'Appliances-list': [...prevData['Appliances-list'], newAppliance]
        }));
    };

    const handleDeleteImage = (indexToDelete) => {
        setUploadedImages(prevImages =>
            prevImages.filter((_, index) => index !== indexToDelete)
        );
    };

    const handleDeleteAppliance = (indexToDelete) => {
        setData(prevData => ({
            ...prevData,
            'Appliances-list': prevData['Appliances-list'].filter((_, index) => index !== indexToDelete)
        }));
    };

    const handleUploadImage = (files) => {
        const newImages = files.map(file => ({
            name: file.name,
            thumbnail: URL.createObjectURL(file),
            status: 'uploading',
            progress: 0
        }));
        setUploadedImages(prevImages => [...prevImages, ...newImages]);

        // Simulate upload process (replace with actual API call)
        newImages.forEach(image => {
            const interval = setInterval(() => {
                setUploadedImages(prevImages =>
                    prevImages.map(img =>
                        img.name === image.name
                            ? { ...img, progress: Math.min(img.progress + 10, 100) }
                            : img
                    )
                );
            }, 500);

            setTimeout(() => {
                clearInterval(interval);
                setUploadedImages(prevImages =>
                    prevImages.map(img =>
                        img.name === image.name
                            ? { ...img, status: 'uploaded', progress: 100 }
                            : img
                    )
                );
                // Simulate detection process (replace with actual API call)
                setTimeout(() => {
                    handleDetectedAppliance(image.name);
                }, 1000);
            }, 5000);
        });
    };

    const handleDetectedAppliance = (imageName) => {
        // Simulate detected appliance (replace with actual detection logic)
        const detectedAppliance = [
            'Detected Appliance',
            1, // quantity
            0, // daily hours
            0, // Energy Consumption (kWh/hour)
            'detected' // Source
        ];
        setData(prevData => ({
            ...prevData,
            'Appliances-list': [...prevData['Appliances-list'], detectedAppliance]
        }));
    };

    const handleUserInformation = () => {
        console.log('Saving user information with current formInput:', formInput);

        setData(prevData => ({
            ...prevData,
            'User information': [
                formInput.userLocation,
                formInput.energyProvider || 'Not provided',
                formInput.household || 'Not provided',
                formInput.usageRate || 'Not provided',
                formInput.supplyCharge,
                formInput.monthlyBenchmark || 'Not provided',
            ]
        }));

        console.log('Data state after saving user information:', {
            ...data,
            'User information': [
                formInput.userLocation,
                formInput.energyProvider,
                formInput.household,
                formInput.usageRate,
                formInput.supplyCharge,
                formInput.monthlyBenchmark,
            ]
        });

        handleNextStep(); // Proceed to the next step after setting data
    };


    return (
        <div className="upload-page">
            <div className="progress-bar-container">
                <div className="nav-arrow-container">
                    <button
                        className="nav-arrow left-arrow"
                        onClick={handlePrevStep}
                        disabled={currentStep === 1}
                    >
                        <span>&larr;</span>
                    </button>
                </div>
                <div className="progress-bar">
                    <div className="step">
                        <div className={`circle ${currentStep >= 1 ? 'active' : ''}`}>1</div>
                        <div className="step-label">Your Appliance </div>
                    </div>
                    <div className="line"></div>
                    <div className="step">
                        <div className={`circle ${currentStep >= 2 ? 'active' : ''}`}>2</div>
                        <div className="step-label">Appliance Ranking</div>
                    </div>
                    <div className="line"></div>
                    <div className="step">
                        <div className={`circle ${currentStep >= 3 ? 'active' : ''}`}>3</div>
                        <div className="step-label">Details of Your Home</div>
                    </div>
                    <div className="line"></div>
                    <div className="step">
                        <div className={`circle ${currentStep >= 4 ? 'active' : ''}`}>4</div>
                        <div className="step-label">Energy Estimation</div>
                    </div>
                </div>
                <div className="nav-arrow-container">
                    <button
                        className="nav-arrow right-arrow"
                        onClick={handleNextStep}
                        disabled={currentStep === 4}
                    >
                        <span>&rarr;</span>
                    </button>
                </div>
            </div>

            {currentStep === 1 && (
                <Step1Container
                    appliances={data['Appliances-list']}
                    applianceData={applianceData}
                    formInput={formInput}
                    handleInputChange={handleInputChange}
                    handleAddAppliance={handleAddAppliance}
                    handleDeleteAppliance={handleDeleteAppliance}
                    handleUploadImage={handleUploadImage}
                    uploadedImages={uploadedImages}
                    handleDetectedAppliance={handleDetectedAppliance}
                    handleDeleteImage={handleDeleteImage}
                />
            )}

            {currentStep === 2 && <Step2Container appliances={data['Appliances-list']} />}

            {currentStep === 3 && (
                <Step3Container
                    formInput={formInput}
                    handleInputChange={handleInputChange}
                    handleNextStep={handleUserInformation}
                    energyProviders={energyProviders}
                    benchmarkData={benchmarkData}
                />
            )}

            {currentStep === 4 && (
                <Step4Container
                    data={data}
                    appBrandData={appBrandData}
                    selectedDevice={selectedDevice}
                    setSelectedDevice={setSelectedDevice}
                    topBrands={topBrands}
                    setTopBrands={setTopBrands}
                    appRecommData={appRecommData}
                />
            )}
        </div>
    );
};

export default Upload;
