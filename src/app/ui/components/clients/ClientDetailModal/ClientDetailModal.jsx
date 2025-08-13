// src/components/clients/ClientDetailModal.jsx
import React, { useState } from 'react';
import { XMarkIcon, PencilIcon, TrashIcon, MagnifyingGlassPlusIcon } from '@heroicons/react/24/outline';
import './ClientDetailModal.css';
import Modal from '../../common/Modal/Modal';

const ClientDetailModal = ({ isOpen, onClose, clientData }) => {
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    if (!clientData) {
        return null;
    }

    const handlePhotoClick = (photoUrl) => {
        setSelectedPhoto(photoUrl);
    };

    const handleClosePhoto = () => {
        setSelectedPhoto(null);
    };

    // Función para mostrar "No disponible" si el dato no existe o es nulo
    const renderValue = (value) => {
        return value ? value : 'No disponible';
    };

    // Función para manejar valores booleanos
    const renderBoolean = (value) => {
        if (value === true) return 'Sí';
        if (value === false) return 'No';
        return 'No disponible';
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="client-detail-content">
                {/* Encabezado del modal */}
                <div className="modal-header">
                    <h2 className="modal-title">Perfil del cliente</h2>
                    <div className="modal-actions">
                        <button className="btn-edit">
                            <PencilIcon className="icon" /> Editar
                        </button>
                        <button className="btn-delete">
                            <TrashIcon className="icon" /> Eliminar
                        </button>
                        <button className="btn-close" onClick={onClose}>
                            <XMarkIcon className="icon" />
                        </button>
                    </div>
                </div>

                <div className="modal-body">
                    {/* <div className="client-main-info">   
                        <div className="client-header-text">
                            <h3 className="client-name">{renderValue(clientData.nombreCompleto)}</h3>
                            <p className="client-subtitle">{renderValue(clientData.edad)} años • {renderValue(clientData.ocupacion)}</p>
                            <span className="client-status active">Activo</span>
                        </div>
                    </div> */}

                    <div className="detail-grid">
                        {/* Información de Contacto */}
                        <div className="detail-section-card">
                            <h4 className="section-title">Información principal</h4>
                            <p><strong>Nombre:</strong> {renderValue(clientData.nombreCompleto)}</p>
                            <p><strong>Edad:</strong> {renderValue(clientData.edad)} años</p>
                            <p><strong>Ocupación:</strong> {renderValue(clientData.ocupacion)}</p>
                            <p><strong>Última visita:</strong> {renderValue(clientData.ultimaVisita)}</p>
                        </div>
                        
                        {/* Fotos del Cliente */}
                        <div className="detail-section-card photos-section">
                            <h4 className="section-title">Fotos del Cliente</h4>
                            <div className="client-photos-preview">
                                {clientData.urlsImagenesCortes && clientData.urlsImagenesCortes.length > 0 ? (
                                    clientData.urlsImagenesCortes.map((url, index) => (
                                        <div key={index} className="photo-thumbnail" onClick={() => handlePhotoClick(url)}>
                                            <img src={url} alt={`Foto del cliente ${index + 1}`} />
                                            <div className="zoom-overlay">
                                                <MagnifyingGlassPlusIcon className="zoom-icon" />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="no-photos-message">No hay fotos asociadas.</p>
                                )}
                            </div>
                        </div>

                        {/* Información Personal */}
                        <div className="detail-section-card full-width">
                            <h4 className="section-title">Información Personal</h4>
                            <div className="info-subsection-grid">
                                <div>
                                    <p><strong>Estado civil:</strong> {renderValue(clientData.estadoCivil)}</p>
                                    <p><strong>Personalidad:</strong> {renderValue(clientData.personalidad)}</p>
                                </div>
                                <div>
                                    <p><strong>Estilo de ropa:</strong> {renderValue(clientData.gustosRopa)}</p>
                                    <p><strong>Ocupación:</strong> {renderValue(clientData.ocupacion)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Medidas del Cabello */}
                        <div className="detail-section-card full-width">
                            <h4 className="section-title">Medidas del Cabello (cm)</h4>
                            {clientData.medidas ? (
                                <div className="info-subsection-grid">
                                    <div>
                                        <p><strong>Frente:</strong> {renderValue(clientData.medidas.frente)} cm</p>
                                        <p><strong>Lateral 1:</strong> {renderValue(clientData.medidas.lateral1)} cm</p>
                                        <p><strong>Nuca:</strong> {renderValue(clientData.medidas.nuca)} cm</p>
                                    </div>
                                    <div>
                                        <p><strong>Lateral 2:</strong> {renderValue(clientData.medidas.lateral2)} cm</p>
                                        <p><strong>Barba:</strong> {renderValue(clientData.medidas.barba)} cm</p>
                                        <p><strong>Longitud general:</strong> {renderValue(clientData.medidas.longitudGeneral)} cm</p>
                                    </div>
                                </div>
                            ) : (
                                <p className="no-data-message">No hay medidas registradas.</p>
                            )}
                        </div>

                        {/* Hábitos y Preferencias */}
                        <div className="detail-section-card full-width">
                            <h4 className="section-title">Hábitos y Preferencias</h4>
                            <div className="info-subsection-grid">
                                <div>
                                    <p><strong>Realiza deporte:</strong> {renderBoolean(clientData.realizaDeporte)}</p>
                                    {clientData.realizaDeporte && <p><strong>Deporte:</strong> {renderValue(clientData.deporteEspecifico)}</p>}
                                </div>
                                <div>
                                    <p><strong>Tiempo para peinarse:</strong> {renderValue(clientData.tiempoPeinarseMin)} min</p>
                                    <p><strong>Tiempo entre cortes:</strong> {renderValue(clientData.tiempoEntreCortesDias)} días</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <p><strong>Corte de referencia</strong></p>
                                <div className="detail-note">{renderValue(clientData.corteReferencia)}</div>
                            </div>
                        </div>

                        {/* Preferencias de Estilo */}
                        <div className="detail-section-card full-width">
                            <h4 className="section-title">Preferencias de Estilo</h4>
                            <div className="info-subsection-grid">
                                <div>
                                    <p><strong>Longitud superior:</strong> {renderValue(clientData.longitudSuperior)}</p>
                                </div>
                                <div>
                                    <p><strong>Tono desvanecido:</strong> {renderValue(clientData.tonoDesvanecido)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Características Físicas y del Cabello */}
                        <div className="detail-section-card full-width">
                            <h4 className="section-title">Características Físicas</h4>
                            <div className="info-subsection-grid">
                                <div><p><strong>Tipo de cráneo:</strong> {renderValue(clientData.tipoCraneo)}</p>
                                    <p><strong>Tipo de rostro:</strong> {renderValue(clientData.tipoRostro)}</p>
                                    <p><strong>Tipo de perfil:</strong> {renderValue(clientData.tipoPerfil)}</p>
                                </div>
                                <div>
                                    <p><strong>Desea disimular algo:</strong> {renderBoolean(clientData.deseaDisimularRostro)}</p>
                                    {clientData.deseaDisimularRostro && <p><strong>Zonas:</strong> {renderValue(clientData.zonasDisimular)}</p>}
                                </div>
                            </div>
                            <div className="info-subsection-grid mt-4">
                                <div>
                                    <p><strong>Tiene arrugas/protuberancias:</strong> {renderBoolean(clientData.tieneArrugasProtuberancias)}</p>
                                    {clientData.tieneArrugasProtuberancias && <p><strong>Zonas:</strong> {renderValue(clientData.zonasArrugasProtuberancias)}</p>}
                                </div>
                                <div>
                                    <p><strong>Tiene plagiocefalia:</strong> {renderBoolean(clientData.tienePlagiosefalia)}</p>
                                </div>
                            </div>
                            
                            <h4 className="section-title mt-4">Características del Cabello</h4>
                            <div className="info-subsection-grid">
                                <div>
                                    <p><strong>Textura:</strong> {renderValue(clientData.texturaCabello)}</p>
                                </div>
                                <div>
                                    <p><strong>Densidad:</strong> {renderValue(clientData.densidadCabello)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Recomendaciones Profesionales */}
                        <div className="detail-section-card full-width">
                            <h4 className="section-title">Recomendaciones Profesionales</h4>
                            <p><strong>¿Corte correctivo? </strong> {renderBoolean(clientData.esCorteCorrectivo)}</p>
                            <p className="mt-4"><strong>Producto para mantenimiento:</strong></p>
                            <div className="detail-note">{renderValue(clientData.productoMantenimiento)}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para ver la foto en grande */}
            {selectedPhoto && (
                <div className="photo-modal-overlay" onClick={handleClosePhoto}>
                    <div className="photo-modal-content" onClick={e => e.stopPropagation()}>
                        <button className="photo-modal-close-btn" onClick={handleClosePhoto}>
                            <XMarkIcon className="icon" />
                        </button>
                        <img src={selectedPhoto} alt="Foto del cliente en pantalla completa" className="full-screen-photo" />
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default ClientDetailModal;