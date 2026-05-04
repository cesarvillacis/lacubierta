import { obtenerDatosCliente, obtenerCantidades, toggleSection, renderizarCliente} from "./dom.js";
import { cargarProductos, obtenerPrecio } from "./productos.js";
import { calcularItems, calcularTotal } from "./cotizacion.js";
import { renderizarTabla } from "./dom.js";
import { generarPDF } from "./pdf.js";

window.toggleSection = toggleSection; //expande categorias html

// =========================
// MEMORIA GLOBAL
// =========================
let productos = {};


// =========================
// INICIAR APP
// =========================
document.addEventListener("DOMContentLoaded", iniciarApp);


// =========================
// FUNCION INICIAL
// =========================
async function iniciarApp() {

    try {

        await cargarDatosIniciales();

        configurarEventos();

        console.log("App iniciada");

    } catch (error) {

        console.error(
            "Error iniciando app:",
            error
        );

    }

}


// =========================
// CARGAR DATOS INICIALES
// =========================
async function cargarDatosIniciales() {

    productos = await cargarProductos();

    console.log("Productos cargados:",productos);

}


// =========================
// EVENTOS
// =========================
function configurarEventos() {

    document.getElementById("btnCalcular").addEventListener("click", manejarCotizacion);
    document.getElementById("downloadPDF").addEventListener("click",generarPDF);
}



async function manejarCotizacion() {
  try {
    // 1. Datos del cliente desde HTML
    const cliente = obtenerDatosCliente();
    console.log(cliente);

    // 2. Cantidades desde inputs HTML
    const cantidades = obtenerCantidades(productos);
    console.log(cantidades);


    // 4. Calcular detalle de cada item
    const detalle = calcularItems(cantidades, productos);
    console.log("DETALLE:");
    console.table(detalle);

    // 5. Calcular total final
    const total = calcularTotal(detalle);
    console.log("TOTAL:");
    console.log(total);

    // 6. Renderizar cliente en pantalla
    renderizarCliente(cliente);

    // 7. Renderizar tabla de cotización
    renderizarTabla(detalle, total);

  } catch (error) {
    console.error("Error en cotización:", error);
  }
}