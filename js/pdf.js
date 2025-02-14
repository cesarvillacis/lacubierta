function agregarImagen(doc, imagePath, x, y, width, height) {
    fetch(imagePath)
        .then(response => response.text())
        .then(base64 => {
            const imgBase64 = `data:image/png;base64,${base64.trim()}`;
            doc.addImage(imgBase64, 'PNG', x, y, width, height);
        })
        .catch(error => console.error("Error al cargar la imagen:", error));
}

function importarFuente(doc, nombreFuente, estilo, rutaBase64, callback) {
    fetch(rutaBase64)
        .then(response => response.text())
        .then(base64String => {
            doc.addFileToVFS(nombreFuente + ".ttf", base64String);
            doc.addFont(nombreFuente + ".ttf", nombreFuente, estilo);
            callback(); // Llama a la siguiente acción después de importar la fuente
        })
        .catch(error => console.error('Error cargando la fuente:', error));
}


function generarPDF() {
    //console.log("Generando PDF...");

    // Crear la instancia de jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Cuadro de color #ffb831 que ocupa todo el ancho
   doc.setFillColor(255, 184, 49);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 50, 'F'); // Altura definible aquí

    // Puntitos decorativos
    doc.setFillColor(0, 0, 0);

    // Lado izquierdo (3x9 puntos)
    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 4; j++) {
            doc.circle(3 + j * 4, 3 + i * 4, 0.2, 'F');
        }
    }

    // Lado derecho (3x9 puntos)
    const pageWidth = doc.internal.pageSize.getWidth();
    for (let i = 0; i < 12; i++) {
        for (let j = 0; j < 4; j++) {
            doc.circle(pageWidth - 3 - j * 4, 3 + i * 4, 0.2, 'F');
        }
    }
    //decoracion negra superior
    // Franja negra
doc.setFillColor(0, 0, 0);  // Negro
doc.rect(149.9, 0, 60, 10, 'F');  // Franja negra sobre el fondo naranja
//triangulo negro
doc.setFillColor(0, 0, 0); // Color negro (RGB)
doc.triangle(140, 0, 150, 0, 150, 10, 'F'); // Coordenadas (x1, y1, x2, y2, x3, y3), 'F' para rellenar
// CUADRO INFERIOR
doc.setFillColor(255, 184, 49);
doc.rect(0, 247, doc.internal.pageSize.getWidth(), 50, 'F'); // Franja amarilla inferior

// Puntitos decorativos para la franja inferior
doc.setFillColor(0, 0, 0); // Color negro para los puntos

const franjaInferiorY = 247; // Posición vertical de la franja amarilla inferior

// Lado izquierdo (4x12 puntos)
for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 4; j++) {
        doc.circle(3 + j * 4, franjaInferiorY + 3 + i * 4, 0.2, 'F');
    }
}

// Lado derecho (4x12 puntos)
for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 4; j++) {
        doc.circle(pageWidth - 3 - j * 4, franjaInferiorY + 3 + i * 4, 0.2, 'F');
    }
}

// DECORACIÓN NEGRA INFERIOR IZQUIERDA
// Franja negra
doc.setFillColor(0, 0, 0);  // Color negro
doc.rect(0, 287, 60.1, 10, 'F');  // Franja negra sobre el fondo amarillo inferior

// Triángulo negro
doc.setFillColor(0, 0, 0); // Color negro (RGB)
doc.triangle(60, 287, 70, 297, 60, 297, 'F'); // Coordenadas (x1, y1, x2, y2, x3, y3), 'F' para rellenar

//IMAGENES
agregarImagen(doc, './img/ubi.base64', 20, 252, 5, 5);

agregarImagen(doc, './img/whats.base64', 20, 262, 5, 5);

//FUENTE
// Importar la fuente desde el archivo base64
importarFuente(doc, "LiterRegular", "normal", "./fonts/Liter-Regular.base64");

// Luego, cuando necesites usarla
doc.setFont("LiterRegular");
doc.setFontSize(12);
doc.text("Calle José de la Cuadra E5-132, Amaguaña.", 26, 256);
doc.text("0987593512", 26, 266);

   


//DECORACION DE DATOS DEL CLIENTE
//lineas narajnas
doc.setDrawColor(255, 184, 49); // Establece el color de la línea
doc.setLineWidth(1);            // Opcional: grosor de la línea (ajustable)


// Dibuja una línea horizontal de (x1, y1) a (x2, y2)
doc.line(45, 63, 200, 63);      // Línea de izquierda (20,30) a derecha (180,30)
//doc.line(20, 50, 180, 50);      // Segunda línea un poco más abajo
doc.line(45, 75, 200, 75);  

doc.line(45, 87, 200, 87); 
//agrega el logo
agregarImagen(doc, './img/lacubierta.base64', 20, 10, 30, 30);

   //TABLA INFO DE CLIENTE
   const clienteTabla = document.querySelector('#datosClienteTabla');
   if (!clienteTabla) {
       console.error('No se encontró la tabla dentro del div.');
       return;
   }


                           // Extraer datos de la tabla de cliente
                           const filasCliente = Array.from(clienteTabla.querySelectorAll('tr'));
                           const datosCliente = filasCliente.map(fila => {
                               const celdas = Array.from(fila.querySelectorAll('th, td'));
                               return celdas.map(celda => celda.innerText);
                           });
                   // ** Extraer los datos del cliente **
       const nombre = document.querySelector('#nombreClienteTd')?.innerText || "";
       const cedula = document.querySelector('#cedulaClienteTd')?.innerText || "";
       const direccion = document.querySelector('#direccionClienteTd')?.innerText || "";
       const telefono = document.querySelector('#numeroClienteTd')?.innerText || "";
       const correo = document.querySelector('#correoClienteTd')?.innerText || "";
   
       // ** Dibujar los datos del cliente en el PDF **
       /*let yPos = 60;
       doc.setFont('courier', 'bold');
       doc.setFontSize(14);
       doc.text("Datos del Cliente", 10, yPos);
       yPos += 12;*/
       let yPos = 60;
       doc.setFont("LiterRegular");
       //doc.setFont("Helvetica", "normal");
       doc.setFontSize(12);
       doc.text(`${nombre}`, 45, yPos);
       yPos += 12;
   
       /*doc.text(`Cédula: ${cedula}`, 20, yPos);
       yPos += 6;*/
   
       doc.text(`${direccion} `, 45, yPos);
       yPos += 12;
   
       doc.text(`${telefono}`, 45, yPos);
       yPos += 12;
   
   
       



  


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
                startY: 104,  // Cambié la posición Y para que la tabla no se superponga con la imagen
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

           // Cargar la fuente Base64 desde la carpeta "fonts"
           fetch('./fonts/BebasNeue-Regular.base64')  
           .then(response => response.text())
           .then(base64 => {
               // Cargar la fuente Base64 al PDF
               doc.addFileToVFS("BebasNeue-Regular.ttf", base64.trim());
               doc.addFont("BebasNeue-Regular.ttf", "BebasNeue", "normal");
       
               // Verificar si la fuente se registró
               //console.log(doc.getFontList());
       
               // Aplicar la fuente
               doc.setFont("BebasNeue", "normal");
               doc.setFontSize(40);
               doc.text("LA CUBIERTA", 51, 23);
               doc.setFontSize(30);
               doc.text("Alquiler de carpas, sillas, mesas y más.", 51, 35);

                //TABLA INFO DE CLIENTE

                        // Función para obtener la fecha en formato "Martes 17 de Enero del 2025"
                        function obtenerFechaFormateada() {
                            const opciones = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
                            return new Date().toLocaleDateString('es-ES', opciones);
                        }

    const fecha = obtenerFechaFormateada();

    // ** Dibujar los datos del cliente en el PDF **

    let yPos = 60;
    doc.setFont("BebasNeue", "normal");
    doc.setFontSize(17);
    doc.text(`Nombre:`, 20, yPos);
    yPos += 12;


    doc.text(`Dirección: `, 20, yPos);
    yPos += 12;

    doc.text(`Teléfono:`, 20, yPos);
    yPos += 14;


    doc.text(`Fecha: ${fecha}`, 10, yPos);
    //cambia color a blanco
    doc.setTextColor(77, 77, 77);
    doc.text(`DETALLES CUENTA`, 110, 256);
    //cambia color a negro
    doc.setTextColor(0, 0, 0);
    doc.text(`BANCO PICHINCHA`, 110, 263);
    doc.text(`CTA.AHORROS: 3346943600`, 110, 270);
    doc.text(`CI: 1709221160`, 110, 277);
    doc.text(`PROPIETARIO: CESAR VILLACIS`, 110, 284);
    doc.text(`CORREO:`, 110, 291);
    doc.setFont("Times", "bold");
    doc.setFontSize(13);
    doc.text(`marthita_carapaz@hotmail.com`, 126, 290);
   

               // Guardar el PDF
               doc.save('cotizacion_evento.pdf');
           })
           .catch(err => console.error("Error al cargar la fuente:", err));

}


