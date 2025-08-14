// src/components/common/Select.jsx
import React from 'react';
import './Select.css';

const Select = ({ id, name, value, onChange, options, placeholder,isRequired }) => {
    return (
        <div className="select-container">
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className="custom-select"
                required={isRequired}
            >
                {/* Opción por defecto/placeholder */}
                <option value="" disabled hidden>{placeholder}</option>
                {/* Mapeo de las opciones */}
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
            <div className="select-arrow"></div>
        </div>
    );
};

export default Select;