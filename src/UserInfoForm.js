import React from 'react';
import { useForm } from 'react-hook-form';
import './UserInfoForm.css';

const UserInfoForm = () => {
    const { register, handleSubmit: handleFormSubmit, formState: { errors } } = useForm();

    // Function to handle submission to the Netlify function
    const handleSubmit = async (data) => {
        try {
            const response = await fetch('/.netlify/functions/uploadToDrive', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Success:', result);
            alert('Data processed and uploaded successfully!');
        } catch (error) {
            console.error('Error during data submission:', error);
            alert('Failed to process data');
        }
    };

    const onSubmit = (formData) => {
        const dataToSubmit = {
            userInfo: formData,
            inventoryList: []  // Assuming no inventory items in user info form
        };
        handleSubmit(dataToSubmit);
    };

    return (
        <form onSubmit={handleFormSubmit(onSubmit)} className="user-info-form">
            <div className="form-field">
                <label htmlFor="name">Name</label>
                <input id="name" {...register('name', { required: 'Name is required', minLength: { value: 2, message: "Name must be at least 2 characters" }})} />
                {errors.name && <span className="error">{errors.name.message}</span>}
            </div>

            <div className="form-field">
                <label htmlFor="phone">Phone Number</label>
                <input id="phone" type="tel" {...register('phone', { required: 'Phone number is required', pattern: { value: /^[0-9]+$/, message: "Invalid phone number" }})} />
                {errors.phone && <span className="error">{errors.phone.message}</span>}
            </div>

            <div className="form-field">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }})} />
                {errors.email && <span className="error">{errors.email.message}</span>}
            </div>

            <button type="submit" className="submit-btn">Save Info</button>
        </form>
    );
};

export default UserInfoForm;
