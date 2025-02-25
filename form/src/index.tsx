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

  const isFormValid = (): boolean => {
    if (!formData.name.trim()) return false;
    if (!formData.email.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      return false;
    }
    if (!formData.password) return false;
    if (formData.password.length < 8) return false;
    if (!/[A-Z]/.test(formData.password)) return false;
    if (!/[a-z]/.test(formData.password)) return false;
    if (!/[^A-Za-z0-9]/.test(formData.password)) return false;
    return true;
  };

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

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Real-time validation for each field
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
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateOnSubmit()) {
      alert("Form submitted successfully!");
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
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
          {formErrors.name && <p className="error">{formErrors.name}</p>}
        </div>
        <div className="form-control">
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} />
          {formErrors.email && <p className="error">{formErrors.email}</p>}
        </div>
        <div className="form-control">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
          {formErrors.password && <p className="error">{formErrors.password}</p>}
        </div>
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
