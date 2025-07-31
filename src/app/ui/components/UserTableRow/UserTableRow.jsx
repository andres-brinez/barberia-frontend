// src/components/UserTableRow/UserTableRow.jsx
import React, { useState, useEffect, useRef } from 'react';
// import './UserTableRow.css'; // Puedes tener un CSS separado para la fila o incluirlo en Users.css
import { EllipsisVerticalIcon, EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

function UserTableRow({ user, onEdit, onDelete, onView }) {
  const [openDropdown, setOpenDropdown] = useState(false); // Estado para este dropdown específico
  const dropdownRef = useRef(null); // Ref para este dropdown específico

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

  const handleOptionsToggle = (e) => {
    e.stopPropagation(); // Evita que el clic se propague al documento y cierre inmediatamente
    setOpenDropdown(!openDropdown);
  };

  const handleActionClick = (actionFn, email, username = null) => {
    actionFn(email, username);
    // El setOpenDropdown(false) ya no es tan crítico aquí porque el `handleClickOutside` lo cerrará
    // Pero lo mantenemos para cierre inmediato tras la acción
    setOpenDropdown(false);
  };

  return (
    <tr key={user.email}> {/* Es buena práctica tener la key en el elemento mapeado */}
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>
        {/* Lógica para determinar el rol y la clase del badge */}
        <span className={`user-role-badge ${user.rol && user.rol.includes('ROLE_ADMIN') ? 'admin' : user.rol && user.rol.includes('ROLE_BARBER') ? 'barber' : 'user'}`}>
          {user.rol && user.rol.includes('ROLE_ADMIN') ? 'Administrador' : user.rol && user.rol.includes('ROLE_BARBER') ? 'Barbero' : 'Usuario'}
        </span>
      </td>
      <td>
        {/* Lógica para determinar el estado y la clase del badge */}
        <span className={`user-status-badge ${user.isActive === true ? 'active' : 'inactive'}`}>
          {user.isActive === true ? 'Activo' : 'Inactivo'}
        </span>
      </td>
      <td>{"2024-01-14"}</td> {/* Asumiendo un valor fijo o que lo obtienes de user.lastAccess */}
      <td className="actions-cell">
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
                // e.stopPropagation() ya se maneja en handleOptionsToggle para el botón principal
                handleActionClick(onDelete, user.email, user.username);
              }}>
                <TrashIcon className="dropdown-item-icon" />
                Eliminar
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

export default UserTableRow;