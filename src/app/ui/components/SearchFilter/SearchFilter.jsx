// src/components/SearchFilter/SearchFilter.jsx
import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import './SearchFilter.css'; // Asegúrate de crear este archivo para los estilos

const SearchFilter = ({ filterBy, onFilterChange, searchTerm, onSearchChange, filterOptions }) => {
    return (
        <div className="search-container">
            <div className="filter-select">
                <select value={filterBy} onChange={onFilterChange}>
                    {filterOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
            <div className="search-input-wrapper">
                <MagnifyingGlassIcon className="search-icon" />
                <input
                    type="text"
                    placeholder={`Buscar por ${filterBy.toLowerCase()}...`}
                    value={searchTerm}
                    onChange={onSearchChange}
                />
            </div>
        </div>
    );
};

export default SearchFilter;