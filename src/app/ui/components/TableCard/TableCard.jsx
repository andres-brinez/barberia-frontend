// src/components/ui/TableCard.jsx
import React from 'react';
import './TableCard.css'; // Su CSS específico
import SearchFilter from '../SearchFilter/SearchFilter';

const TableCard = ({ title, searchProps, children }) => {
    return (
        <div className="table-card">
            <div className="table-header-wrapper">
                <h2 className="table-section-title">{title}</h2>
                <SearchFilter
                    filterBy={searchProps.filterBy}
                    onFilterChange={searchProps.onFilterChange}
                    searchTerm={searchProps.searchTerm}
                    onSearchChange={searchProps.onSearchChange}
                    filterOptions={searchProps.filterOptions}
                />
            </div>
            {children}
        </div>
    );
};

export default TableCard;