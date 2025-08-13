import React, { useState, useEffect } from 'react';
import Select from '../../common/Select/Select';
import FileUpload from '../../common/FileUpload/FileUpload';
import { useNavigate } from 'react-router-dom';
import './ClientForm.css';

const ClientForm = ({ initialData , onSubmit, allowPhotoUpload = true }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialData);
    const [clientPhotos, setClientPhotos] = useState([]);

    // Opciones para los select
    const civilStatusOptions = ['Soltero/a', 'Casado/a', 'Divorciado/a', 'Viudo/a', 'Unión libre'];
    const personalityOptions = ['Extrovertido', 'Introvertido', 'Conservador', 'Aventurero', 'Clásico', 'Moderno'];
    const clothingStyleOptions = ['Formal', 'Casual', 'Deportivo', 'Elegante', 'Urbano', 'Clásico'];
    const topLengthOptions = ['Muy corto', 'Corto', 'Medio', 'Largo', 'Muy largo'];
    const fadeTonePreference = ['Alto', 'Medio', 'Bajo', 'Sin desvanecido'];
    const skullTypeOptions = ['Dolicocéfalo', 'Braquicéfalo', "Normocéfalo", "Mesocéfalo", "Bicéfalo"];
    const faceTypeOptions = ['Redondo', 'Ovalado', 'Cuadrado', 'Triangular', 'Corazón', 'Diamante'];
    const profileTypeOptions = ["Ovalado", "Rectangular", "Triangular", "Cuadrado", "Redondo", "Corazón", "Diamante"];
    const hairTextureOptions = ['Liso', 'Ondulado', 'Rizado', 'Crespo'];
    const hairDensityOptions = ['Baja', 'Media', 'Alta'];

    useEffect(() => {
        setFormData(initialData);
        if (initialData.urlsImagenesCortes) {
            setClientPhotos(initialData.urlsImagenesCortes.map(url => ({
                id: url,
                file: null,
                previewUrl: url
            })));
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('medidas.')) {
            const medidaName = name.split('.')[1]; // Obtiene el nombre de la medida
            setFormData(prevFormData => ({
                ...prevFormData,
                medidas: {
                    ...prevFormData.medidas,
                    [medidaName]: value // Actualiza la medida específica
                }
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value
            }));
        }
    };

    // Lógica para manejar la subida de múltiples archivos del cliente
    const handleClientPhotoChange = (files) => {
        const newPhotos = Array.from(files).map(file => ({
            id: URL.createObjectURL(file), // Usamos la URL como ID temporal
            file: file,
            previewUrl: URL.createObjectURL(file)
        }));
        setClientPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
    };
    const handleRemoveClientPhoto = (id) => {
        setClientPhotos(prevPhotos => prevPhotos.filter(photo => photo.id !== id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Llamada a la función onSubmit con los datos del formulario
        onSubmit(formData, clientPhotos);
    };

    return (
        
            <form onSubmit={handleSubmit} className="client-form">
                {/* Información Personal */}
                <section className="form-section-card">
                    <h2 className="section-title">Información Completa del Cliente</h2>
                    <h3 className="sub-section-title">Información Personal</h3>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="nombreCompleto">Nombre completo *</label>
                            <input type="text" id="nombreCompleto" name="nombreCompleto" value={formData.nombreCompleto} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="edad">Edad *</label>
                            <input type="number" id="edad" name="edad" value={formData.edad} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="ocupacion">Ocupación</label>
                            <input type="text" id="ocupacion" name="ocupacion" value={formData.ocupacion} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="estadoCivil">Estado Civil</label>
                            <Select
                                id="estadoCivil"
                                name="estadoCivil"
                                value={formData.estadoCivil}
                                onChange={handleChange}
                                options={civilStatusOptions}
                                placeholder="Selecciona estado civil"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="personalidad">Personalidad</label>
                            <Select
                                id="personalidad"
                                name="personalidad"
                                value={formData.personalidad}
                                onChange={handleChange}
                                options={personalityOptions}
                                placeholder="Selecciona personalidad"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gustosRopa">Gustos en ropa</label>
                            <Select
                                id="gustosRopa"
                                name="gustosRopa"
                                value={formData.gustosRopa}
                                onChange={handleChange}
                                options={clothingStyleOptions}
                                placeholder="Estilo de vestir"
                            />
                        </div>
                    </div>
                </section>

                {/* Medidas del Cabello (cm) */}
                <section className="form-section-card">
                    <h2 className="section-title">Medidas del Cabello (cm)</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="frente">Medidas Frente</label>
                            <input type="number" id="frente" name="medidas.frente" value={formData.medidas.frente} onChange={handleChange} min={1} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lateral1">Medidas Lateral 1</label>
                            <input type="number" id="lateral1" name="medidas.lateral1" value={formData.medidas.lateral1} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nuca">Medidas Nuca</label>
                            <input type="number" id="nuca" name="medidas.nuca" value={formData.medidas.nuca} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lateral2">Medidas Lateral 2</label>
                            <input type="number" id="lateral2" name="medidas.lateral2" value={formData.medidas.lateral2} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="barba">Medidas Barba</label>
                            <input type="number" id="barba" name="medidas.barba" value={formData.medidas.barba} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="longitudGeneral">Longitud General</label>
                            <input type="number" id="longitudGeneral" name="medidas.longitudGeneral" value={formData.medidas.longitudGeneral} onChange={handleChange} />
                        </div>
                    </div>
                </section>
                
                {/* Hábitos y Preferencias */}
                <section className="form-section-card">
                    <h2 className="section-title">Hábitos y Preferencias</h2>
                    <div className="form-grid">
                        <div className="form-group full-width radio-group">
                            <label>¿Realiza deporte?</label>
                            <div className="radio-options">
                                <label><input type="radio" name="realizaDeporte" checked={formData.realizaDeporte} onChange={() => handleChange({ target: { name: 'realizaDeporte', value: true } })} /> Sí</label>
                                <label><input type="radio" name="realizaDeporte" checked={!formData.realizaDeporte} onChange={() => handleChange({ target: { name: 'realizaDeporte', value: false } })} /> No</label>
                            </div>
                        </div>
                        {formData.realizaDeporte && (
                            <div className="form-group full-width">
                                <label htmlFor="deporteEspecifico">¿Qué deporte realiza?</label>
                                <textarea id="deporteEspecifico" name="deporteEspecifico" value={formData.deporteEspecifico} onChange={handleChange} placeholder="Ej: Ciclismo, Natación, Tenis..."></textarea>
                            </div>
                        )}
                        <div className="form-group">
                            <label htmlFor="tiempoPeinarseMin">Tiempo para peinarse (minutos)</label>
                            <input type="number" id="tiempoPeinarseMin" name="tiempoPeinarseMin" value={formData.tiempoPeinarseMin} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tiempoEntreCortesDias">Tiempo entre cortes (días)</label>
                            <input type="number" id="tiempoEntreCortesDias" name="tiempoEntreCortesDias" value={formData.tiempoEntreCortesDias} onChange={handleChange} />
                        </div>
                        <div className="form-group full-width">
                            <label htmlFor="corteReferencia">Corte de referencia</label>
                            <textarea id="corteReferencia" name="corteReferencia" value={formData.corteReferencia} onChange={handleChange} placeholder="Describe el corte que prefiere o menciona referencias..."></textarea>
                        </div>
                    </div>
                </section>
                
                {/* Preferencias de Estilo */}
                <section className="form-section-card">
                    <h2 className="section-title">Preferencias de Estilo</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="longitudSuperior">Gusto longitud superior</label>
                            <Select
                                id="longitudSuperior"
                                name="longitudSuperior"
                                value={formData.longitudSuperior}
                                onChange={handleChange}
                                options={topLengthOptions}
                                placeholder="Selecciona longitud"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tonoDesvanecido">Gusto tono desvanecido</label>
                            <Select
                                id="tonoDesvanecido"
                                name="tonoDesvanecido"
                                value={formData.tonoDesvanecido}
                                onChange={handleChange}
                                options={fadeTonePreference}
                                placeholder="Selecciona tono"
                            />
                        </div>
                    </div>
                </section>

                {/* Características Físicas y del Cabello */}
                <section className="form-section-card">
                    <h2 className="section-title">Características Físicas</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="tipoCraneo">Tipo de cráneo</label>
                            <Select
                                id="tipoCraneo"
                                name="tipoCraneo"
                                value={formData.tipoCraneo}
                                onChange={handleChange}
                                options={skullTypeOptions}
                                placeholder="Selecciona tipo"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tipoRostro">Tipo de rostro</label>
                            <Select
                                id="tipoRostro"
                                name="tipoRostro"
                                value={formData.tipoRostro}
                                onChange={handleChange}
                                options={faceTypeOptions}
                                placeholder="Selecciona tipo"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tipoPerfil">Tipo de perfil</label>
                            <Select
                                id="tipoPerfil"
                                name="tipoPerfil"
                                value={formData.tipoPerfil}
                                onChange={handleChange}
                                options={profileTypeOptions}
                                placeholder="Selecciona perfil"
                            />
                        </div>
                    </div>
                    <div className="form-grid mt-4">
                        <div className="form-group radio-group">
                            <label>¿Desea disimular algo de su rostro?</label>
                            <div className="radio-options">
                                <label><input type="radio" name="deseaDisimularRostro" checked={formData.deseaDisimularRostro} onChange={() => handleChange({ target: { name: 'deseaDisimularRostro', value: true } })} /> Sí</label>
                                <label><input type="radio" name="deseaDisimularRostro" checked={!formData.deseaDisimularRostro} onChange={() => handleChange({ target: { name: 'deseaDisimularRostro', value: false } })} /> No</label>
                            </div>
                        </div>
                        {formData.deseaDisimularRostro && (
                            <div className="form-group full-width">
                                <label htmlFor="zonasDisimular">¿Qué zonas desea disimular?</label>
                                <textarea id="zonasDisimular" name="zonasDisimular" value={formData.zonasDisimular} onChange={handleChange} placeholder="Describe las zonas que desea disimular..."></textarea>
                            </div>
                        )}
                    </div>
                    <div className="form-grid mt-4">
                        <div className="form-group radio-group">
                            <label>¿Tiene arrugas o protuberancias?</label>
                            <div className="radio-options">
                                <label><input type="radio" name="tieneArrugasProtuberancias" checked={formData.tieneArrugasProtuberancias} onChange={() => handleChange({ target: { name: 'tieneArrugasProtuberancias', value: true } })} /> Sí</label>
                                <label><input type="radio" name="tieneArrugasProtuberancias" checked={!formData.tieneArrugasProtuberancias} onChange={() => handleChange({ target: { name: 'tieneArrugasProtuberancias', value: false } })} /> No</label>
                            </div>
                        </div>
                        {formData.tieneArrugasProtuberancias && (
                            <div className="form-group full-width">
                                <label htmlFor="zonasArrugasProtuberancias">¿En qué zonas?</label>
                                <textarea id="zonasArrugasProtuberancias" name="zonasArrugasProtuberancias" value={formData.zonasArrugasProtuberancias} onChange={handleChange} placeholder="Describe las zonas con arrugas o protuberancias..."></textarea>
                            </div>
                        )}
                    </div>
                    <div className="form-grid mt-4">
                        <div className="form-group radio-group">
                            <label>¿Tiene plagiocefalia?</label>
                            <div className="radio-options">
                                <label><input type="radio" name="tienePlagiosefalia" checked={formData.tienePlagiosefalia} onChange={() => handleChange({ target: { name: 'tienePlagiosefalia', value: true } })} /> Sí</label>
                                <label><input type="radio" name="tienePlagiosefalia" checked={!formData.tienePlagiosefalia} onChange={() => handleChange({ target: { name: 'tienePlagiosefalia', value: false } })} /> No</label>
                            </div>
                        </div>
                    </div>
                    <h2 className="section-title mt-4">Características del Cabello</h2>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="texturaCabello">Textura del cabello</label>
                            <Select
                                id="texturaCabello"
                                name="texturaCabello"
                                value={formData.texturaCabello}
                                onChange={handleChange}
                                options={hairTextureOptions}
                                placeholder="Selecciona textura"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="densidadCabello">Densidad del cabello</label>
                            <Select
                                id="densidadCabello"
                                name="densidadCabello"
                                value={formData.densidadCabello}
                                onChange={handleChange}
                                options={hairDensityOptions}
                                placeholder="Selecciona densidad"
                            />
                        </div>
                    </div>
                </section>

                {/* Recomendaciones Profesionales */}
                <section className="form-section-card">
                    <h2 className="section-title">Recomendaciones Profesionales</h2>
                    <div className="form-grid">
                        
                        <div className="form-group radio-group">
                            <label>¿Corte correctivo?</label>
                            <div className="radio-options">
                                <label><input type="radio" name="esCorteCorrectivo" checked={formData.esCorteCorrectivo} onChange={() => handleChange({ target: { name: 'esCorteCorrectivo', value: true } })} /> Sí</label>
                                <label><input type="radio" name="esCorteCorrectivo" checked={!formData.esCorteCorrectivo} onChange={() => handleChange({ target: { name: 'esCorteCorrectivo', value: false } })} /> No</label>
                            </div>
                        </div>
                        <div className="form-group full-width">
                            <label htmlFor="productoMantenimiento">Producto adecuado para mantenimiento</label>
                            <textarea id="productoMantenimiento" name="productoMantenimiento" value={formData.productoMantenimiento} onChange={handleChange} placeholder="Recomienda productos para el mantenimiento..."></textarea>
                        </div>
                    </div>
                    
                </section>
                
                {/* Fotos del Cliente usando el componente reutilizable */}
                {allowPhotoUpload && (
                <section className="form-section-card">
                    <FileUpload
                        label="Fotos del Cliente"
                        subLabel="Sube múltiples fotos del perfil del cliente (cabeza, diferentes ángulos)"
                        files={clientPhotos}
                        onFileChange={handleClientPhotoChange}
                        onRemoveFile={handleRemoveClientPhoto}
                        isMultiple={true} // Indicamos que se pueden subir múltiples archivos
                    />
                </section>
                 )}

                <div className="form-actions">
                    <button type="submit" className="save-button">Guardar Cliente</button>
                    <button type="button" onClick={() => navigate('/clients')} className="cancel-button">Cancelar</button>
                </div>
            </form>
    );
};

export default ClientForm;