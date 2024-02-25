import React, { useState } from 'react';
import './DropDown.css'; // Import your CSS file

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="dropdown-container">
      <select
        value={selectedOption}
        onChange={(e) => handleSelect(e.target.value)}
        className={`custom-dropdown ${selectedOption !== '' ? 'expanded' : ''}`}
      >
        <option value="" disabled>All</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
