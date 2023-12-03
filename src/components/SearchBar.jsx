import React from 'react';
import { SearchIcon } from './Icons';

const SearchBar = ({ searchTerm, onSearchTermChange, onSearch, onKeyDown }) => (
  <div className="mb-4 flex">
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => onSearchTermChange(e.target.value)}
      onKeyDown={onKeyDown}
      className="search-icon px-4 py-2 border border-gray-300 rounded-l-lg"
    />
    <button onClick={onSearch} className="px-4 py-2 bg-blue-500 text-white rounded-r-lg">
      <SearchIcon />
    </button>
  </div>
);

export default SearchBar;
