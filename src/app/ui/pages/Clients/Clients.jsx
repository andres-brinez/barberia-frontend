// src/pages/Clients/Clients.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader/PageHeader';
import TableCard from '../../components/TableCard/TableCard';
import Table from '../../components/Table/Table';
import config from '../../../utils/config.json'; 
import './Clients.css';
import ClientTableRow from '../../components/clients/ClientTableRow';
import { useGetClients } from '../../../core/hooks/useGetClients';

function Clients() {
    // Datos de ejemplo para demostrar
    // const clientes = [
    //     { id: 1, nombreCompleto: 'Juan Pérez García', ocupación: 'Estudiante',  lastVisit: '2024-01-15', estadoCivil: 'Soltero', edad: '20', },
    //     { id: 2, nombreCompleto: 'María García López', ocupación: 'Ingeniero', edad: '9', lastVisit: '2024-01-10',  estadoCivil: 'Casado', },
    //     { id: 3, nombreCompleto: 'Carlos López Martínez',  ocupación: 'Profesor', edad: '02', lastVisit: '2023-12-20',  estadoCivil: 'Soltero', },
    // ];
    const error = null;

    const { clientes,setClientes, isLoading } = useGetClients();

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBy, setFilterBy] = useState('Nombre');

    const filteredClients = clientes.filter(cliente => {
        if (!searchTerm) return true;
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        let filterValue = '';

        if (filterBy === 'Nombre') {
            filterValue = cliente.nombreCompleto?.toLowerCase() || '';
        } else if (filterBy === 'Ocupación') {
            filterValue = cliente.ocupacion?.toLowerCase() || '';
        }
        else if (filterBy === "Edad") {
            filterValue = cliente.edad?.toString() || '';
        }
        else if (filterBy === "Estado Civil") {
            filterValue = cliente.estadoCivil?.toLowerCase() || '';
        }
        
        return filterValue.includes(lowerCaseSearchTerm);
    });

    const handleAddClient = () => {
        navigate('/clients/new');
    };

    const handleView = (userEmail) => {
        console.log('Ver detalles del cliente con ID:', userEmail);

    };

    const handleEdit = (clientId) => {
        console.log('Editar cliente con ID:', clientId);
    };

    const handleDelete = (clientId) => {
        console.log('Eliminar cliente con ID:', clientId);
    };

    const clientColumns = config.clientsColumns || [];

    const clientFilterOptions = config.filterOptionsClient || [];

    return (
        <div className="app-page-container">
            <PageHeader
                title="Clientes"
                subtitle="Gestiona la información de tus clientes"
                buttonText="Agregar Cliente"
                onAddClick={handleAddClient}
            />

            <TableCard
                title="Lista de Clientes"
                searchProps={{
                    filterBy: filterBy,
                    onFilterChange: (e) => setFilterBy(e.target.value),
                    searchTerm: searchTerm,
                    onSearchChange: (e) => setSearchTerm(e.target.value),
                    filterOptions: clientFilterOptions,
                }}
            >
                <Table
                    columns={clientColumns}
                    data={filteredClients}
                    loading={isLoading}
                    error={error}
                    emptyMessage="No se encontraron clientes que coincidan con la búsqueda."
                    renderRow={(client) => (
                        <ClientTableRow
                            key={client.id}
                            client={client}
                            onEdit={() => handleEdit(client.id)}
                            onDelete={() => handleDelete(client.id)}
                            onView={() => handleView(client.id)}
                            
                        />
                    )}
                />
            </TableCard>
        </div>
    );
}

export default Clients;