import React from 'react';
import { useForm } from 'react-hook-form';
import './UserInfoForm.css'; // Create and import your CSS file for styling

const UserInfoForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);
        // You can further process the data or send it to your server
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="user-info-form">
            <div className="form-field">
                <label htmlFor="name">Name</label>
                <input id="name" {...register('name', { required: true })} />
                {errors.name && <span className="error">This field is required</span>}
            </div>

            <div className="form-field">
                <label htmlFor="phone">Phone Number</label>
                <input id="phone" type="tel" {...register('phone', { required: true })} />
                {errors.phone && <span className="error">This field is required</span>}
            </div>

            <div className="form-field">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" {...register('email', { required: true })} />
                {errors.email && <span className="error">This field is required</span>}
            </div>

            <button type="submit" className="submit-btn">Save Info</button>
        </form>
    );
};

export default UserInfoForm;
