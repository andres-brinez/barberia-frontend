// src/components/Table/Table.jsx
import React from 'react';
import './Table.css';

const Table = ({ columns, data, renderRow, loading, error, emptyMessage }) => {

    if (loading) {
        return <div className="loading-message">Cargando datos...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    if (!data || data.length === 0) {
        return <div className="no-data-message">{emptyMessage || 'No hay datos para mostrar.'}</div>;
    }

    return (
        <div className="table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>{col.label}</th>
                        ))}
                        <th></th> {/* Columna para las acciones */}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => renderRow(item, index))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;