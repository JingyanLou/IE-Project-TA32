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
        applianceType: '', // Default to empty string
        dailyHours: 10,
        quantity: 1,
        userLocation: '',
        energyProvider: '',
        household: '1', // Default to '1'
    });

    const [energyProviders, setEnergyProviders] = useState([]);

    const [benchmarkData, setBenchmarkData] = useState([]);

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

    // Handle input change for form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormInput((prevFormInput) => {
            let updatedFormInput = {
                ...prevFormInput,
                [name]: value
            };

            // If the applianceType is changed, update the dailyHours to match the selected appliance's default
            if (name === 'applianceType') {
                const selectedAppliance = applianceData.find(appliance => appliance.Device === value);
                if (selectedAppliance) {
                    updatedFormInput.dailyHours = selectedAppliance['Average Daily Hours'] || 10;
                }
            }

            console.log('Updated formInput:', updatedFormInput);
            return updatedFormInput;
        });
    };


    const handleAddAppliance = () => {

        // Find the selected appliance in the applianceData array
        const selectedAppliance = applianceData.find(appliance => appliance.Device === formInput.applianceType);
        // If the selected appliance is found, extract its energy consumption (kWh/hour)
        const energyConsumptionKWh = selectedAppliance ? selectedAppliance['Energy Consumption (kWh/hour)'] : 0;


        const newAppliance = [
            formInput.applianceType,
            formInput.quantity,
            formInput.dailyHours,
            energyConsumptionKWh // Energy Consumption (kWh/hour)
        ];

        console.log('Adding new appliance:', newAppliance);

        setData(prevData => ({
            ...prevData,
            'Appliances-list': [...prevData['Appliances-list'], newAppliance]
        }));

        setFormInput({
            applianceType: applianceData[0]?.Device || '',
            dailyHours: applianceData[0]?.['Average Daily Hours'] || 10,
            quantity: 1
        });
    };

    const handleDeleteAppliance = (indexToDelete) => {
        setData(prevData => ({
            ...prevData,
            'Appliances-list': prevData['Appliances-list'].filter((_, index) => index !== indexToDelete)
        }));
    };

    const handleUserInformation = () => {
        console.log('Saving user information with current formInput:', formInput);

        // Ensure all necessary values are set before saving
        setData(prevData => ({
            ...prevData,
            'User information': [
                formInput.userLocation,
                formInput.energyProvider || 'Not provided', //if empty or not selected, default to 'Not provided'
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

        handleNextStep(); // Proceed to the next step only after setting data
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
                        <div className="step-label">Fill In Appliance Details</div>
                    </div>
                    <div className="line"></div>
                    <div className="step">
                        <div className={`circle ${currentStep >= 2 ? 'active' : ''}`}>2</div>
                        <div className="step-label">Appliance Consumption List</div>
                    </div>
                    <div className="line"></div>
                    <div className="step">
                        <div className={`circle ${currentStep >= 3 ? 'active' : ''}`}>3</div>
                        <div className="step-label">Fill In Home Energy Details</div>
                    </div>
                    <div className="line"></div>
                    <div className="step">
                        <div className={`circle ${currentStep >= 4 ? 'active' : ''}`}>4</div>
                        <div className="step-label">See Your Customized Insights</div>
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
                />
            )}
        </div>
    );
};

export default Upload;
