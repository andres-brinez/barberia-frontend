// src/components/common/FileUpload.jsx
import React from 'react';
import { PlusIcon, XMarkIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import './FileUpload.css';

const FileUpload = ({ label, subLabel, files, onFileChange, onRemoveFile, isMultiple = false }) => {
    
    // Función para manejar el cambio de archivos
    const handleFileChange = (e) => {
        if (e.target.files) {
            onFileChange(e.target.files);
        }
    };
    
    // Función para manejar la eliminación de un archivo
    const handleRemoveFile = (id) => {
        onRemoveFile(id);
    };

    return (
        <div className="file-upload-container">
            <h3 className="file-upload-label">{label}</h3>
            {subLabel && <p className="file-upload-sublabel">{subLabel}</p>}

            {/* Renderizado condicional basado en si hay archivos o no */}
            {files.length === 0 ? (
                <label htmlFor="file-upload-input" className="file-upload-dropzone full-dropzone">
                    <ArrowUpTrayIcon className="dropzone-icon-large" />
                    <p className="dropzone-text">Haz clic para subir {isMultiple ? 'fotos' : 'una foto'}</p>
                    <p className="dropzone-subtext">PNG, JPG hasta 10MB cada una</p>
                    <input
                        id="file-upload-input"
                        type="file"
                        accept="image/png, image/jpeg"
                        multiple={isMultiple}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </label>
            ) : (
                <div className="photos-grid">
                    {files.map((file) => (
                        <div key={file.id} className="photo-preview-container">
                            <img src={file.previewUrl} alt="Previsualización" />
                            <button
                                type="button"
                                onClick={() => handleRemoveFile(file.id)}
                                className="remove-photo-button"
                            >
                                <XMarkIcon className="remove-icon" />
                            </button>
                        </div>
                    ))}
                    {isMultiple && (
                        <label htmlFor="file-upload-input" className="add-more-zone">
                            <div className="upload-icon-container">
                                <PlusIcon className="upload-icon" />
                            </div>
                            <span>Agregar más</span>
                            <input
                                id="file-upload-input"
                                type="file"
                                accept="image/png, image/jpeg"
                                multiple={isMultiple}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                        </label>
                    )}
                </div>
            )}
        </div>
    );
};

export default FileUpload;