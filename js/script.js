

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
function toggleSection(sectionId) {
    var section = document.getElementById(sectionId);
    if (section.style.display === "none" || section.style.display === "") {
        section.style.display = "block";
    } else {
        section.style.display = "none";
    }
}


function mostrarDetalleCotizacion(detalle, costoTotal) {
    let tableHtml = "<table><tr><th>Item</th><th>Producto</th><th>Cantidad</th><th>Precio Individual</th><th>Precio Total</th></tr>";

    detalle.forEach(item => {
        // Agrega el símbolo "$" a los valores de Precio Individual y Precio Total
        const precioIndividual = `$${item.precioIndividual.toFixed(2)}`;
        const precioTotal = `$${item.precioTotal.toFixed(2)}`;

        tableHtml += `<tr><td>${item.item}</td><td>${item.producto}</td><td>${item.cantidad}</td><td>${precioIndividual}</td><td>${precioTotal}</td></tr>`;
    });

    // Agrega una fila al final para mostrar el costo total
    const costoTotalConSimbolo = `$${costoTotal.toFixed(2)}`;
    tableHtml += `<tr><td colspan="4"><strong>Total:</strong></td><td>${costoTotalConSimbolo}</td></tr>`;

    tableHtml += "</table>";

    const resultadoElement = document.getElementById('resultadoCotizacion');
    resultadoElement.innerHTML = tableHtml;
}



async function calcularCotizacion() {
let n = 0;
    //datos de cliente
    const nombreCliente = document.getElementById('nombre').value;
    const cedulaCliente = document.getElementById('cedula').value;
    const direccionCliente = document.getElementById('direccion').value;
    const numeroCliente = document.getElementById('numero').value;
    const correoCliente = document.getElementById('correo').value;

    //COSTOS
    //precio carpas sin paredes
    const precioTecho3x4 = await obtenerPrecio('carpa_3x4');
    const precioTecho4x6 = await obtenerPrecio('carpa_4x6');
    const precioTecho6x6 = await obtenerPrecio('carpa_6x6');
    const precioTecho6x8 = await obtenerPrecio('carpa_6x8');
    //precio paredes
    const precioPared3 = await obtenerPrecio('pared_3m');
    const precioPared4 = await obtenerPrecio('pared_4m');
    const precioPared6 = await obtenerPrecio('pared_6m');
    //precio mesas
    const precioMesa = await obtenerPrecio('mesa');
    const precioMesaVestida = await obtenerPrecio('mesa_vestida');
    const precioMesa_4_5_dolar = await obtenerPrecio('mesa_4_5');
    const precioMesaVestida_8_dolar = await obtenerPrecio('mesa_vestida_8');
    //manteleria
    const precioVestiduraSilla = await obtenerPrecio('vestidura_silla');
    const precioLazos = await obtenerPrecio('lazo');
    const precioManteles = await obtenerPrecio('mantel');
    const precioCubreManteles = await obtenerPrecio('cubre_mantel');

    //precio mobiliario
    const precioMobiliario = await obtenerPrecio('mobiliario_arco');

    //precio sillas
    const precioSillaSinVestir = await obtenerPrecio('silla_sin_vestir');
    const precioSillaSinVestirclientes = await obtenerPrecio('silla_sin_vestir_cliente');
    const precioSillaVestida = await obtenerPrecio('silla_vestida');
    const precioSillaVestidaNoClientes = await obtenerPrecio('silla_vestida_no_cliente');
    //precio pista de baile
    const precioPistaTablero = await obtenerPrecio('pista_tablero');
    //precio sillas y mesas para niños
    const precioSillaNino = await obtenerPrecio('silla_nino');
    const precioMesaNino = await obtenerPrecio('mesa_nino');
    //precio decoraciones
    const precioTriciclo = await obtenerPrecio('triciclo_decoracion');
    const precioBandeja = await obtenerPrecio('bandeja');
    const precioJarra = await obtenerPrecio('jarra');
    //precio combos
    const precioCombo3x4 = await obtenerPrecio('combo_carpa_3x4');
    const precioCombo4x6 = await obtenerPrecio('combo_carpa_4x6');
    const precioCombo6x6 = await obtenerPrecio('combo_carpa_6x6');
    const precioCombo6x8 = await obtenerPrecio('combo_carpa_6x8');
    const precioComboPista6x4 = await obtenerPrecio('combo_pista_6x4');
    const precioComboMesaVestidaSinVestir = await obtenerPrecio('combo_mesa_vestida_sillas_sin');
    const precioComboMesaVestidaSillasVestidas = await obtenerPrecio('combo_mesa_vestida_sillas_vestidas');
    const precioComboMesaVestidaSinVestirSC = await obtenerPrecio('combo_mesa_vestida_sillas_sin_sc');
    const precioComboMesaVestidaSillasVestidasSC = await obtenerPrecio('combo_mesa_vestida_sillas_vestidas_sc');

    //costo transporte
    const costoTransporte = parseFloat(document.getElementById('costoTransporte').value) || 0;
    //dias adicionales
    const valorxDia = parseInt(document.getElementById('valorxDia').value) || 0;
    
    //CANTIDAD DE ARTICULOS
    //cantidad de carpas
    const cantidadCarpas3x4 = parseInt(document.getElementById('carpa_3x4').value) || 0;
    const cantidadCarpa4x6 = parseInt(document.getElementById('carpa_4x6').value) || 0;
    const cantidadCarpa6x6 = parseInt(document.getElementById('carpa_6x6').value) || 0;
    const cantidadCarpa6x8 = parseInt(document.getElementById('carpa_6x8').value) || 0;

    //cantidad de paredes
    const cantidadParedes3 = parseInt(document.getElementById('pared_3m').value) || 0;
    const cantidadParedes4 = parseInt(document.getElementById('pared_4m').value) || 0;
    const cantidadParedes6 = parseInt(document.getElementById('pared_6m').value) || 0;

    //cantidad de mesas
    const cantidadMesas = parseInt(document.getElementById('mesa').value) || 0;
    const cantidadMesas_4_5_dolar = parseInt(document.getElementById('mesa_4_5').value) || 0;
    const cantidadMesasVestidas = parseInt(document.getElementById('mesa_vestida').value) || 0;
    const cantidadMesasVestidas_8_dolar = parseInt(document.getElementById('mesa_vestida_8').value) || 0;
    //cantidad manteleria
    const cantidadVestiduraSilla = parseInt(document.getElementById('vestidura_silla').value) || 0;
    const cantidadLazos = parseInt(document.getElementById('lazo').value) || 0;
    const cantidadManteles = parseInt(document.getElementById('mantel').value) || 0;
    const cantidadCubreManteles = parseInt(document.getElementById('cubre_mantel').value) || 0;

    //cantidad de sillas
    const cantidadSillasSinVestir = parseInt(document.getElementById('silla_sin_vestir').value) || 0;
    const cantidadSillasVestidas = parseInt(document.getElementById('silla_vestida').value) || 0;
    const cantidadSillasSinVestirclientes = parseInt(document.getElementById('silla_sin_vestir_cliente').value) || 0;
    const cantidadSillaVestidaNoClientes= parseInt(document.getElementById('silla_vestida_no_cliente').value) || 0;

    //cantida de tableros de pista de baile
    const cantidadPistaTableros = parseInt(document.getElementById('pista_tablero').value) || 0;

    //cantidad de silla y mesas para ninios
    const cantidadSillasNinos = parseInt(document.getElementById('silla_nino').value) || 0;
    const cantidadMesasNinos = parseInt(document.getElementById('mesa_nino').value) || 0;
    const cantidadMobiliario = parseInt(document.getElementById('mobiliario_arco').value) || 0;
    
    //cantidad de tricilos, bandejas y jarras
    const cantidadTriciclo = parseInt(document.getElementById('triciclo_decoracion').value) || 0;
    console.log("triciclo", cantidadTriciclo);
    const cantidadBandeja = parseInt(document.getElementById('bandeja').value) || 0;
    const cantidadJarra = parseInt(document.getElementById('jarra').value) || 0;
    const cantidadDias = parseInt(document.getElementById('dias').value) || 0;

    //cantidad de combos
    const cantidadCombo3x4 = obtenerNumero('combo_carpa_3x4');
    const cantidadCombo4x6 = obtenerNumero('combo_carpa_4x6');
    const cantidadCombo6x6 = obtenerNumero('combo_carpa_6x6');
    const cantidadCombo6x8 = obtenerNumero('combo_carpa_6x8');
    const cantidadComboPista6x4 = obtenerNumero('combo_pista_6x4');
    const cantidadComboMesaVestidaSinVestir = obtenerNumero('combo_mesa_vestida_sillas_sin');
    const cantidadComboMesaVestidaSillasVestidas = obtenerNumero('combo_mesa_vestida_sillas_vestidas');
    const cantidadComboMesaVestidaSinVestirSC = obtenerNumero('combo_mesa_vestida_sillas_sin_sc');
    const cantidadComboMesaVestidaSillasVestidasSC = obtenerNumero('combo_mesa_vestida_sillas_vestidas_sc');

    //CALCULO DE COSTOS
    //costo total de carpas
    const costoCarpas3x4 = precioTecho3x4 * cantidadCarpas3x4;
    const costoCarpas4x6 = precioTecho4x6 * cantidadCarpa4x6;
    const costoCarpas6x6 = precioTecho6x6 * cantidadCarpa6x6;
    const costoCarpas6x8 = precioTecho6x8 * cantidadCarpa6x8;
    //costo total de paredes
    const costoParedes3 = precioPared3 * cantidadParedes3;
    const costoParedes4 = precioPared4 * cantidadParedes4;
    const costoParedes6 = precioPared6 * cantidadParedes6;
    //costo total de mobiliario
    const costoMobiliario= precioMobiliario*cantidadMobiliario;
    //costo total de mesas
    const costoMesas = precioMesa * cantidadMesas;
    const costoMesas_4_5_dolar = precioMesa_4_5_dolar * cantidadMesas_4_5_dolar;
    const costoMesasVestidas = precioMesaVestida * cantidadMesasVestidas;
    const costoMesasVestidas_8_dolar = precioMesaVestida_8_dolar * cantidadMesasVestidas_8_dolar;
    //costo total sillas
    const costoSillasSinVestir = precioSillaSinVestir * cantidadSillasSinVestir;
    const costoSillasSinVestirclientes = precioSillaSinVestirclientes * cantidadSillasSinVestirclientes;
    const costoSillasVestidas = precioSillaVestida * cantidadSillasVestidas;
    const costoSillaVestidaNoClientes = precioSillaVestidaNoClientes * cantidadSillaVestidaNoClientes;
    //costo total pista de baile
    const costoPistaTableros = precioPistaTablero * cantidadPistaTableros;
    //costo total sillas y mesas de ninios
    const costoSillasNinos = precioSillaNino * cantidadSillasNinos;
    const costoMesasNinos = precioMesaNino * cantidadMesasNinos;

    //costo manteleria
    const costoVestiduraSilla = precioVestiduraSilla * cantidadVestiduraSilla;
    const costoLazos = precioLazos * cantidadLazos;
    const costoManteles = precioManteles * cantidadManteles;
    const costoCubreManteles = precioCubreManteles * cantidadCubreManteles;
    //Decoracion y otro
    const costoTriciclo = precioTriciclo * cantidadTriciclo;
    const costoBandeja = precioBandeja * cantidadBandeja;
    const costoJarra = precioJarra * cantidadJarra;
    //costo dias adicionales
    const costoDias = valorxDia * cantidadDias;

    //costo combos
    const costoCombo3x4 = precioCombo3x4 * cantidadCombo3x4;
    const costoCombo4x6 = precioCombo4x6 * cantidadCombo4x6;
    const costoCombo6x6 = precioCombo6x6 * cantidadCombo6x6;
    const costoCombo6x8 = precioCombo6x8 * cantidadCombo6x8;
    const costoComboPista6x4 = precioComboPista6x4 * cantidadComboPista6x4;
    const costoComboMesaVestidaSinVestir = precioComboMesaVestidaSinVestir * cantidadComboMesaVestidaSinVestir;
    const costoComboMesaVestidaSillasVestidas = precioComboMesaVestidaSillasVestidas * cantidadComboMesaVestidaSillasVestidas;
    const costoComboMesaVestidaSinVestirSC = precioComboMesaVestidaSinVestirSC * cantidadComboMesaVestidaSinVestirSC;
    const costoComboMesaVestidaSillasVestidasSC = precioComboMesaVestidaSillasVestidasSC * cantidadComboMesaVestidaSillasVestidasSC;

    document.getElementById('nombreClienteTd').textContent = nombreCliente;
    document.getElementById('cedulaClienteTd').textContent = cedulaCliente;
    document.getElementById('direccionClienteTd').textContent = direccionCliente;
    document.getElementById('numeroClienteTd').textContent = numeroCliente;
    document.getElementById('correoClienteTd').textContent = correoCliente;


    
    //costo total de todo
const costoTotal = costoCarpas3x4 + costoCarpas4x6 + costoCarpas6x6 + costoCarpas6x8 +
                   costoParedes4 + costoParedes6 + costoMesas + costoMesasVestidas +
                   costoSillasSinVestir + costoSillasVestidas + costoPistaTableros +
                   costoSillasNinos + costoMesasNinos + costoTransporte + costoMobiliario + costoSillasSinVestirclientes +
                   costoParedes3 + costoVestiduraSilla + costoLazos + costoManteles + costoCubreManteles +
                   costoSillaVestidaNoClientes + costoTriciclo + costoBandeja + costoJarra + costoDias +
                   costoMesas_4_5_dolar + costoMesasVestidas_8_dolar +
                   costoCombo3x4 + costoCombo4x6 + costoCombo6x6 + costoCombo6x8 +
                   costoComboPista6x4 + costoComboMesaVestidaSinVestir +
                   costoComboMesaVestidaSillasVestidas +
                   costoComboMesaVestidaSinVestirSC +
                   costoComboMesaVestidaSillasVestidasSC;
                       





    
    // al boton cotizador hace la funcion de pasar por parametro el costo tal a la 
const resultadoElement = document.getElementById('resultadoCotizacion');
    resultadoElement.innerHTML = `<p>El costo total de la cotización es: $${costoTotal}</p>`;

const detalleCotizacion = [];
//carpas
//agrega los elementos a la tabla para ver los detalles 
 if (cantidadCarpas3x4 > 0) {
        n += 1;
        const precioIndividual = precioTecho3x4;
        const precioTotal = precioIndividual * cantidadCarpas3x4;
        const item = n.toString();

        detalleCotizacion.push({
            item: item,
            producto: "Carpa 3x4m",
            cantidad: cantidadCarpas3x4,
            precioIndividual: precioIndividual,
            precioTotal: precioTotal
        });
    }
if (cantidadCarpa4x6 > 0) {
    n += 1;
    const precioIndividual4x6 = precioTecho4x6;
    const precioTotal4x6 = precioIndividual4x6 * cantidadCarpa4x6;
    const item = n.toString();
    
    detalleCotizacion.push({
        item: item,
        producto: "Carpa 4x6m",
        cantidad: cantidadCarpa4x6,
        precioIndividual: precioIndividual4x6,
        precioTotal: precioTotal4x6
    });
}

if (cantidadCarpa6x6 > 0) {
    n += 1;
    const precioIndividual6x6 = precioTecho6x6;
    const precioTotal6x6 = precioIndividual6x6 * cantidadCarpa6x6;
    const item = n.toString();

    detalleCotizacion.push({
        item: item,
        producto: "Carpa 6x6m",
        cantidad: cantidadCarpa6x6,
        precioIndividual: precioIndividual6x6,
        precioTotal: precioTotal6x6
    });
}

if (cantidadCarpa6x8 > 0) {
    n += 1;
    const precioIndividual6x8 = precioTecho6x8;
    const precioTotal6x8 = precioIndividual6x8 * cantidadCarpa6x8;
    const item = n.toString();

    detalleCotizacion.push({
        item: item,
        producto: "Carpa 6x8m",
        cantidad: cantidadCarpa6x8,
        precioIndividual: precioIndividual6x8,
        precioTotal: precioTotal6x8
    });
}


 //mesas
if (cantidadMesas > 0) {
    n += 1;
    const precioIndividualMesa = precioMesa;
    const precioTotalMesa = precioIndividualMesa * cantidadMesas;
    const item = n.toString();

    detalleCotizacion.push({
        item: item,
        producto: "Mesa",
        cantidad: cantidadMesas,
        precioIndividual: precioIndividualMesa,
        precioTotal: precioTotalMesa
    });
}

if (cantidadMesas_4_5_dolar > 0) {
    n += 1;
    const item = n.toString();

    detalleCotizacion.push({
        item: item,
        producto: "Mesas",
        cantidad: cantidadMesas_4_5_dolar,
        precioIndividual: precioMesa_4_5_dolar,
        precioTotal: costoMesas_4_5_dolar
    });
}
if (cantidadMesasVestidas > 0) {
    n += 1;
    const precioIndividualMesaVestida = precioMesaVestida;
    const precioTotalMesaVestida = precioIndividualMesaVestida * cantidadMesasVestidas;
    const item = n.toString();

    detalleCotizacion.push({
        item: item,
        producto: "Mesas Vestidas",
        cantidad: cantidadMesasVestidas,
        precioIndividual: precioIndividualMesaVestida,
        precioTotal: precioTotalMesaVestida
    });
}

if (cantidadMesasVestidas_8_dolar > 0) {
    n += 1;
    const item = n.toString();

    detalleCotizacion.push({
        item: item,
        producto: "Mesas Vestidas",
        cantidad: cantidadMesasVestidas_8_dolar,
        precioIndividual: precioMesaVestida_8_dolar,
        precioTotal: costoMesasVestidas_8_dolar
    });
}
//manteleria
if (cantidadVestiduraSilla > 0){
    n += 1;
    const precioIndividualVestiduraSilla = precioVestiduraSilla;
    const precioTotaVestiduraSilla = precioIndividualVestiduraSilla * cantidadVestiduraSilla;
    const item = n.toString();
    detalleCotizacion.push({
        item: item,
        producto: "Vestidura de las sillas",
        cantidad: cantidadVestiduraSilla,
        precioIndividual: precioIndividualVestiduraSilla,
        precioTotal: precioTotaVestiduraSilla
    });
}

if (cantidadLazos > 0){
    n += 1;
    const precioIndividualLazos = precioLazos;
    const precioTotalLazos = precioIndividualLazos * cantidadLazos;
    const item = n.toString();
    detalleCotizacion.push({
        item: item,
        producto: "Lazos",
        cantidad: cantidadLazos,
        precioIndividual: precioIndividualLazos,
        precioTotal: precioTotalLazos
    });
}

if (cantidadManteles > 0){
    n += 1;
    const precioIndividualManteles = precioManteles;
    const precioTotalManteles = precioIndividualManteles * cantidadManteles;
    const item = n.toString();
    detalleCotizacion.push({
        item: item,
        producto: "Manteles",
        cantidad: cantidadManteles,
        precioIndividual: precioIndividualManteles,
        precioTotal: precioTotalManteles
    });
}

if (cantidadCubreManteles > 0){
    n += 1;
    const precioIndividualCubreManteles = precioCubreManteles;
    const precioTotalCubreManteles = precioIndividualCubreManteles * cantidadCubreManteles;
    const item = n.toString();
    detalleCotizacion.push({
        item: item,
        producto: "Cubre Manteles",
        cantidad: cantidadCubreManteles,
        precioIndividual: precioIndividualCubreManteles,
        precioTotal: precioTotalCubreManteles
    });
}

if (cantidadSillasSinVestir > 0) {
    n += 1;
    const precioIndividualSillaSinVestir = precioSillaSinVestir;
    const precioTotalSillaSinVestir = precioIndividualSillaSinVestir * cantidadSillasSinVestir;
    const item = n.toString();

    detalleCotizacion.push({
        item: item,
        producto: "Sillas Sin Vestir",
        cantidad: cantidadSillasSinVestir,
        precioIndividual: precioIndividualSillaSinVestir,
        precioTotal: precioTotalSillaSinVestir
    });
}

if (cantidadSillasSinVestirclientes > 0) {
    n += 1;
    const precioIndividualSillaSinVestirclientes = precioSillaSinVestirclientes;
    const precioTotalSillaSinVestirclientes = precioIndividualSillaSinVestirclientes * cantidadSillasSinVestirclientes;
    const item = n.toString();

    detalleCotizacion.push({
        item: item,
        producto: "Sillas Sin Vestir",
        cantidad: cantidadSillasSinVestirclientes,
        precioIndividual: precioIndividualSillaSinVestirclientes,
        precioTotal: precioTotalSillaSinVestirclientes
    });
}


if (cantidadSillasVestidas > 0) {
    n += 1;
    const precioIndividualSillaVestida = precioSillaVestida;
    const precioTotalSillaVestida = precioIndividualSillaVestida * cantidadSillasVestidas;
    const item = n.toString();

    detalleCotizacion.push({
        item: item,
        producto: "Sillas Vestidas",
        cantidad: cantidadSillasVestidas,
        precioIndividual: precioIndividualSillaVestida,
        precioTotal: precioTotalSillaVestida
    });
}
if (cantidadSillaVestidaNoClientes > 0) {
    n += 1;
    const precioIndividualSillaVestidaNoCliente = precioSillaVestidaNoClientes;
    const precioTotalSillaVestidaNoCliente = precioIndividualSillaVestidaNoCliente * cantidadSillaVestidaNoClientes;
    const item = n.toString();

    detalleCotizacion.push({
        item: item,
        producto: "Sillas Vestidas",
        cantidad: cantidadSillaVestidaNoClientes,
        precioIndividual: precioIndividualSillaVestidaNoCliente,
        precioTotal: precioTotalSillaVestidaNoCliente
    });
}

if (cantidadPistaTableros > 0) {
    n += 1;
    const precioIndividual = precioPistaTablero;
    const precioTotal = precioIndividual * cantidadPistaTableros;
    const item = n.toString();

    detalleCotizacion.push({
        item: item,
        producto: "Pista de baile (Tableros)",
        cantidad: cantidadPistaTableros,
        precioIndividual: precioIndividual,
        precioTotal: precioTotal
    });
}

if (cantidadSillasNinos > 0) {
    n += 1;
    const precioIndividualSillaNino = precioSillaNino;
    const precioTotalSillaNino = precioIndividualSillaNino * cantidadSillasNinos;
    const item = n.toString();

    detalleCotizacion.push({
        item: item,
        producto: "Sillas de Niños",
        cantidad: cantidadSillasNinos,
        precioIndividual: precioIndividualSillaNino,
        precioTotal: precioTotalSillaNino
    });
}

if (cantidadMesasNinos > 0) {
    n += 1;
    const precioIndividualMesaNino = precioMesaNino;
    const precioTotalMesaNino = precioIndividualMesaNino * cantidadMesasNinos;
    const item = n.toString();

    detalleCotizacion.push({
        item: item,
        producto: "Mesas de Niños",
        cantidad: cantidadMesasNinos,
        precioIndividual: precioIndividualMesaNino,
        precioTotal: precioTotalMesaNino
    });
}

if (cantidadMobiliario > 0) {
    n += 1;
    const precioIndividualMobiliario = precioMobiliario;
    const precioTotalMobiliario = precioIndividualMobiliario * cantidadMobiliario;
    const item = n.toString();

    detalleCotizacion.push({
        item: item,
        producto: "Mobiliario de arco para globos y mesitas",
        cantidad: cantidadMobiliario,
        precioIndividual: precioIndividualMobiliario,
        precioTotal: precioTotalMobiliario
    });
}

//TRANSPORTE
if (costoTransporte > 0) {
    n += 1;
    const item = n.toString();

    detalleCotizacion.push({
        item: item,
        producto: "Costo de transporte",
        cantidad: 1,  // Puedes considerar el transporte como un único servicio
        precioIndividual: costoTransporte,
        precioTotal: costoTransporte
    });
}
//DIAS

if (cantidadDias > 0) {
    n += 1;
    const item = n.toString();

    detalleCotizacion.push({
        item: item,
        producto: "Dias Adicionales",
        cantidad: cantidadDias,  
        precioIndividual: valorxDia,
        precioTotal: costoDias
    });
}

if (cantidadParedes3 > 0) {
    n += 1;
    const item = n.toString();
    const precioIndividualPared3 = precioPared3;
    const precioTotalPared3 = precioIndividualPared3 * cantidadParedes3;

    detalleCotizacion.push({
        item: item,
        producto: "Paredes de 3 metros",
        cantidad: cantidadParedes3,
        precioIndividual: precioIndividualPared3,
        precioTotal: precioTotalPared3
    });
}

if (cantidadParedes4 > 0) {
    n += 1;
    const item = n.toString();
    const precioIndividualPared4 = precioPared4;
    const precioTotalPared4 = precioIndividualPared4 * cantidadParedes4;

    detalleCotizacion.push({
        item: item,
        producto: "Paredes de 4 metros",
        cantidad: cantidadParedes4,
        precioIndividual: precioIndividualPared4,
        precioTotal: precioTotalPared4
    });
}

if (cantidadParedes6 > 0) {
    n += 1;
    const item = n.toString();
    const precioIndividualPared6 = precioPared6;
    const precioTotalPared6 = precioIndividualPared6 * cantidadParedes6;

    detalleCotizacion.push({
        item: item,
        producto: "Paredes de 6 metros",
        cantidad: cantidadParedes6,
        precioIndividual: precioIndividualPared6,
        precioTotal: precioTotalPared6
    });
}
//Mobiliario y otros
if (cantidadTriciclo > 0) {
    n += 1;
    const item = n.toString();
    const precioIndividualTriciclo = precioTriciclo;
    const precioTotalTriciclo = precioIndividualTriciclo * cantidadTriciclo;

    detalleCotizacion.push({
        item: item,
        producto: "Triciclo de Decoración",
        cantidad: cantidadTriciclo,
        precioIndividual: precioIndividualTriciclo,
        precioTotal: precioTotalTriciclo
    });
}
if (cantidadBandeja> 0) {
    n += 1;
    const item = n.toString();
    const precioIndividualBandeja = precioBandeja;
    const precioTotalBandejas= precioIndividualBandeja * cantidadBandeja;

    detalleCotizacion.push({
        item: item,
        producto: "Bandejas",
        cantidad: cantidadBandeja,
        precioIndividual: precioIndividualBandeja,
        precioTotal: precioTotalBandejas
    });
}
if (cantidadJarra > 0) {
    n += 1;
    const item = n.toString();
    const precioIndividualJarra = precioJarra;
    const precioTotalJarra = precioIndividualJarra * cantidadJarra;

    detalleCotizacion.push({
        item: item,
        producto: "Jarras",
        cantidad: cantidadJarra,
        precioIndividual: precioIndividualJarra,
        precioTotal: precioTotalJarra
    });
}

if (cantidadCombo3x4 > 0) {
    n += 1;
    const item = n.toString();
    const precioIndividualCombo3x4 = precioCombo3x4;
    const precioTotalCombo3x4 = precioIndividualCombo3x4 * cantidadCombo3x4;

    detalleCotizacion.push({
        item: item,
        producto: "Carpa 3x4m (3 paredes)",
        cantidad: cantidadCombo3x4,
        precioIndividual: precioIndividualCombo3x4,
        precioTotal: precioTotalCombo3x4
    });
}

if (cantidadCombo4x6 > 0) {
    n += 1;
    const item = n.toString();
    const precioIndividualCombo4x6 = precioCombo4x6;
    const precioTotalCombo4x6 = precioIndividualCombo4x6 * cantidadCombo4x6;

    detalleCotizacion.push({
        item: item,
        producto: "Carpa 4x6m (3 paredes)",
        cantidad: cantidadCombo4x6,
        precioIndividual: precioIndividualCombo4x6,
        precioTotal: precioTotalCombo4x6
    });
}

if (cantidadCombo6x6 > 0) {
    n += 1;
    const item = n.toString();
    const precioIndividualCombo6x6 = precioCombo6x6;
    const precioTotalCombo6x6 = precioIndividualCombo6x6 * cantidadCombo6x6;

    detalleCotizacion.push({
        item: item,
        producto: "Carpa 6x6m (3 paredes)",
        cantidad: cantidadCombo6x6,
        precioIndividual: precioIndividualCombo6x6,
        precioTotal: precioTotalCombo6x6
    });
}

if (cantidadCombo6x8 > 0) {
    n += 1;
    const item = n.toString();
    const precioIndividualCombo6x8 = precioCombo6x8;
    const precioTotalCombo6x8 = precioIndividualCombo6x8 * cantidadCombo6x8;

    detalleCotizacion.push({
        item: item,
        producto: "Carpa 6x8m (3 paredes)",
        cantidad: cantidadCombo6x8,
        precioIndividual: precioIndividualCombo6x8,
        precioTotal: precioTotalCombo6x8
    });
}

if (cantidadComboPista6x4 > 0) {
    n += 1;
    const item = n.toString();
    const precioIndividualComboPista6x4 = precioComboPista6x4;
    const precioTotalComboPista6x4 = precioIndividualComboPista6x4 * cantidadComboPista6x4;

    detalleCotizacion.push({
        item: item,
        producto: "Pista de Baile 6x4m",
        cantidad: cantidadComboPista6x4,
        precioIndividual: precioIndividualComboPista6x4,
        precioTotal: precioTotalComboPista6x4
    });
}

if (cantidadComboMesaVestidaSinVestir > 0) {
    n += 1;
    const item = n.toString();
    const precioIndividualComboMesaVestidaSinVestir = precioComboMesaVestidaSinVestir;
    const precioTotalComboMesaVestidaSinVestir = precioIndividualComboMesaVestidaSinVestir * cantidadComboMesaVestidaSinVestir;

    detalleCotizacion.push({
        item: item,
        producto: "Mesa vestida 8 personas c/sillas sin vestir",
        cantidad: cantidadComboMesaVestidaSinVestir,
        precioIndividual: precioIndividualComboMesaVestidaSinVestir,
        precioTotal: precioTotalComboMesaVestidaSinVestir
    });
}

if (cantidadComboMesaVestidaSillasVestidas > 0) {
    n += 1;
    const item = n.toString();
    const precioIndividualComboMesaVestidaSillasVestidas = precioComboMesaVestidaSillasVestidas;
    const precioTotalComboMesaVestidaSillasVestidas = precioIndividualComboMesaVestidaSillasVestidas * cantidadComboMesaVestidaSillasVestidas;

    detalleCotizacion.push({
        item: item,
        producto: "Mesa vestida 8 personas sillas vestidas",
        cantidad: cantidadComboMesaVestidaSillasVestidas,
        precioIndividual: precioIndividualComboMesaVestidaSillasVestidas,
        precioTotal: precioTotalComboMesaVestidaSillasVestidas
    });
}

if (cantidadComboMesaVestidaSinVestirSC > 0) {
    n += 1;
    const item = n.toString();
    const precioIndividualComboMesaVestidaSinVestirSC = precioComboMesaVestidaSinVestirSC;
    const precioTotalComboMesaVestidaSinVestirSC = precioIndividualComboMesaVestidaSinVestirSC * cantidadComboMesaVestidaSinVestirSC;

    detalleCotizacion.push({
        item: item,
        producto: "Mesa vestida 8 personas c/sillas sin vestir (sc)",
        cantidad: cantidadComboMesaVestidaSinVestirSC,
        precioIndividual: precioIndividualComboMesaVestidaSinVestirSC,
        precioTotal: precioTotalComboMesaVestidaSinVestirSC
    });
}

if (cantidadComboMesaVestidaSillasVestidasSC > 0) {
    n += 1;
    const item = n.toString();
    const precioIndividualComboMesaVestidaSillasVestidasSC = precioComboMesaVestidaSillasVestidasSC;
    const precioTotalComboMesaVestidaSillasVestidasSC = precioIndividualComboMesaVestidaSillasVestidasSC * cantidadComboMesaVestidaSillasVestidasSC;

    detalleCotizacion.push({
        item: item,
        producto: "Mesa vestida 8 personas sillas vestidas (sc)",
        cantidad: cantidadComboMesaVestidaSillasVestidasSC,
        precioIndividual: precioIndividualComboMesaVestidaSillasVestidasSC,
        precioTotal: precioTotalComboMesaVestidaSillasVestidasSC
    });
}


    //enseña el detalle de la cotizacion
   mostrarDetalleCotizacion(detalleCotizacion, costoTotal);
    

}

//pdf
document.addEventListener("DOMContentLoaded", function() {
    const botonGenerarPDF = document.getElementById("downloadPDF");
    
    if (botonGenerarPDF) {
        botonGenerarPDF.addEventListener("click", function() {
            generarPDF();
        });
    }
});


document.addEventListener(
    'DOMContentLoaded',
    async function () {

        await cargarProductos();

        console.log(
            'Productos listos'
        );
    }
);

