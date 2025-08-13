import { useParams } from "react-router-dom";
import { useGetClientById } from "../../../core/hooks/useGetClient";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader/PageHeader";
import ClientForm from "../../components/clients/ClientForm/ClientForm";
import { useUpdateClient } from "../../../core/hooks/useUpdateClient";
import '../../styles/Messages.css';

const EditClient = () => {

    const [clientData, setClientData] = useState(null);

    const { getClientById } = useGetClientById();
    const { updateClient } = useUpdateClient();

    const { idClient } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false); // Estado para manejar la actualización

    const [fetchError, setFetchError] = useState(null);
    const [updateError, setUpdateError] = useState(null);


    // Obtener la información del cliente (api)
    useEffect(() => {
        const fetchClient = async () => {
            setLoading(true);
            setFetchError(null);
            try {
                const clientData = await getClientById(idClient); // Usa await aquí
                setClientData(clientData);


            } catch (error) {
                setFetchError(error.message);
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchClient(); // Llama a la función asíncrona
    }, [idClient]); // Asegúrate de que idClient esté en las dependencias

    const handleUpdateClient = async (updatedData) => {
        if (updatedData.realizaDeporte === false) {
            updatedData.deporteEspecifico = null;
        }
        if (updatedData.tieneArrugasProtuberancias === false) {
            updatedData.zonasArrugasProtuberancias = null;
        }
        if (updatedData.deseaDisimularRostro === false) {
            updatedData.zonasDisimular = null;
        }

        console.log(updatedData);
        setUpdateError(null); // Limpiar errores previos de actualización
        setIsUpdating(true); // Iniciar la actualización
        try {
            await updateClient(idClient, updatedData);
            alert('Cliente actualizado con éxito!');
            navigate('/dashboard/clients');
        } catch (error) {
            setUpdateError(error.message);
            console.log(error);
        } finally {
             setIsUpdating(false); // Finalizar la actualización
        }
    };

     if (loading) {
        return <div className="loading message-container"><div className="spinner"></div><p>Cargando información del cliente...</p></div>;
    }

    if (fetchError) {
        return <div className="error-message-container message-container"><p>Error al obtener la información del cliente: {fetchError}</p></div>;
    }

    if (!clientData) {
        return <div className="info message-container"><p>Cliente no encontrado.</p></div>;
    }


    return (
        <div className="app-page-container">
            <PageHeader
                title={`Editar Cliente: ${clientData.nombreCompleto}`}
                subtitle="Modifica la información existente del cliente"
                buttonText="Volver"
                onAddClick={() => navigate(-1)}
            />
            {/* 5. Se pasa la data obtenida de la API al componente del formulario */}
            <ClientForm
                initialData={clientData}
                onSubmit={handleUpdateClient}
                allowPhotoUpload={false} // Se desactiva la subida de fotos
                isUpdating={isUpdating}
            />

            {/* Muestra un mensaje de error de actualización en la UI */}
            {updateError && (
                <div className="error-message-container">
                    <p>Error al actualizar: {updateError}</p>
                </div>
            )}
            
            
        </div>
    )
};

export default EditClient;