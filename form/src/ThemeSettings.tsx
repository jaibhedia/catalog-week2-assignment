import React, { useState } from "react";
import "./index.css";

const ThemeSettings: React.FC = () => {
  const [primaryColor, setPrimaryColor] = useState<string>("#cd7092");

  const handlePrimaryColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setPrimaryColor(newColor);
    document.documentElement.style.setProperty("--primary-color", newColor);
  };

  return (
    <div className="theme-settings">
      <label htmlFor="primaryColor">Primary Color:</label>
      <input
        id="primaryColor"
        type="color"
        value={primaryColor}
        onChange={handlePrimaryColorChange}
      />
    </div>
  );
};

export default ThemeSettings;
