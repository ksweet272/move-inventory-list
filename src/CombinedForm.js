import React, { useState } from 'react';
import UserInfoForm from './UserInfoForm';
import InventoryList from './InventoryList';
import './CombinedForm.css';

const CombinedForm = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [inventoryData, setInventoryData] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState("");

    const receiveUserInfo = (data) => {
        console.log("Received user info:", data);
        setUserInfo(data);
    };

    const receiveInventoryData = (data) => {
        console.log("Received inventory data:", data);
        setInventoryData(data);
    };

const handleSubmit = async () => {
    setIsSubmitted(true);
    setSubmissionStatus("Submitting...");

    try {
        // Construct the payload
        const payload = {
            userInfo: userInfo,
            inventoryList: inventoryData
        };

        // Make the HTTP POST request to the Netlify function
        const response = await fetch('/.netlify/functions/uploadToDrive', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            // If the submission was successful
            const result = await response.json();
            setSubmissionStatus("Data processed and uploaded successfully!");
            alert(`Data processed and uploaded successfully! File ID: ${result.fileId}`);
        } else {
            // If the server responded with an error
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        // If the request failed or the server responded with an error
        console.error('Error during data submission:', error);
        setSubmissionStatus("Failed to process data");
        alert('Failed to process data');
    }
};

    return (
        <div className="CombinedForm">
            <h2 className="form-header">User Information</h2>
            <UserInfoForm sendUserInfo={receiveUserInfo} />
            <InventoryList sendInventoryData={receiveInventoryData} />
            <button onClick={handleSubmit} className="CombinedForm-submitButton">
                Submit All Data
            </button>
            {submissionStatus && <p>{submissionStatus}</p>}
        </div>
    );
};

export default CombinedForm;
