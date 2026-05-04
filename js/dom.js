// =========================
// OBTENER DATOS CLIENTE
// =========================
export function obtenerDatosCliente() {
    return {
        nombre: document.getElementById('nombre')?.value.trim() || "",
        cedula: document.getElementById('cedula')?.value.trim() || "",
        direccion: document.getElementById('direccion')?.value.trim() || "",
        numero: document.getElementById('numero')?.value.trim() || "",
        correo: document.getElementById('correo')?.value.trim() || ""
    };
}


// =========================
// HELPER PARA NUMEROS
// =========================
function obtenerNumero(id) {

    const input = document.getElementById(id);

    if (!input) {
        console.warn(`No existe el input con id: ${id}`);
        return 0;
    }

    const valor = input.value.trim();

    if (valor === "") {
        return 0;
    }

    return Number(valor);
}

// =========================
// OBTENER CANTIDADES
// =========================


export function obtenerCantidades(productos) {

    const cantidades = {};

    productos.forEach(producto => {

        const input =
            document.getElementById(producto.codigo);

        if (!input) {

            console.warn(
                "No existe input para:",
                producto.codigo
            );

            return;
        }

        cantidades[producto.codigo] =
            Number(input.value) || 0;
    });

     // extras dinámicos
    cantidades.costoTransporte =
        Number(document.getElementById('costoTransporte').value || 0);

    cantidades.dias =
        Number(document.getElementById('dias').value || 0);

    cantidades.valorxDia =
        Number(document.getElementById('valorxDia').value || 0);

    return cantidades;
}


// TOGGLE SECCIONES
export function toggleSection(sectionId) {
    var section = document.getElementById(sectionId);
    if (section.style.display === "none" || section.style.display === "") {
        section.style.display = "block";
    } else {
        section.style.display = "none";
    }
}


//VISUALIZACION DE LA TABLA
export function renderizarTabla(detalle, total) {

  let html = `
    <table>
      <tr>
        <th>Item</th>
        <th>Producto</th>
        <th>Cantidad</th>
        <th>Precio Individual</th>
        <th>Precio Total</th>
      </tr>
  `;

  detalle.forEach((item, index) => {

    html += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.producto}</td>
        <td>${item.cantidad}</td>
        <td>$${item.precioIndividual.toFixed(2)}</td>
        <td>$${item.precioTotal.toFixed(2)}</td>
      </tr>
    `;
  });

  html += `
      <tr>
        <td colspan="4">
          <strong>Total</strong>
        </td>

        <td>
          <strong>$${total.toFixed(2)}</strong>
        </td>
      </tr>
    </table>
  `;

  document.getElementById(
    'resultadoCotizacion'
  ).innerHTML = html;
}


export function renderizarCliente(cliente) {

    document.getElementById("nombreClienteTd").textContent =
        cliente.nombre || "";

    document.getElementById("cedulaClienteTd").textContent =
        cliente.cedula || "";

    document.getElementById("direccionClienteTd").textContent =
        cliente.direccion || "";

    document.getElementById("numeroClienteTd").textContent =
        cliente.numero || "";

    document.getElementById("correoClienteTd").textContent =
        cliente.correo || "";

}