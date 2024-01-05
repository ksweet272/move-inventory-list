import React, { useState, useRef } from 'react';
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
        console.log("Received user info:", data); // Confirm this logs the expected information
        setUserInfo(data);
    };

    const receiveInventoryData = (data) => {
        console.log("Received inventory data:", data); // Confirm this logs the expected information
        setInventoryData(data);
    };

    const handleSubmit = async () => {
        // Trigger the UserInfoForm submission
        if (userInfoFormRef.current) {
            userInfoFormRef.current.submit(); 
        }

        // Now wait a brief moment for the userInfo state to update
        setTimeout(async () => {
            if (!userInfo) {
                alert("Please fill in user information before submitting.");
                setSubmissionStatus("User information is missing.");
                return;
            }

            setIsSubmitted(true);
            setSubmissionStatus("Submitting...");

            try {
                // Construct the payload with userInfo and inventoryData
                const payload = {
                    userInfo: userInfo,
                    inventoryList: inventoryData
                };
                console.log("Submitting payload:", payload); // Log the payload for debugging

                // Make the HTTP POST request to the Netlify function
                const response = await fetch('/.netlify/functions/uploadToDrive', {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: { 'Content-Type': 'application/json' }
                });

                // Handle response
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
        }, 100); // Adjust this timeout as needed
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
