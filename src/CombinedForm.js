import React, { useState, useRef, useEffect } from 'react';
import UserInfoForm from './UserInfoForm';
import InventoryList from './InventoryList';
import './CombinedForm.css';

const CombinedForm = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [inventoryData, setInventoryData] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState("");

    const userInfoFormRef = useRef();  // Reference to the UserInfoForm component

    const receiveUserInfo = (data) => {
        setUserInfo(data);
    };

    const receiveInventoryData = (data) => {
        setInventoryData(data);
    };

    useEffect(() => {
        // Whenever userInfo is updated and not null, try to submit the form.
        if (userInfo && inventoryData.length && isSubmitted) {
            submitForm();
        }
    }, [userInfo, inventoryData, isSubmitted]); // Re-run the effect if these values change

    const handleSubmit = () => {
        setIsSubmitted(true); // Indicate that submission has been attempted
        if (userInfoFormRef.current) {
            userInfoFormRef.current.submit(); // Trigger the UserInfoForm submission
        }
        // The useEffect hook takes over from here...
    };

    const submitForm = async () => {
        setSubmissionStatus("Submitting...");

        try {
            const payload = {
                userInfo: userInfo,
                inventoryList: inventoryData
            };

            const response = await fetch('/.netlify/functions/uploadToDrive', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const result = await response.json();
                setSubmissionStatus("Data processed and uploaded successfully!");
                alert(`Data processed and uploaded successfully! File ID: ${result.fileId}`);
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error during data submission:', error);
            setSubmissionStatus("Failed to process data. " + error.message);
            alert('Failed to process data. Please check the console for more details.');
        }
    };

    return (
        <div className="CombinedForm">
            <h2 className="form-header">User Information</h2>
            <UserInfoForm ref={userInfoFormRef} sendUserInfo={receiveUserInfo} />
            <InventoryList sendInventoryData={receiveInventoryData} />
            <button onClick={handleSubmit} disabled={isSubmitted} className="CombinedForm-submitButton">
                Submit All Data
            </button>
            {submissionStatus && <p>{submissionStatus}</p>}
        </div>
    );
};

export default CombinedForm;