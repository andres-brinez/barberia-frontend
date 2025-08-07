// src/components/UserTableRow/UserTableRow.jsx
import './UserTableRow.css'; // Asegúrate de tener este archivo CSS para los estilos específicos de la fila
import OptionsDropdown from '../../OptionsDropdown/OptionsDropdown';

function UserTableRow({ user, onEdit, onDelete, onView }) {

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
        <OptionsDropdown user={user} onView={onView} onEdit={onEdit} onDelete={onDelete} />
      </td>
    </tr>
  );
}

export default UserTableRow;