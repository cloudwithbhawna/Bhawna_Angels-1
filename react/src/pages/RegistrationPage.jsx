import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import volunteerApi from "../api/volunteerApi"; // Adjust the path as needed
import axios from "axios"; // Ensure axios is installed: npm install axios
import "bootstrap/dist/css/bootstrap.min.css";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullname: "",
    dob: "",
    gender: "Female",
    mobilenumber: "",
    email: "",
    address: "",
    house_no_street: "",
    city: "",
    state: "",
    pincode: "",
    emergency_name: "",
    emergency_relationship: "",
    emergency_mobile: "",
    consent: false,
    aadhar: null,
    passport_photo: null,
  });

  // Validate required fields for each step without using alert boxes
  const validateStep = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;
    const pincodeRegex = /^\d{6}$/;
    const currentDate = new Date();
    let stepErrors = {};

    if (step === 1) {
      if (!formData.fullname.trim()) {
        stepErrors.fullname = "Full name is required.";
      }
      if (!formData.dob) {
        stepErrors.dob = "Date of Birth is required.";
      } else {
        const dobDate = new Date(formData.dob);
        if (dobDate > currentDate) {
          stepErrors.dob = "Date of Birth cannot be in the future.";
        }
      }
      if (!formData.mobilenumber.trim()) {
        stepErrors.mobilenumber = "Mobile number is required.";
      } else if (!mobileRegex.test(formData.mobilenumber)) {
        stepErrors.mobilenumber = "Enter a valid 10-digit mobile number.";
      }
      if (!formData.email.trim()) {
        stepErrors.email = "Email is required.";
      } else if (!emailRegex.test(formData.email)) {
        stepErrors.email = "Enter a valid email address.";
      }
      if (!formData.address.trim()) {
        stepErrors.address = "Address is required.";
      }
      if (!formData.house_no_street.trim()) {
        stepErrors.house_no_street = "House No & Street is required.";
      }
      if (!formData.city.trim()) {
        stepErrors.city = "City is required.";
      }
      if (!formData.state.trim()) {
        stepErrors.state = "State is required.";
      }
      if (!formData.pincode.trim()) {
        stepErrors.pincode = "Pincode is required.";
      } else if (!pincodeRegex.test(formData.pincode)) {
        stepErrors.pincode = "Enter a valid 6-digit pincode.";
      }
    }

    if (step === 2) {
      if (!formData.emergency_name.trim()) {
        stepErrors.emergency_name = "Emergency contact name is required.";
      }
      if (!formData.emergency_relationship.trim()) {
        stepErrors.emergency_relationship = "Relationship is required.";
      }
      if (!formData.emergency_mobile.trim()) {
        stepErrors.emergency_mobile = "Emergency mobile number is required.";
      } else if (!mobileRegex.test(formData.emergency_mobile)) {
        stepErrors.emergency_mobile = "Enter a valid 10-digit mobile number.";
      }
      if (!formData.aadhar) {
        stepErrors.aadhar = "Aadhar document is required.";
      } else {
        const aadharFile = formData.aadhar;
        const validAadharTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!validAadharTypes.includes(aadharFile.type)) {
          stepErrors.aadhar = "Aadhar file must be JPEG, PNG, or PDF.";
        }
        if (aadharFile.size > 2 * 1024 * 1024) {
          stepErrors.aadhar = "Aadhar file must be less than 2MB.";
        }
      }
      if (!formData.passport_photo) {
        stepErrors.passport_photo = "Passport photo is required.";
      } else {
        const passportPhoto = formData.passport_photo;
        const validPhotoTypes = ['image/jpeg', 'image/png'];
        if (!validPhotoTypes.includes(passportPhoto.type)) {
          stepErrors.passport_photo = "Passport photo must be JPEG or PNG.";
        }
        if (passportPhoto.size > 1 * 1024 * 1024) {
          stepErrors.passport_photo = "Passport photo must be less than 1MB.";
        }
      }
    }

    if (step === 3) {
      if (!formData.consent) {
        stepErrors.consent = "Consent is required.";
      }
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  // Update state for text and checkbox inputs and clear errors on change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Update state for file inputs and clear errors on change
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Navigation helpers
  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
      setErrors({});
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
    setErrors({});
  };

  // Helper to load the Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
        return resolve();
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve();
      document.body.appendChild(script);
    });
  };

  // Initialize Razorpay payment
  const handlePayment = async () => {
    await loadRazorpayScript();
    try {
      const amount = 300; // Fixed amount of Rs 300
      const response = await axios.post("http://localhost:3000/api/createOrder", {
        amount,
        currency: "INR",
      });
      const { order } = response.data;

      const options = {
        key: "rzp_live_b4EYdELZMb2OrT", // Replace with your actual Razorpay Key ID
        amount: order.amount,
        currency: order.currency,
        name: "Bhawna Angels",
        description: "Volunteer Registration Fee",
        order_id: order.id,
        handler: async function (paymentResponse) {
          console.log("Payment response:", paymentResponse);
          try {
            const verifyResponse = await axios.post("http://localhost:3000/api/verifyPayment", {
              ...paymentResponse,
            });
            if (verifyResponse.data.success) {
              alert("Payment Successful!");
              navigate("/");
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error("Verification error", error);
            alert("Error verifying payment");
          }
        },
        prefill: {
          name: formData.fullname,
          email: formData.email,
          contact: formData.mobilenumber,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error in payment creation", error);
      alert("Payment initiation failed. Please try again.");
    }
  };

  // Submit handler to register then trigger payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await volunteerApi.createVolunteer(data);
      alert("Registration Successful! Your Volunteer ID is: " + response.volunteerId);
      handlePayment();
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary">Volunteer Registration</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <h4>Step 1: Personal Details</h4>
            <div className="mb-2">
              <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                className="form-control"
                onChange={handleChange}
                required
              />
              {errors.fullname && <small className="text-danger">{errors.fullname}</small>}
            </div>
            <div className="mb-2">
              <input
                type="date"
                name="dob"
                className="form-control"
                onChange={handleChange}
                required
              />
              {errors.dob && <small className="text-danger">{errors.dob}</small>}
            </div>
            <div className="mb-2">
              <input
                type="text"
                name="gender"
                className="form-control"
                value="Female"
                disabled
                required
              />
            </div>
            <div className="mb-2">
              <input
                type="tel"
                name="mobilenumber"
                placeholder="Mobile Number"
                className="form-control"
                onChange={handleChange}
                required
              />
              {errors.mobilenumber && <small className="text-danger">{errors.mobilenumber}</small>}
            </div>
            <div className="mb-2">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control"
                onChange={handleChange}
                required
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>
            <div className="mb-2">
              <input
                type="text"
                name="address"
                placeholder="Address"
                className="form-control"
                onChange={handleChange}
                required
              />
              {errors.address && <small className="text-danger">{errors.address}</small>}
            </div>
            <div className="mb-2">
              <input
                type="text"
                name="house_no_street"
                placeholder="House No & Street"
                className="form-control"
                onChange={handleChange}
                required
              />
              {errors.house_no_street && <small className="text-danger">{errors.house_no_street}</small>}
            </div>
            <div className="mb-2">
              <input
                type="text"
                name="city"
                placeholder="City"
                className="form-control"
                onChange={handleChange}
                required
              />
              {errors.city && <small className="text-danger">{errors.city}</small>}
            </div>
            <div className="mb-2">
              <input
                type="text"
                name="state"
                placeholder="State"
                className="form-control"
                onChange={handleChange}
                required
              />
              {errors.state && <small className="text-danger">{errors.state}</small>}
            </div>
            <div className="mb-2">
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                className="form-control"
                onChange={handleChange}
                required
              />
              {errors.pincode && <small className="text-danger">{errors.pincode}</small>}
            </div>
            <button type="button" className="btn btn-primary" onClick={nextStep}>
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h4>Step 2: Emergency Contact & Documents</h4>
            <div className="mb-2">
              <input
                type="text"
                name="emergency_name"
                placeholder="Emergency Contact Name"
                className="form-control"
                onChange={handleChange}
                required
              />
              {errors.emergency_name && <small className="text-danger">{errors.emergency_name}</small>}
            </div>
            <div className="mb-2">
              <input
                type="text"
                name="emergency_relationship"
                placeholder="Relationship"
                className="form-control"
                onChange={handleChange}
                required
              />
              {errors.emergency_relationship && <small className="text-danger">{errors.emergency_relationship}</small>}
            </div>
            <div className="mb-2">
              <input
                type="tel"
                name="emergency_mobile"
                placeholder="Emergency Mobile"
                className="form-control"
                onChange={handleChange}
                required
              />
              {errors.emergency_mobile && <small className="text-danger">{errors.emergency_mobile}</small>}
            </div>
            <div className="mb-2">
              <label>Aadhar Card Upload:</label>
              <input
                type="file"
                name="aadhar"
                className="form-control"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                required
              />
              {errors.aadhar && <small className="text-danger">{errors.aadhar}</small>}
            </div>
            <div className="mb-2">
              <label>Passport Photo Upload:</label>
              <input
                type="file"
                name="passport_photo"
                className="form-control"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
              {errors.passport_photo && <small className="text-danger">{errors.passport_photo}</small>}
            </div>
            <div>
              <button type="button" className="btn btn-secondary me-2" onClick={prevStep}>
                Back
              </button>
              <button type="button" className="btn btn-primary" onClick={nextStep}>
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h4>Step 3: Consent & Submit</h4>
            <div className="mb-2">
              <label>
                <input
                  type="checkbox"
                  name="consent"
                  className="me-2"
                  onChange={handleChange}
                  required
                />
                I confirm that I am volunteering for Bhawna Angels.
              </label>
              {errors.consent && <small className="text-danger">{errors.consent}</small>}
            </div>
            <div className="mt-3">
              <button type="button" className="btn btn-secondary me-2" onClick={prevStep}>
                Back
              </button>
              <button type="submit" className="btn btn-success">
                Submit & Pay
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default RegistrationPage;