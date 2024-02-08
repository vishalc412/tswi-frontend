import './Termination.css';
import { useState } from "react";
import { Calendar } from 'primereact/calendar';

export default function Termination() {

    const [formData, setFormData] = useState({
        chasisNo: '',
        terminationDate: '',
        docUrl: '',
        regNo: ''
    });

    const [formErrors, setFormErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    // Fxn to handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Fxn to validate form data
    const validateForm = () => {
        let errors = {};

        if (!formData.chasisNo.trim()) {
            errors.chasisNo = 'Chasis No is required';
        } else if (!/^\d{4,17}$/.test(formData.chasisNo.trim())) {
            errors.chasisNo = 'Chasis No must be between 4 to 17 digits and contain no spaces';
        }

        if (!formData.regNo.trim()) {
            errors.regNo = 'Registration No is required';
        } else if (!/^\d{10,}$/.test(formData.regNo.trim())) {
            errors.regNo = 'Registration No must be at least 10 digits and contain no spaces';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };


    // Fxn to handle form submission
    const handleSubmit = (e) => {

        // e.preventDefault() prevents the default behavior of form submission, allowing you to handle the submission process in JavaScript code without the browser performing its default action.
        e.preventDefault();

        if (validateForm()) {
            // You can perform further actions if the form is valid, such as sending the form data to a server
            console.log('Termination Form submitted:', formData);
            // Reset form fields after submission
            setFormData({
                chasisNo: '',
                terminationDate: '',
                docUrl: '',
                regNo: ''
            });
            // Set success message
            setSuccessMessage('Termination Details Added successfully!');
            // Clear success message after 5 seconds
            setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
        } else {
            console.log('Form validation failed');
        }
    };

    return (
        <div className="termination-container">
            <h1 className="termination-heading">Hypothetication Termination</h1>
            <form onSubmit={handleSubmit} className="termination-form">
                <div className="form-group">
                    <label htmlFor="chasisNo">Chasis No :</label>
                    <input type="text"  className={formErrors.chasisNo ? "error-input" : ""} id="chasisNo" placeholder="Enter Chasis Number" name="chasisNo" value={formData.chasisNo} onChange={handleChange} />
                    {formErrors.chasisNo && <span className="error">{formErrors.chasisNo}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="terminationDate">Termination Date :</label>
                    <Calendar 
                        id="hpaFrom" 
                        name="hpaFrom" 
                        placeholder="Date(YYYY-MM-DD)"
                        value={formData.hpaFrom} 
                        onChange={handleChange} // Use handleDateChange for date change
                        showIcon 
                        dateFormat="yy-mm-dd" 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="docUrl">Document Url :</label>
                    <input type="text" id="docUrl" name="docUrl" placeholder="Enter Document Url" value={formData.docUrl} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="regNo">Registration No :</label>
                    <input type="text" id="regNo"  className={formErrors.regNo ? "error-input" : ""}  name="regNo" placeholder="Enter Registration Number" value={formData.regNo} onChange={handleChange} />
                    {formErrors.regNo && <span className="error">{formErrors.regNo}</span>}
                </div>
                <div className="button-group">
                    <button type="submit" className="submit-btn">Submit</button>
                </div>
            </form>
            {successMessage && <div className="success">{successMessage}</div>}
        </div>
    )
}
