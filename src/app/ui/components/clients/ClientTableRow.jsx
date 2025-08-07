// src/components/clients/ClientTableRow.jsx
import React from 'react';
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import OptionsDropdown from '../OptionsDropdown/OptionsDropdown';

const ClientTableRow = ({ client, onEdit, onDelete, onView }) => {
    return (
        <tr>
            <td>{client.nombreCompleto}</td>
            <td>{client.edad}</td>
            <td>{client.ocupacion}</td>
            <td>{client.estadoCivil}</td>
            {/* <td>{client.lastVisit}  </td> */}
            <td>2023-12-20</td>

            <td className="actions-cell">
                <OptionsDropdown user={client} onView={onView} onEdit={onEdit} onDelete={onDelete} />
            </td>
        </tr>
    );
};

export default ClientTableRow;