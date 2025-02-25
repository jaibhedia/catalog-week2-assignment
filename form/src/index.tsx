// src/index.tsx
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Validate the form fields
  const validate = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      errors.email = "Email is invalid.";
    }

    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Update form state on input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully!");
      // Reset form fields if needed
      setFormData({ name: "", email: "", password: "" });
      setFormErrors({});
    }
  };

  return (
    <div className="container">
      <h1>Form Validator</h1>
      <form onSubmit={handleSubmit} noValidate>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

// Find the container element
const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container not found");
}

// Create a root and render the App
const root = createRoot(container);
root.render(<App />);
