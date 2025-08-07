// src/components/layout/PageHeader.jsx
import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import './PageHeader.css'; // Su CSS específico


/* 

Este componente genérico se encargará de renderizar el encabezado y el botón, 
*/

const PageHeader = ({ title, subtitle, buttonText, onAddClick }) => {
    return (
        <div className="page-header">
            <div>
                <h1 className="page-title">{title}</h1>
                <p className="page-subtitle">{subtitle}</p>
            </div>
            <button className="add-button" onClick={onAddClick}>
                <PlusIcon className="add-button-icon" />
                {buttonText}
            </button>
        </div>
    );
};

export default PageHeader;