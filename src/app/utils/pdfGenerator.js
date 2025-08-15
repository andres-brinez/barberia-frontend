import jsPDF from "jspdf";

// Helpers
const renderValue = (value) => {
    if (value === null || value === undefined || value === '') {
        return 'No disponible';
    }
    return String(value);
};

const renderBoolean = (value) => {
    if (value === true) return 'Sí';
    if (value === false) return 'No';
    return 'No disponible';
};

// Función para generar el PDF
export const generateClientProfilePDF = (data) => {
    const doc = new jsPDF();

    // Colores
    const azulTitulo = "#1e2735";
    const grisSubtitulo = "#3a3f53";
    const grisEtiqueta = "#3a3f53";
    const grisValor = "#6a6f80";

    // Helper para añadir etiqueta y valor en una sola línea
    const addLabelValue = (label, value, x, y) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(grisEtiqueta);
        doc.text(`${label}: `, x, y);

        const labelWidth = doc.getTextWidth(`${label}: `);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(grisValor);
        doc.text(value, x + labelWidth, y);
    };

    // Helper para dibujar un subtítulo sin fondo
    const addSectionTitle = (text, x, y) => {
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(grisSubtitulo);
        doc.text(text, x, y);
    };

    // Título principal
    doc.setFontSize(20);
    doc.setTextColor(azulTitulo);
    doc.setFont("helvetica", "bold");
    doc.text("Información del Cliente", 105, 20, { align: "center" });

    // --- SECCIÓN IZQUIERDA ---
    let y = 35;
    let xLeft = 30;

    // Información personal
    addSectionTitle("Información personal", xLeft
        , y);

    y += 10;
    addLabelValue("Nombre completo", renderValue(data.nombreCompleto), xLeft, y);
    y += 8;
    addLabelValue("Edad", renderValue(data.edad), xLeft, y);
    y += 8;
    addLabelValue("Ocupación", renderValue(data.ocupacion), xLeft, y);
    y += 8;
    addLabelValue("Estado civil", renderValue(data.estadoCivil), xLeft, y);
    y += 8;
    addLabelValue("Personalidad", renderValue(data.personalidad), xLeft , y);
    y += 8;
    addLabelValue("Gustos de ropa", renderValue(data.gustosRopa), xLeft, y);

    // Medidas del Cabello
    y += 15; // Más espacio antes de nueva sección
    addSectionTitle("Medidas del Cabello (cm)", xLeft
        , y);

    y += 10;
    addLabelValue("Frente", renderValue(data.medidas.frente), xLeft
        , y);
    y += 8;
    addLabelValue("Lateral 1", renderValue(data.medidas.lateral1), xLeft
        , y);
    y += 8;
    addLabelValue("Nuca", renderValue(data.medidas.nuca), xLeft
        , y);
    y += 8;
    addLabelValue("Lateral 2", renderValue(data.medidas.lateral2), xLeft
        , y);
    y += 8;
    addLabelValue("Barba", renderValue(data.medidas.barba), xLeft
        , y);
    y += 8;
    addLabelValue("Longitud general", renderValue(data.medidas.longitudGeneral), xLeft
        , y);

    // Hábitos y Preferencias
    y += 15;
    addSectionTitle("Hábitos y Preferencias", xLeft
        , y);

    y += 10;
  
    addLabelValue(
        "Realiza deporte",
        data.realizaDeporte ? `Sí (${renderValue(data.deporteEspecifico)})` : "No",
        xLeft,
        y
    );    
    y += 8;
    addLabelValue("Tiempo para peinarse", `${renderValue(data.tiempoPeinarseMin)} min`, xLeft
        , y);
    y += 8;
    addLabelValue("Tiempo entre cortes", `${renderValue(data.tiempoEntreCortesDias)} días`, xLeft
        , y);
    y += 8;
    addLabelValue("Corte de referencia", renderValue(data.corteReferencia), xLeft
        , y);

    // --- SECCIÓN DERECHA ---
    let y2 = 35;
    let xRight =120;

    // Información
    addSectionTitle("Características y Perfil", xRight, y2);

    y2 += 10;
    addLabelValue("Longitud superior", renderValue(data.longitudSuperior), xRight, y2);
    y2 += 8;
    addLabelValue("Tono de desvanecido", renderValue(data.tonoDesvanecido), xRight, y2);
    y2 += 8;
    addLabelValue("Tipo de cráneo", renderValue(data.tipoCraneo), xRight, y2);
    y2 += 8;
    addLabelValue("Textura del cabello", renderValue(data.texturaCabello), xRight, y2);
    y2 += 8;
    addLabelValue("Densidad del cabello", renderValue(data.densidadCabello), xRight, y2);
    y2 += 8;
    addLabelValue("Tipo de rostro", renderValue(data.tipoRostro), xRight, y2);
    y2 += 8;
    addLabelValue(
        "Desea disimular rostro",
        data.deseaDisimularRostro ? `Sí (${renderValue(data.zonasDisimular)})` : "No",
        xRight,
        y2
    );
   
    y2 += 8;
    // addLabelValue("Tiene arrugas/protuberancias", renderBoolean(data.tieneArrugasProtuberancias), xRight, y2);
    addLabelValue(
        "Tiene arrugas/protuberancias",
        data.tieneArrugasProtuberancias ? `Sí (${renderValue(data.zonasArrugasProtuberancias)})` : "No",
        xRight,
        y2
    );
    y2 += 8;
    addLabelValue("Tiene plagiocefalia", renderBoolean(data.tienePlagiosefalia), xRight, y2);
    y2 += 8;
    addLabelValue("Es corte correctivo", renderBoolean(data.esCorteCorrectivo), xRight, y2);
    y2 += 8;
    addLabelValue("Producto de mantenimiento", renderValue(data.productoMantenimiento), xRight, y2);

    // Guardar PDF
    doc.save(`perfil_${data.nombreCompleto}.pdf`);
};
