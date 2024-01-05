import React from 'react';
import { useForm } from 'react-hook-form';
import './UserInfoForm.css';

const UserInfoForm = ({ sendUserInfo }) => {
    const { register, handleSubmit: handleFormSubmit, formState: { errors } } = useForm();

    const onSubmit = (formData) => {
        console.log("Sending user info:", formData);  // Added log for debugging
        sendUserInfo(formData); // Sending the validated user information back to the parent component
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

            {/* No individual submit button; submission is handled by the parent component. */}
        </form>
    );
};

export default UserInfoForm;
