import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewClient.css';
import { useCreateCliente } from '../../../core/hooks/useCreateCliente';
import PageHeader from '../../components/PageHeader/PageHeader';
import ClientForm from '../../components/clients/ClientForm/ClientForm';
const NewClient = () => {
    
    const navigate = useNavigate();
    const { createClient } = useCreateCliente();

    const [formData,] = useState({
        // Información Personal
        nombreCompleto: '',
        edad: '',
        ocupacion: '',
        estadoCivil: '',
        personalidad: '',
        gustosRopa: '',
        // Medidas del Cabello (cm)
        medidas: {
            frente: '',
            lateral1: '',
            nuca: '',
            lateral2: '',
            barba: '',
            longitudGeneral: ''
        },
        // Hábitos y Preferencias
        realizaDeporte: false, // Por defecto en 'No'
        deporteEspecifico: '',
        tiempoPeinarseMin: '',
        tiempoEntreCortesDias: '',
        corteReferencia: '',
        // Preferencias de Estilo
        longitudSuperior: '',
        tonoDesvanecido: '',
        // Características Físicas
        tipoCraneo: '',
        deseaDisimularRostro: false, // Por defecto en 'No'
        zonasDisimular: null,
        tieneArrugasProtuberancias: false, // Por defecto en 'No'
        zonasArrugasProtuberancias: null,
        tienePlagiosefalia: false, // Por defecto en 'No'
        // Características del Cabello
        texturaCabello: '',
        densidadCabello: '',
        tipoRostro: '',
        tipoPerfil: '',
        // Recomendaciones Profesionales
        esCorteCorrectivo: false, // Por defecto en 'No'
        productoMantenimiento: ''
    });

    const handleCreateClient = (formData,clientPhotos) => {
        
        const formDataSend = new FormData();

        // Crear un objeto procesado con los valores en mayúsculas y sin tildes
        const processedData = {
            ...formData,
            tipoCraneo: formData.tipoCraneo.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
            tipoRostro: formData.tipoRostro.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
        };

        // Agregar el objeto procesado al FormData
        formDataSend.append('clientProfileDto', JSON.stringify(processedData));

        // Agregar las fotos del cliente
        clientPhotos.forEach((photo) => {
            formDataSend.append('imageFiles', photo.file);
        });

        try {
            createClient(formDataSend);
            console.log(formDataSend);
            alert('Cliente creado con éxito');
         navigate('/dashboard/clients');
        } catch (error) {
            console.error('Error al crear el cliente:', error.message);
            alert('Error al crear el cliente: ' + error.message);
        }
    };
    

    return (
         <div className="app-page-container">
            <PageHeader
                title="Nuevo Cliente"
                subtitle="Agrega un nuevo cliente a tu base de datos"
                buttonText="Volver"
                onAddClick={() => navigate(-1)}
            />
            
            {/* Se pasa la función `handleCreateClient` como prop llamada `onSubmit` */}
            <ClientForm initialData={formData} onSubmit={handleCreateClient} allowPhotoUpload={true} />
        </div>
    );
};
export default NewClient;