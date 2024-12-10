// Esperamos a que el DOM esté completamente cargado antes de agregar el evento
const datosClienteTabla = document.getElementById('datosClienteTabla');
const resultadoCotizacion = document.getElementById('resultadoCotizacion');
downloadPDF.addEventListener('click', function() {
    // Obtenemos acceso a la clase jsPDF
    const { jsPDF } = window.jspdf; // Extraemos jsPDF del objeto global

    // Creamos una nueva instancia del documento PDF
    const doc = new jsPDF();

    // Título del PDF
    doc.text('Cotización de Evento', 20, 20); // (Texto, posición X, posición Y)
    
    

    // Generar la tabla de "Cotización"
    doc.autoTable({
        html: '#resultadoCotizacion', // Le indicamos que tome el HTML de la tabla con id "cotizacionTable"
    });
    
    // Finalmente, guardamos y descargamos el archivo PDF
    doc.save('cotizacion_evento.pdf');
});
