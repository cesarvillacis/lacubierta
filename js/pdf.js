function generarPDF() {
    console.log("Generando PDF..."); 
    const { jsPDF } = window.jspdf;  // Asegurarte de que jsPDF esté cargado
    const doc = new jsPDF();
    doc.text('Cotización de Evento', 20, 20);
    doc.save('cotizacion_evento.pdf');
}

