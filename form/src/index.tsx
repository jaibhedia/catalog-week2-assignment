import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

interface FormData {
  name: string;
  email: string;
  password: string;
  agreed: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  agreed?: string;
}

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    agreed: false,
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Check if entire form is valid
  const isFormValid = (): boolean => {
    if (!formData.name.trim()) return false;
    if (
      !formData.email.trim() ||
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)
    ) {
      return false;
    }
    if (!formData.password) return false;
    if (formData.password.length < 8) return false;
    if (!/[A-Z]/.test(formData.password)) return false;
    if (!/[a-z]/.test(formData.password)) return false;
    if (!/[^A-Za-z0-9]/.test(formData.password)) return false;
    // Must agree to T&C
    if (!formData.agreed) return false;

    return true;
  };

  // Validate fields on final submit
  const validateOnSubmit = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required.";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      errors.email = "Please enter a valid email address (e.g., test@gmail.com).";
    }
    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    } else if (!/[A-Z]/.test(formData.password)) {
      errors.password = "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(formData.password)) {
      errors.password = "Password must contain at least one lowercase letter.";
    } else if (!/[^A-Za-z0-9]/.test(formData.password)) {
      errors.password = "Password must contain at least one special character.";
    }
    if (!formData.agreed) {
      errors.agreed = "You must agree to the terms and conditions.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle real-time input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Basic real-time validation
    if (name === "name") {
      let error = "";
      if (!value.trim()) {
        error = "Name is required.";
      }
      setFormErrors((prev) => ({ ...prev, name: error }));
    } else if (name === "email") {
      let error = "";
      if (!value.trim()) {
        error = "Email is required.";
      } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
        error = "Please enter a valid email address (e.g., test@gmail.com).";
      }
      setFormErrors((prev) => ({ ...prev, email: error }));
    } else if (name === "password") {
      let error = "";
      if (!value) {
        error = "Password is required.";
      } else if (value.length < 8) {
        error = "Password must be at least 8 characters long.";
      } else if (!/[A-Z]/.test(value)) {
        error = "Password must contain at least one uppercase letter.";
      } else if (!/[a-z]/.test(value)) {
        error = "Password must contain at least one lowercase letter.";
      } else if (!/[^A-Za-z0-9]/.test(value)) {
        error = "Password must contain at least one special character.";
      }
      setFormErrors((prev) => ({ ...prev, password: error }));
    } else if (name === "agreed") {
      let error = "";
      if (!checked) {
        error = "You must agree to the terms and conditions.";
      }
      setFormErrors((prev) => ({ ...prev, agreed: error }));
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateOnSubmit()) {
      alert("Form submitted successfully!");
      // Reset form
      setFormData({ name: "", email: "", password: "", agreed: false });
      setFormErrors({});
    }
  };

  return (
    <div className="container">
      <h1>Form Validator</h1>
      <form onSubmit={handleSubmit} noValidate>
        {/* Name */}
        <div className="form-control">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {formErrors.name && <p className="error">{formErrors.name}</p>}
        </div>

        {/* Email */}
        <div className="form-control">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {formErrors.email && <p className="error">{formErrors.email}</p>}
        </div>

        {/* Password */}
        <div className="form-control">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {formErrors.password && <p className="error">{formErrors.password}</p>}
        </div>

        {/* Terms & Conditions */}
        <div className="form-control">
          <label htmlFor="agreed">
            <input
              type="checkbox"
              id="agreed"
              name="agreed"
              checked={formData.agreed}
              onChange={handleChange}
            />
            I agree to the terms and conditions
          </label>
          {formErrors.agreed && <p className="error">{formErrors.agreed}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isFormValid()}
          className={`submit-button ${isFormValid() ? "active" : "inactive"}`}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container not found");
}
const root = createRoot(container);
root.render(<App />);
