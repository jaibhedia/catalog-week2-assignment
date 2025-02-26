// import React, { useState } from "react";
// import { useThrottle } from "./useThrottle";
// import "./index.css";

// interface CityModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSelect: (city: string) => void;
// }

// const indianCities = [
//   "Mumbai",
//   "Delhi",
//   "Bengaluru",
//   "Hyderabad",
//   "Chennai",
//   "Kolkata",
//   "Pune",
//   "Jaipur",
//   "Ahmedabad",
//   "Surat",
// ];

// const CityModal: React.FC<CityModalProps> = ({ isOpen, onClose, onSelect }) => {
//   // Immediate search term updated on every keystroke
//   const [displayTerm, setDisplayTerm] = useState<string>("");
//   // Throttled term updates at most once every 500ms
//   const throttledTerm = useThrottle(displayTerm, 500);

//   if (!isOpen) return null;

//   const handleBackdropClick = () => onClose();
//   const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation();

//   const filteredCities = indianCities.filter((city) =>
//     city.toLowerCase().includes(throttledTerm.toLowerCase())
//   );

//   return (
//     <div className="city-modal-backdrop" onClick={handleBackdropClick}>
//       <div className="city-modal-content" onClick={handleModalClick}>
//         <h2>Select a City</h2>
//         <div className="city-modal-search">
//           <input
//             type="text"
//             placeholder="Search city..."
//             value={displayTerm}
//             onChange={(e) => setDisplayTerm(e.target.value)}
//           />
//         </div>
//         <div className="city-list">
//           {filteredCities.length > 0 ? (
//             filteredCities.map((city) => (
//               <div
//                 key={city}
//                 className="city-list-item"
//                 onClick={() => {
//                   onSelect(city);
//                   onClose();
//                 }}
//               >
//                 {city}
//               </div>
//             ))
//           ) : (
//             <div className="city-list-empty">No results found.</div>
//           )}
//         </div>
//         <button className="close-modal-btn" onClick={onClose}>
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CityModal;
import React, { useState } from "react";
import { useDebounce } from "./useDebounce"; // Import the debounce hook
import "./index.css";

interface CityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (city: string) => void;
}

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

const CityModal: React.FC<CityModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [displayTerm, setDisplayTerm] = useState<string>("");
  const debouncedTerm = useDebounce(displayTerm, 500);

  if (!isOpen) return null;

  const handleBackdropClick = () => onClose();
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation();
  const filteredCities = indianCities.filter((city) =>
    city.toLowerCase().includes(debouncedTerm.toLowerCase())
  );

  return (
    <div className="city-modal-backdrop" onClick={handleBackdropClick}>
      <div className="city-modal-content" onClick={handleModalClick}>
        <h2>Select a City</h2>
        <div className="city-modal-search">
          <input
            type="text"
            placeholder="Search city..."
            value={displayTerm}
            onChange={(e) => setDisplayTerm(e.target.value)}
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

export default CityModal;
