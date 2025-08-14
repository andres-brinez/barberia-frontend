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
import { useDeleteClient } from '../../../core/hooks/useDeleteClient';

function Clients() {

    const error = null;

    const { clientes, setClientes, isLoading } = useGetClients();
    const { deleteClient } = useDeleteClient();

    const [loadingDelete, setLoadingDelete] = useState(false); // Estado para manejar la carga de eliminación
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

    const handleDelete = async (clientId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
            setLoadingDelete(true); // Inicia el estado de carga
            try {
                setIsDetailModalOpen(false);
                await deleteClient(clientId); // Llama al hook para eliminar el cliente
                setClientes(prevClientes => prevClientes.filter(cliente => cliente.id !== clientId)); // Elimina el cliente de la lista
                alert('Cliente eliminado con éxito!');
            } catch (error) {
                alert(`Error al eliminar el cliente: ${error.message}`);
            } finally {
                setLoadingDelete(false); // Finaliza el estado de carga
            }
        }
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
                    loadingData={isLoading}
                    loadingDelete={loadingDelete}
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