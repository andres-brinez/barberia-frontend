import React, { useState, useEffect, useRef } from 'react';
import './OptionsDropdown.css'; // Asegúrate de tener este archivo CSS para los estilos del dropdown
import { EllipsisVerticalIcon, EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
const OptionsDropdown = ({ user, onView, onEdit, onDelete }) => {
    const dropdownRef = useRef(null);
    const [openDropdown, setOpenDropdown] = useState(false);
    const handleOptionsToggle = () => {
        setOpenDropdown(!openDropdown);
    };
    const handleActionClick = (action, id) => {
        action(id);
        setOpenDropdown(false); // Cierra el dropdown después de hacer clic en una opción
    };

      // Manejar clics fuera del dropdown para cerrarlo
  useEffect(() => {
    
    const handleClickOutside = (event) => {
      // Si el clic no fue dentro de este dropdown, ciérralo
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
    return (
        <div className="options-dropdown-wrapper" ref={dropdownRef}>
            <button
                className="options-button"
                onClick={handleOptionsToggle}
            >
                <EllipsisVerticalIcon className="ellipsis-icon" />
            </button>
            {openDropdown && (
                <div className="dropdown-menu">
                    <button className="dropdown-item" onClick={() => handleActionClick(onView, user.email)}>
                        <EyeIcon className="dropdown-item-icon" />
                        Ver
                    </button>
                    <button className="dropdown-item" onClick={() => handleActionClick(onEdit, user.email)}>
                        <PencilSquareIcon className="dropdown-item-icon" />
                        Editar
                    </button>
                    <button className="dropdown-item delete-item" onClick={() => {
                        handleActionClick(onDelete, user.email);
                    }}>
                        <TrashIcon className="dropdown-item-icon" />
                        Eliminar
                    </button>
                </div>
            )}
        </div>
    );
};
export default OptionsDropdown;