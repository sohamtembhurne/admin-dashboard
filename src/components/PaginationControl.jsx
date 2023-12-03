import React from 'react';

const PaginationControl = ({ label, onClick, disabled, active, className }) => (
  <button
    className={`px-2 py-1 mx-1 border ${
      active ? "bg-blue-100 text-blue-500" : disabled ? "bg-gray-200 text-gray-500" : ""
    } ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {label}
  </button>
);

export default PaginationControl;
