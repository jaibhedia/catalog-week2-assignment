import React, { useState } from "react";
import { createRoot } from "react-dom/client";
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

/** A simple list of Indian cities for the modal */
const indianCities = [
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Jaipur",
  "Ahmedabad",
  "Surat",
];

/** 
 * CityModal component with search functionality.
 * - isOpen: whether the modal is displayed
 * - onClose: function to close the modal
 * - onSelect: function to handle city selection
 */
interface CityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (city: string) => void;
}

const CityModal: React.FC<CityModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  if (!isOpen) return null;

  // Click outside modal content to close
  const handleBackdropClick = () => {
    onClose();
  };

  // Stop propagation so clicks inside modal don’t close it
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  // Filter the city list by the search term (case-insensitive)
  const filteredCities = indianCities.filter((city) =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="city-modal-backdrop" onClick={handleBackdropClick}>
      <div className="city-modal-content" onClick={handleModalClick}>
        <h2>Select a City</h2>
        {/* Search Bar */}
        <div className="city-modal-search">
          <input
            type="text"
            placeholder="Search city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="city-list">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <div
                key={city}
                className="city-list-item"
                onClick={() => {
                  onSelect(city);
                  onClose();
                }}
              >
                {city}
              </div>
            ))
          ) : (
            <div className="city-list-empty">No results found.</div>
          )}
        </div>
        <button className="close-modal-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

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

  /** Check if entire form is valid */
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
    // Must agree
    if (!formData.agreed) return false;
    // Must pick a city
    if (!formData.city) return false;
    return true;
  };

  /** Validate fields on final submit */
  const validateOnSubmit = (): boolean => {
    const errors: FormErrors = {};

    // Name
    if (!formData.name.trim()) {
      errors.name = "Name is required.";
    }
    // Email
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      errors.email = "Please enter a valid email address (e.g., test@gmail.com).";
    }
    // Password
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
    // Must agree
    if (!formData.agreed) {
      errors.agreed = "You must agree to the terms and conditions.";
    }
    // Must pick a city
    if (!formData.city) {
      errors.city = "Please select a city.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /** Handle changes for name, email, password, and agreed checkbox */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Real-time validation
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

  /** Called when user selects a city in the modal */
  const handleCitySelect = (city: string) => {
    setFormData((prev) => ({ ...prev, city }));
    // Real-time validation for city
    let error = "";
    if (!city) {
      error = "Please select a city.";
    }
    setFormErrors((prev) => ({ ...prev, city: error }));
  };

  /** Final form submission */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateOnSubmit()) {
      alert("Form submitted successfully!");
      console.log("Submitted form data:", formData);

      // Reset form
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

        {/* City: Instead of a dropdown, show selected city or placeholder + a button */}
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

      {/* City Modal with search bar */}
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
