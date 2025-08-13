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
import ClientDetailModal from '../../components/clients/ClientDetailModal/ClientDetailModal';

function Clients() {
    
    const error = null;

    const { clientes,setClientes, isLoading } = useGetClients();
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterBy, setFilterBy] = useState('Nombre');

    // Filtrar clientes según el término de búsqueda y el campo seleccionado
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
        navigate('/dashboard/clients/new');
    };

    const handleView = (userId) => {

        const selectedClient = clientes.find(client => client.id === userId);
        if (selectedClient) {
            handleOpenDetailModal(selectedClient);
        } else {
            alert('Cliente no encontrado');
        }
    };

    const handleEdit = (clientId) => {
        navigate(`/dashboard/clients/${clientId}/edit`);
    };

    const handleDelete = (clientId) => {
        console.log('Eliminar cliente con ID:', clientId);
    };

    const handleOpenDetailModal = (client) => {
        setSelectedClient(client);
        setIsDetailModalOpen(true);
    };

    const handleCloseDetailModal = () => {
        setIsDetailModalOpen(false);
        setSelectedClient(null);
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
            {selectedClient && (
                <ClientDetailModal
                    isOpen={isDetailModalOpen}
                    onClose={handleCloseDetailModal}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    clientData={selectedClient}
                />
            )}
        </div>
        
    );
}

export default Clients;