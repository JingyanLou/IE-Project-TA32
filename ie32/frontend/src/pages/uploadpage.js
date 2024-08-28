import React, { useState, useEffect } from 'react';
import './uploadpage.css';
import Step1Container from '../components/Step1Container';
import Step2Container from '../components/Step2Container';
import Step3Container from '../components/Step3Container';
import Step4Container from '../components/Step4Container';

const Upload = () => {

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
    useEffect(() => {
        fetch('http://localhost:5000/api/appliances')
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

        fetch('http://localhost:5000/api/energy-providers')
            .then(response => response.json())
            .then(data => {
                setEnergyProviders(data);
            })
            .catch(error => console.error('Error fetching energy providers:', error));

        fetch('http://localhost:5000/api/benchmark-vic')
            .then(response => response.json())
            .then(data => {
                setBenchmarkData(data);
            })
            .catch(error => console.error('Error fetching benchmark data:', error));

    }, []);

    const handleNextStep = () => {
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
        const newAppliance = [
            formInput.applianceType,
            formInput.quantity,
            formInput.dailyHours
        ];

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
                        <div className="step-label">Fill in appliance details</div>
                    </div>
                    <div className="line"></div>
                    <div className="step">
                        <div className={`circle ${currentStep >= 2 ? 'active' : ''}`}>2</div>
                        <div className="step-label">Appliance Consumption List</div>
                    </div>
                    <div className="line"></div>
                    <div className="step">
                        <div className={`circle ${currentStep >= 3 ? 'active' : ''}`}>3</div>
                        <div className="step-label">Fill in home energy details</div>
                    </div>
                    <div className="line"></div>
                    <div className="step">
                        <div className={`circle ${currentStep >= 4 ? 'active' : ''}`}>4</div>
                        <div className="step-label">See your customized insights</div>
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
