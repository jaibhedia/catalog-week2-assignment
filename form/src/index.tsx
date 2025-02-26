import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import CityModal from "./CityModal";
import ThemeSettings from "./ThemeSettings";
import "./index.css";

/** Data interfaces */
interface FormData {
  name: string;
  email: string;
  password: string;
  agreed: boolean;
  city: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  agreed?: string;
  city?: string;
}

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    agreed: false,
    city: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [cityModalOpen, setCityModalOpen] = useState<boolean>(false);

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
    if (!formData.agreed) return false;
    if (!formData.city) return false;
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
    if (!formData.agreed) {
      errors.agreed = "You must agree to the terms and conditions.";
    }
    if (!formData.city) {
      errors.city = "Please select a city.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name === "name") {
      let error = "";
      if (!value.trim()) error = "Name is required.";
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

  const handleCitySelect = (city: string) => {
    setFormData((prev) => ({ ...prev, city }));
    let error = "";
    if (!city) {
      error = "Please select a city.";
    }
    setFormErrors((prev) => ({ ...prev, city: error }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateOnSubmit()) {
      alert("Form submitted successfully!");
      console.log("Submitted form data:", formData);
      setFormData({
        name: "",
        email: "",
        password: "",
        agreed: false,
        city: "",
      });
      setFormErrors({});
    }
  };

  return (
    <div>
      <ThemeSettings />
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
          <div className="form-control">
            <label>City:</label>
            <div className="city-field">
              <span className="city-display">
                {formData.city || "No city selected"}
              </span>
              <button
                type="button"
                className="select-city-btn"
                onClick={() => setCityModalOpen(true)}
              >
                Select City
              </button>
            </div>
            {formErrors.city && <p className="error">{formErrors.city}</p>}
          </div>
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
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`submit-button ${isFormValid() ? "active" : "inactive"}`}
          >
            Submit
          </button>
        </form>
      </div>
      <CityModal
        isOpen={cityModalOpen}
        onClose={() => setCityModalOpen(false)}
        onSelect={handleCitySelect}
      />
    </div>
  );
};

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container not found");
}
const root = createRoot(container);
root.render(<App />);
