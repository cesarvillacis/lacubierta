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
    console.log("Generando PDF...");

    // Crear la instancia de jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Agregar texto al PDF
   // doc.text('Cotización de Evento', 20, 20);

    // Cargar el archivo Base64
    fetch('./img/lacubierta.base64') // Ruta al archivo Base64
        .then(response => response.text())  // Leerlo como texto
        .then(base64 => {
            // Agregar el prefijo necesario para que jsPDF lo reconozca
            const imgBase64 = `data:image/png;base64,${base64.trim()}`; // Eliminar espacios o saltos de línea innecesarios

            // Verifica en la consola si el Base64 se está leyendo correctamente
            console.log(imgBase64);

            // Añadir la imagen al PDF en la posición deseada (ajustar las coordenadas según sea necesario)
            doc.addImage(imgBase64, 'PNG', 10, 10, 40, 40); // Ajusta las posiciones y tamaños de la imagen

            // Ahora puedes agregar la tabla (como lo tenías antes)
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
                startY: 60,  // Cambié la posición Y para que la tabla no se superponga con la imagen
                theme: 'grid', // Usa el tema 'grid' para bordes por defecto
                headStyles: {
                    fillColor: [239, 184, 16],  // Color de fondo para la cabecera (rojo)
                    textColor: [0, 0, 0],  // Color de texto (negro)
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

            // Guarda el PDF generado
            doc.save('cotizacion_evento.pdf');
        })
        .catch(error => {
            console.error('Error al cargar el archivo Base64:', error);
        });
}
