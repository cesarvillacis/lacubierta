/*function generarPDF() {
    console.log("Generando PDF..."); 
    const { jsPDF } = window.jspdf;  // Asegurarte de que jsPDF esté cargado
    const doc = new jsPDF();
    doc.text('Cotización de Evento', 20, 20);
    doc.autoTable({
        html: '#resultadoCotizacion table', // ID de la tabla HTML que deseas renderizar
        startY: 30               // Posición inicial de la tabla en el PDF
    });
    doc.save('cotizacion_evento.pdf');
}*/

function generarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text('Cotización de Evento', 20, 20);

    // Obtener la tabla y datos
    const tabla = document.querySelector('#resultadoCotizacion table');
    if (!tabla) {
        console.error('No se encontró la tabla dentro del div.');
        return;
    }

    const filas = Array.from(tabla.querySelectorAll('tr'));
    const datos = filas.map(fila => {
        const celdas = Array.from(fila.querySelectorAll('th, td'));
        return celdas.map(celda => celda.innerText);
    });

    // Separar cabecera y cuerpo
    const cabecera = [datos[0]]; // Primera fila
    const cuerpo = datos.slice(1); // El resto

    
    

    // Personalizar la tabla con bordes y colores
    doc.autoTable({
        head: cabecera,
        body: cuerpo,
        startY: 30,
        theme: 'grid', // Usa el tema 'grid' para bordes por defecto
        headStyles: {
            fillColor: [239, 184, 16],  // Color de fondo para la cabecera (rojo)
            textColor: [0, 0, 0],  // Color de texto (blanco)
            fontSize: 12,
            halign: 'center' // Alineación del texto en la cabecera
        },
        bodyStyles: {
            fillColor: [240, 240, 240],  // Color de fondo de las filas
            textColor: [0, 0, 0],  // Color de texto (negro)
            fontSize: 10,
            halign: 'center', // Alineación de las celdas en el cuerpo
            valign: 'middle'  // Alineación vertical
        },
        margin: { top: 30, left: 20, right: 20 },
        tableWidth: 'auto',
        styles: {
            cellPadding: 5, // Espaciado entre celdas
            lineWidth: 0.2,  // Grosor de las líneas de la tabla
            lineColor: [0, 0, 0] // Color de las líneas
        }
    });

    doc.save('cotizacion_evento.pdf');
}

