// Función para agregar imagen (ahora asíncrona)
async function agregarImagenAsync(doc, imagePath, x, y, width, height) {
    try {
        const response = await fetch(imagePath);
        const base64 = await response.text();
        const imgBase64 = `data:image/png;base64,${base64.trim()}`;
        doc.addImage(imgBase64, 'PNG', x, y, width, height);
    } catch (error) {
        console.error(`Error al cargar la imagen ${imagePath}:`, error);
    }
}

// Función para importar fuente (ahora asíncrona)
async function importarFuenteAsync(doc, nombreFuente, estilo, rutaBase64) {
    try {
        const response = await fetch(rutaBase64);
        const base64String = await response.text();
        doc.addFileToVFS(nombreFuente + ".ttf", base64String.trim());
        doc.addFont(nombreFuente + ".ttf", nombreFuente, estilo);
    } catch (error) {
        console.error(`Error cargando la fuente ${nombreFuente}:`, error);
        throw error;
    }
}

// Función principal refactorizada
async function generarPDF() {
    try {
        // Crear la instancia de jsPDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // ====== CARGAR FUENTES PRIMERO ======
        await importarFuenteAsync(doc, "LiterRegular", "normal", "./fonts/Liter-Regular.base64");
        await importarFuenteAsync(doc, "BebasNeue", "normal", "./fonts/BebasNeue-Regular.base64");

        // ====== DECORACIONES SUPERIORES ======
        // Cuadro naranja superior
        doc.setFillColor(255, 184, 49);
        doc.rect(0, 0, doc.internal.pageSize.getWidth(), 50, 'F');

        // Puntitos decorativos superiores - izquierda
        doc.setFillColor(0, 0, 0);
        for (let i = 0; i < 12; i++) {
            for (let j = 0; j < 4; j++) {
                doc.circle(3 + j * 4, 3 + i * 4, 0.2, 'F');
            }
        }

        // Puntitos decorativos superiores - derecha
        const pageWidth = doc.internal.pageSize.getWidth();
        for (let i = 0; i < 12; i++) {
            for (let j = 0; j < 4; j++) {
                doc.circle(pageWidth - 3 - j * 4, 3 + i * 4, 0.2, 'F');
            }
        }

        // Decoración negra superior
        doc.setFillColor(0, 0, 0);
        doc.rect(149.9, 0, 60, 10, 'F');
        doc.triangle(140, 0, 150, 0, 150, 10, 'F');

        // ====== DECORACIONES INFERIORES ======
        // Cuadro naranja inferior
        doc.setFillColor(255, 184, 49);
        doc.rect(0, 247, doc.internal.pageSize.getWidth(), 50, 'F');

        const franjaInferiorY = 247;
        doc.setFillColor(0, 0, 0);

        // Puntitos decorativos inferiores - izquierda
        for (let i = 0; i < 12; i++) {
            for (let j = 0; j < 4; j++) {
                doc.circle(3 + j * 4, franjaInferiorY + 3 + i * 4, 0.2, 'F');
            }
        }

        // Puntitos decorativos inferiores - derecha
        for (let i = 0; i < 12; i++) {
            for (let j = 0; j < 4; j++) {
                doc.circle(pageWidth - 3 - j * 4, franjaInferiorY + 3 + i * 4, 0.2, 'F');
            }
        }

        // Decoración negra inferior
        doc.setFillColor(0, 0, 0);
        doc.rect(0, 287, 60.1, 10, 'F');
        doc.triangle(60, 287, 70, 297, 60, 297, 'F');

        // ====== AGREGAR IMÁGENES ======
        await agregarImagenAsync(doc, './img/lacubierta.base64', 20, 10, 30, 30);
        //await agregarImagenAsync(doc, './img/ubi.base64', 20, 252, 5, 5);
        //await agregarImagenAsync(doc, './img/whats.base64', 20, 262, 5, 5);

        // ====== TEXTO DEL ENCABEZADO (con fuente BebasNeue) ======
        doc.setFont("BebasNeue", "normal");
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(40);
        doc.text("LA CUBIERTA", 51, 23);
        doc.setFontSize(30);
        doc.text("Alquiler de carpas, sillas, mesas y más.", 51, 35);

        // ====== LÍNEAS DECORATIVAS NARANJAS ======
        doc.setDrawColor(255, 184, 49);
        doc.setLineWidth(1);
        doc.line(45, 63, 200, 63);
        doc.line(45, 75, 200, 75);
        doc.line(45, 87, 200, 87);

        // ====== EXTRAER DATOS DEL CLIENTE ======
        const nombre = document.querySelector('#nombreClienteTd')?.innerText || "";
        const direccion = document.querySelector('#direccionClienteTd')?.innerText || "";
        const telefono = document.querySelector('#numeroClienteTd')?.innerText || "";

        // Función para obtener la fecha formateada
        function obtenerFechaFormateada() {
            const opciones = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
            const fecha = new Date().toLocaleDateString('es-ES', opciones);
            // Capitalizar primera letra
            return fecha.charAt(0).toUpperCase() + fecha.slice(1);
        }

        const fecha = obtenerFechaFormateada();

        // ====== ETIQUETAS (con fuente BebasNeue) ======
        let yPos = 60;
        doc.setFont("BebasNeue", "normal");
        doc.setFontSize(17);
        doc.text("Nombre:", 20, yPos);
        yPos += 12;

        doc.text("Dirección:", 20, yPos);
        yPos += 12;

        doc.text("Teléfono:", 20, yPos);
        yPos += 14;

        doc.text(`Fecha: ${fecha}`, 10, yPos);

        // ====== VALORES DEL CLIENTE (con fuente LiterRegular) ======
        yPos = 60;
        doc.setFont("LiterRegular", "normal");
        doc.setFontSize(12);
        doc.text(nombre, 45, yPos);
        yPos += 12;

        doc.text(direccion, 45, yPos);
        yPos += 12;

        doc.text(telefono, 45, yPos);

        // ====== PIE DE PÁGINA (con fuente LiterRegular) ======
                // Logo a la izquierda
        await agregarImagenAsync(doc, './img/lacubierta.base64', 37, 252, 30, 30);

        // Datos al lado del logo
        const datosX = 70; // Posición X para los datos
        
        // Iconos y textos
        doc.setFont("LiterRegular", "normal");
        doc.setFontSize(9);
        
        let yPosPie = 258;
        
        // Ubicación con icono
        await agregarImagenAsync(doc, './img/ubi.base64', datosX, yPosPie - 1, 4, 4);
        doc.text("Barrio San Juan, Calle José de la Cuadra E5-132", datosX + 5, yPosPie);
        yPosPie += 4;
        
        doc.text("Amaguaña, Quito, Ecuador", datosX + 5, yPosPie);
        yPosPie += 5;
        
        doc.text("Martha Carapaz", datosX + 5, yPosPie);
        yPosPie += 5;
        
        // WhatsApp con icono alineado al número
        await agregarImagenAsync(doc, './img/whats.base64', datosX, yPosPie-3 , 4, 4);
        doc.text("0987593512", datosX + 5, yPosPie);
        yPosPie += 5;
        
        doc.text("marthita_carapaz@hotmail.com", datosX + 5, yPosPie);

        // ====== TABLA DE COTIZACIÓN ======
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
        const cabecera = [datos[0]];
        const cuerpo = datos.slice(1);

        // Extraer el Total
        let totalTexto = "";
        const ultimaFila = cuerpo[cuerpo.length - 1];

        if (ultimaFila && ultimaFila[0].toLowerCase().includes("total")) {
            totalTexto = ultimaFila[ultimaFila.length - 1];
            cuerpo.pop();
        }

        // Agregar la fila del Total con formato especial
        cuerpo.push([
            {
                content: "Total:",
                colSpan: cabecera[0].length - 1,
                styles: { halign: "left", fontStyle: "bold", fillColor: [242, 242, 242] }
            },
            {
                content: totalTexto,
                styles: { fontStyle: "bold", fillColor: [242, 242, 242] }
            }
        ]);

        // Generar tabla
        doc.autoTable({
            head: cabecera,
            body: cuerpo,
            startY: 104,
            theme: 'grid',
            headStyles: {
                fillColor: [255, 184, 49],
                textColor: [0, 0, 0],
                fontSize: 12,
                halign: 'center'
            },
            bodyStyles: {
                fillColor: [255, 255, 255],
                textColor: [0, 0, 0],
                fontSize: 10,
                halign: 'center',
                valign: 'middle'
            },
            margin: { top: 30, left: 10, right: 10 },
            tableWidth: 'auto',
            styles: {
                cellPadding: 3,
                lineWidth: 0.2,
                lineColor: [0, 0, 0]
            }
        });

        // ====== GUARDAR PDF COMO BLOB ======
        const pdfBlob = doc.output('blob');
        
        // Crear URL temporal del PDF
        const pdfUrl = URL.createObjectURL(pdfBlob);
        
        // Mostrar modal con vista previa
        mostrarVistaPrevia(pdfUrl, pdfBlob);

        console.log('PDF generado exitosamente');

    } catch (error) {
        console.error('Error al generar el PDF:', error);
        alert('Hubo un error al generar el PDF. Por favor, revisa la consola.');
    }
}

// Configurar worker de PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// --- AÑADIDO: función para obtener fecha en formato seguro YYYY_MM_DD ---
function obtenerFechaFormateada() {
	// Devuelve YYYY_MM_DD (seguro para nombres de archivo)
	const now = new Date();
	const yyyy = now.getFullYear();
	const mm = String(now.getMonth() + 1).padStart(2, '0');
	const dd = String(now.getDate()).padStart(2, '0');
	return `${yyyy}_${mm}_${dd}`;
}

// --- AÑADIDO: sanitizar nombre para usar en filename ---
function sanitizeFilename(name) {
	if (!name) return '';
	return name
		.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quitar acentos
		.replace(/[^a-zA-Z0-9\s]/g, '') // quitar caracteres no alfanuméricos (salva espacios)
		.trim()
		.replace(/\s+/g, '_'); // espacios -> guion bajo
}

// --- AÑADIDO: generar nombre de archivo consistente (ext debe pasar sin punto, ej. "pdf" o "mp4") ---
function generateFileNameForClient(ext = 'pdf') {
	const nombreInput = document.getElementById('nombre');
	const nombreCliente = nombreInput ? nombreInput.value : '';
	const fecha = obtenerFechaFormateada();

	const sanitized = sanitizeFilename(nombreCliente);
	let filename = 'Cotizacion';
	if (sanitized && sanitized.length > 0) {
		filename += `_${sanitized}_${fecha}`;
	} else {
		filename += `_${fecha}`;
	}
	// Asegurar extensión
	if (!filename.toLowerCase().endsWith(`.${ext}`)) filename += `.${ext}`;
	return filename;
}

// Variable global para almacenar el blob del PDF
let pdfBlobGlobal = null;

// Función para mostrar la vista previa en el modal
function mostrarVistaPrevia(pdfUrl, pdfBlob) {
    const modal = document.getElementById('pdfPreviewModal');
    const btnDescargar = document.getElementById('btnDescargarModal');
    const btnCompartir = document.getElementById('btnCompartirModal');
    const btnCerrar = document.getElementById('btnCerrarModal');
    const canvas = document.getElementById('pdfCanvas');
    const pdfMessage = document.getElementById('pdfMessage');
    
    if (!modal || !canvas) {
        console.error('Modal o canvas no encontrado');
        return;
    }
    
    // Almacenar el blob globalmente para compartir
    pdfBlobGlobal = pdfBlob;
    
    // Mostrar el modal
    modal.style.display = 'block';
    pdfMessage.textContent = 'Cargando PDF...';
    
    // Mostrar botón de compartir siempre (funciona en navegadores que lo soportan)
    btnCompartir.style.display = 'block';
    
    // Renderizar PDF en canvas
    renderPDFToCanvas(pdfUrl, canvas, pdfMessage);
    
    // Event listener para descargar
    btnDescargar.onclick = function() {
        descargarPDF(pdfUrl);
    };
    
    // Event listener para compartir
    btnCompartir.onclick = function() {
        compartirPDF(pdfBlob);
    };
    
    // Event listener para cerrar
    btnCerrar.onclick = function() {
        modal.style.display = 'none';
        URL.revokeObjectURL(pdfUrl);
    };
    
    // Cerrar modal al hacer clic fuera de él
    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            URL.revokeObjectURL(pdfUrl);
        }
    };
}

// Función para renderizar PDF en canvas
async function renderPDFToCanvas(pdfUrl, canvas, messageElement) {
    try {
        // Cargar el PDF
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        
        // Obtener la primera página
        const page = pdf.getPage(1);
        page.then(function(page) {
            // Escala responsiva
            const scale = window.innerWidth < 768 ? 1.5 : 2;
            const viewport = page.getViewport({ scale: scale });
            
            // Configurar canvas
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            
            // Contexto del canvas
            const context = canvas.getContext('2d');
            
            // Renderizar página
            const renderTask = page.render({
                canvasContext: context,
                viewport: viewport
            });
            
            renderTask.promise.then(function() {
                messageElement.textContent = 'Página 1 de ' + pdf.numPages;
                console.log('PDF renderizado exitosamente');
            }).catch(function(error) {
                messageElement.textContent = 'Error al renderizar el PDF';
                console.error('Error renderizando:', error);
            });
        });
        
    } catch (error) {
        console.error('Error cargando PDF:', error);
        messageElement.textContent = 'Error al cargar el PDF. Por favor, descargalo.';
    }
}

// Función para compartir PDF
async function compartirPDF(pdfBlob) {
    try {
        const filename = generateFileNameForClient('pdf');
        const archivo = new File([pdfBlob], filename, { type: 'application/pdf' });
        
        // Verificar si el navegador soporta compartir archivos
        if (navigator.canShare && navigator.canShare({ files: [archivo] })) {
            await navigator.share({
                title: 'Cotización de Evento',
                text: 'Mi cotización de eventos La Cubierta',
                files: [archivo]
            });
        } else if (navigator.share) {
            // Fallback si no soporta compartir archivos
            await navigator.share({
                title: 'Cotización de Evento',
                text: 'Mi cotización de eventos La Cubierta',
                url: window.location.href
            });
        } else {
            alert('Tu navegador no soporta compartir. Por favor, descarga el PDF.');
        }
    } catch (error) {
        if (error.name !== 'AbortError') {
            console.error('Error al compartir:', error);
        }
    }
}

// Función para descargar el PDF
function descargarPDF(pdfUrl) {
	const filename = generateFileNameForClient('pdf');

	const link = document.createElement('a');
	link.href = pdfUrl;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}

// --- NUEVA: compartir la tabla como imagen (usa html2canvas y la misma lógica de nombres) ---
async function shareTableImage() {
    try {
        const tabla = document.querySelector('#resultadoCotizacion table') || document.getElementById('resultadoCotizacion');
        if (!tabla) {
            alert('No hay tabla de cotización para compartir. Genera la cotización primero.');
            return;
        }

        // Renderizar con html2canvas
        const canvas = await html2canvas(tabla, { backgroundColor: '#ffffff', scale: 2 });
        return new Promise((resolve, reject) => {
            canvas.toBlob(async (blob) => {
                if (!blob) {
                    alert('No se pudo generar la imagen de la tabla.');
                    return reject();
                }

                const filename = generateFileNameForClient('png');
                const file = new File([blob], filename, { type: 'image/png' });

                // Usar Web Share API si soporta archivos
                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    try {
                        await navigator.share({
                            files: [file],
                            title: 'Cotización',
                            text: 'Imagen de la cotización'
                        });
                        resolve();
                    } catch (err) {
                        console.error('Error compartiendo:', err);
                        alert('Error al compartir. Intenta descargar la imagen y compartir manualmente.');
                        // fallback: descargar
                        forceDownloadBlob(blob, filename);
                        resolve();
                    }
                } else {
                    // Fallback: descargar y avisar al usuario (WhatsApp móvil requiere archivo físico)
                    forceDownloadBlob(blob, filename);
                    alert('Tu navegador no permite compartir archivos directamente. Se ha descargado la imagen; compártela desde tu app (WhatsApp).');
                    resolve();
                }
            }, 'image/png');
        });
    } catch (error) {
        console.error('shareTableImage error:', error);
        alert('Ocurrió un error al intentar compartir la tabla.');
    }
}

// Helper: fuerza la descarga de un blob con un nombre
function forceDownloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Registrar listener del botón al cargar DOM
document.addEventListener('DOMContentLoaded', function() {
    const shareTableBtn = document.getElementById('shareTableBtn');
    if (shareTableBtn) {
        shareTableBtn.addEventListener('click', function() {
            // Llamar a la función definida arriba
            shareTableImage();
        });
    }
});