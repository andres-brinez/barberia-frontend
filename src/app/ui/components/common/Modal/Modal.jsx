// src/components/common/Modal.jsx
import React from 'react';
import './Modal.css';

// Componente genérico de modal que se puede reutilizar en cualquier parte de la aplicación
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    // Previene que el evento de clic en el contenido cierre el modal
    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={handleContentClick}>
                {children}
            </div>
        </div>
    );
};

export default Modal;