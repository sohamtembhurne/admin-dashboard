import React from 'react';
import { DeleteIcon } from './Icons';

const DeleteButton = ({ onClick, disabled, selectedRows, notifyDeleteMultiple }) => (
  <div>
    <button
      onClick={() => {
        onClick();
        notifyDeleteMultiple(selectedRows.length);
      }}
      disabled={disabled}
      className={`p-3 rounded ${
        disabled ? "cursor-not-allowed bg-gray-300" : "bg-red-500 text-white"
      }`}
    >
      <DeleteIcon />
    </button>
  </div>
);

export default DeleteButton;
