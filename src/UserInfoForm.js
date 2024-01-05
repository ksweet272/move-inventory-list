import React, { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import './UserInfoForm.css';

// Wrap your component with forwardRef to receive a ref from the parent component
const UserInfoForm = forwardRef(({ sendUserInfo }, ref) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (formData) => {
        console.log("Sending user info:", formData);  // Confirming data is being sent
        sendUserInfo(formData); // Sending the validated user information back to the parent component
    };

    // Expose the handleSubmit function to the parent component
    useImperativeHandle(ref, () => ({
        submit: () => {
            handleSubmit(onSubmit)(); // Trigger the form submission
        }
    }));

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="user-info-form">
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
});

export default UserInfoForm;