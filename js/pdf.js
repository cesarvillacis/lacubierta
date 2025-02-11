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

    /*// Agregar texto al PDF
   // doc.text('Cotización de Evento', 20, 20);
    //-------------DIRECCION--------
    doc.setFont('courier');  // Cambia a Times en negrita
    doc.setFontSize(11);           // Cambia el tamaño de la fuente
    doc.text('Calle José de la Cuadra, E5-132. Amaguaña.', 80, 20);
    //-------------TITULO ALQUILER DE CARPAS-----------
    // Cambiar tamaño y tipografía para un texto específico
    doc.setFont('courier', 'bold');  // Cambia a Times en negrita
    doc.setFontSize(20);           // Cambia el tamaño de la fuente
    doc.text('ALQUILER DE CARPAS "LA CUBIERTA"', 62, 33); // Texto más grande y en negrita
    //-------------COTIZACION-----------
    doc.setFont('courier', 'italic');  // Cambia a Times en negrita
    doc.setFontSize(20);           // Cambia el tamaño de la fuente
    doc.text('Cotización', 105, 45); // Texto más grande y en negrita */
 // Texto más grande y en negrita
    // Cargar el archivo Base64


    // Cuadro de color #ffb831 que ocupa todo el ancho
    doc.setFillColor(255, 184, 49);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 60, 'F'); // Altura definible aquí

    // Puntitos decorativos
    doc.setFillColor(0, 0, 0);

    // Lado izquierdo (3x9 puntos)
    for (let i = 0; i < 14; i++) {
        for (let j = 0; j < 4; j++) {
            doc.circle(3 + j * 4, 3 + i * 4, 0.2, 'F');
        }
    }

    // Lado derecho (3x9 puntos)
    const pageWidth = doc.internal.pageSize.getWidth();
    for (let i = 0; i < 14; i++) {
        for (let j = 0; j < 4; j++) {
            doc.circle(pageWidth - 3 - j * 4, 3 + i * 4, 0.2, 'F');
        }
    }


    fetch('./img/lacubierta.base64') // Ruta al archivo Base64
        .then(response => response.text())  // Leerlo como texto
        .then(base64 => {
            // Agregar el prefijo necesario para que jsPDF lo reconozca
            const imgBase64 = `data:image/png;base64,${base64.trim()}`; // Eliminar espacios o saltos de línea innecesarios

            // Verifica en la consola si el Base64 se está leyendo correctamente
            console.log(imgBase64);

            // Añadir la imagen al PDF en la posición deseada (ajustar las coordenadas según sea necesario)
            doc.addImage(imgBase64, 'PNG', 20, 15, 30, 30); // Ajusta las posiciones y tamaños de la 

            // Agregar texto al lado del logo
// Establecer la fuente en negrita para que las letras sean más gruesas
doc.setFont("helvetica", "bold");  // Usar la fuente helvetica en estilo "bold" (negrita)
doc.setFontSize(16);  // Tamaño de la fuente

// Agregar texto con letras más gruesas
doc.text("LA CUBIERTA", 60, 30);  // Posición X, Y
/*//TABLA INFO DE CLIENTE
const clienteTabla = document.querySelector('#datosClienteTabla');
if (!clienteTabla) {
    console.error('No se encontró la tabla dentro del div.');
    return;
}
                        // Función para obtener la fecha en formato "Martes 17 de Enero del 2025"
                        function obtenerFechaFormateada() {
                            const opciones = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
                            return new Date().toLocaleDateString('es-ES', opciones);
                        }
            
                        // Extraer datos de la tabla de cliente
                        const filasCliente = Array.from(clienteTabla.querySelectorAll('tr'));
                        const datosCliente = filasCliente.map(fila => {
                            const celdas = Array.from(fila.querySelectorAll('th, td'));
                            return celdas.map(celda => celda.innerText);
                        });
                // ** Extraer los datos del cliente **
    const nombre = document.querySelector('#nombreClienteTd')?.innerText || "No especificado";
    const cedula = document.querySelector('#cedulaClienteTd')?.innerText || "No especificado";
    const direccion = document.querySelector('#direccionClienteTd')?.innerText || "No especificado";
    const telefono = document.querySelector('#numeroClienteTd')?.innerText || "No especificado";
    const correo = document.querySelector('#correoClienteTd')?.innerText || "No especificado";
    const fecha = obtenerFechaFormateada();

    // ** Dibujar los datos del cliente en el PDF **
    let yPos = 60;
    doc.setFont('courier', 'bold');
    doc.setFontSize(14);
    doc.text("Datos del Cliente", 10, yPos);
    yPos += 12;

    doc.setFont('courier', 'normal');
    doc.setFontSize(12);
    doc.text(`Nombre: ${nombre}`, 20, yPos);
    yPos += 6;

    /*doc.text(`Cédula: ${cedula}`, 20, yPos);
    yPos += 6;*/
/*
    doc.text(`Dirección: ${direccion}`, 20, yPos);
    yPos += 6;

    doc.text(`Teléfono: ${telefono}`, 20, yPos);
    yPos += 11;

    /*doc.text(`Correo: ${correo}`, 20, yPos);
    yPos += 6;*/
/*
    doc.setFont('bold');
    doc.text(`Fecha: ${fecha}`, 10, yPos);
  */


            //TABLA COTIZACIONES
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
            // ---- Extraer el Total desde la tabla ----
            let totalTexto = "";
            const ultimaFila = cuerpo[cuerpo.length - 1]; 

            if (ultimaFila && ultimaFila[0].toLowerCase().includes("total")) {
                totalTexto = ultimaFila[ultimaFila.length - 1]; // Última celda de la fila total
                cuerpo.pop(); // Eliminar la fila del total de la tabla
            }

            // ---- Agregar la fila del Total ----
            cuerpo.push([
                { content: "Total:", colSpan: cabecera[0].length - 1, styles: { halign: "left", fontStyle: "bold", fillColor: [242, 242, 242] } },
                { content: totalTexto, styles: { fontStyle: "bold", fillColor:[242, 242, 242] } }
            ]);



            // Personalizar la tabla con bordes y colores
            doc.autoTable({
                head: cabecera,
                body: cuerpo,
                startY: 100,  // Cambié la posición Y para que la tabla no se superponga con la imagen
                theme: 'grid', // Usa el tema 'grid' para bordes por defecto
                headStyles: {
                    fillColor: [255, 184, 49],  // Color de fondo para la cabecera (amarillo)
                    textColor: [0, 0, 0],  // Color de texto (negro)
                    fontSize: 12,
                    halign: 'center' // Alineación del texto en la cabecera
                },
                bodyStyles: {
                    fillColor: [255, 255, 255],  // Color de fondo de las filas
                    textColor: [0, 0, 0],  // Color de texto (negro)
                    fontSize: 10,
                    halign: 'center', // Alineación de las celdas en el cuerpo
                    valign: 'middle'  // Alineación vertical
                },
                margin: { top: 30, left: 10, right: 10 },
                tableWidth: 'auto',
                styles: {
                    cellPadding: 3, // Espaciado entre celdas
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


