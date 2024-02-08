import { useState } from "react";
import './Addition.css';
import { Calendar } from 'primereact/calendar';
import { useNavigate } from 'react-router-dom';



export default function Addition() {

    const [formData, setFormData] = useState({
        chasisNo: '',
        engineNo: '',
        hpaFrom: null,
        hpaUpto: null,
        docUrl: '',
        regNo: ''
    });

    const [formErrors, setFormErrors] = useState({});
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();



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


    // fxn to handle form reset
    function handleReset() {
        return (
            setFormData({
                chasisNo: '',
                engineNo: '',
                hpaFrom: '',
                hpaUpto: '',
                docUrl: '',
                regNo: ''
            })
        )
    }


    // Fxn to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // You can perform further actions if the form is valid, such as sending the form data to a server
            console.log('Addition Form submitted:', formData);
            // Reset form fields after submission
            setFormData({
                chasisNo: '',
                engineNo: '',
                hpaFrom: '',
                hpaUpto: '',
                docUrl: '',
                regNo: ''
            });
            setModalMessage('Addition Form submitted successfully!');
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
                navigate('/'); // Redirect to the home page
            }, 4000);
        } else {
            setModalMessage('Something went wrong. Please check again.');
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
            }, 4000);
        }
    };

    function CustomModal({ message }) {
        return (
            <div className="modal">
                <div className="modal-content">
                    <p>{message}</p>
                </div>
            </div>
        );
    }


    return (
        <div className="addition-container">
            <h1 className="addition-heading">Hypothetication Addition</h1>
            <form onSubmit={handleSubmit} className="addition-form">
                <div className="form-group">
                    <label htmlFor="chasisNo">Chasis No :</label>
                    <input className={formErrors.chasisNo ? "error-input" : ""} type="text" id="chasisNo" placeholder="Enter Chasis Number" name="chasisNo" value={formData.chasisNo} onChange={handleChange} />
                    {formErrors.chasisNo && <span className="error">{formErrors.chasisNo}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="engineNo">Engine No :</label>
                    <input type="text" id="engineNo" name="engineNo" placeholder="Enter Engine Number" value={formData.engineNo} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="hpaFrom">HPA From :</label>
                    <Calendar
                        id="hpaFrom"
                        name="hpaFrom"
                        placeholder="Date(YYYY-MM-DD)"
                        value={formData.hpaFrom}
                        onChange={handleChange}
                        showIcon
                        dateFormat="yy-mm-dd"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="hpaUpto">HPA Upto:</label>
                    <Calendar
                        id="hpaUpto"
                        name="hpaUpto"
                        placeholder="Date(YYYY-MM-DD)"
                        value={formData.hpaUpto}
                        onChange={handleChange}
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
                    <input className={formErrors.regNo ? "error-input" : ""} type="text" id="regNo" name="regNo" placeholder="Enter Registration Number" value={formData.regNo} onChange={handleChange} />
                    {formErrors.regNo && <span className="error">{formErrors.regNo}</span>}
                </div>
                <div className="button-group">
                    <button type="submit" className="submit-btn">Submit</button>
                    <button type="button" onClick={handleReset} className="reset-btn">Reset</button>
                </div>
            </form>
            {showModal && <CustomModal message={modalMessage} />}
        </div>
    )
}
