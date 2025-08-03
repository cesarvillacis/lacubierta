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



function calcularCotizacion() {
let n = 0;
    //datos de cliente
    const nombreCliente = document.getElementById('nombre').value;
    const cedulaCliente = document.getElementById('cedula').value;
    const direccionCliente = document.getElementById('direccion').value;
    const numeroCliente = document.getElementById('numero').value;
    const correoCliente = document.getElementById('correo').value;

    //COSTOS
    //precio carpas sin paredes
    const precioTecho3x4 = 30;
    const precioTecho4x6 = 35;
    const precioTecho6x6 = 40;
    const precioTecho6x8 = 50;
    //precio paredes
    const precioPared3 = 3;
    const precioPared4 = 4;
    const precioPared6 = 6;
    //precio mesas
    const precioMesa = 4;
    const precioMesaVestida = 7.5;
    //manteleria
    const precioVestiduraSilla = 0.75;
    const precioLazos = 0.25;
    const precioManteles = 3.5;
    const precioCubreManteles = 1;

    //precio mobiliario
    const precioMobiliario=25;

    //precio sillas
    const precioSillaSinVestir = 0.4;
    const precioSillaSinVestirclientes = 0.3;
    const precioSillaVestida = 1;
    const precioSillaVestidaNoClientes = 1.2;
    //precio pista de baile
    const precioPistaTablero = 7;
    //precio sillas y mesas para niños 
    const precioSillaNino = 0.3;
    const precioMesaNino = 2;
    //precio decoraciones
    const precioTriciclo = 3;
    const precioBandeja = 0.5;
    const precioJarra = 0.25;

    //costo transporte
    const costoTransporte = parseFloat(document.getElementById('costoTransporte').value) || 0;
    //dias adicionales
    const valorxDia = parseInt(document.getElementById('valorxDia').value) || 0;
    //CANTIDAD DE ARTICULOS
    //cantidad de carpas
    const cantidadCarpas3x4 = parseInt(document.getElementById('carpas3x4').value) || 0;
    const cantidadCarpa4x6 = parseInt(document.getElementById('carpas4x6').value) || 0;
    const cantidadCarpa6x6 = parseInt(document.getElementById('carpas6x6').value) || 0;
    const cantidadCarpa6x8 = parseInt(document.getElementById('carpas6x8').value) || 0;

    //cantidad de paredes
    const cantidadParedes3 = parseInt(document.getElementById('paredes3').value) || 0;
    const cantidadParedes4 = parseInt(document.getElementById('paredes4').value) || 0;
    const cantidadParedes6 = parseInt(document.getElementById('paredes6').value) || 0;

    //cantidad de mesas
    const cantidadMesas = parseInt(document.getElementById('mesas').value) || 0;
    const cantidadMesasVestidas = parseInt(document.getElementById('mesasVestidas').value) || 0;
    //cantidad manteleria
    const cantidadVestiduraSilla = parseInt(document.getElementById('vestidura').value) || 0;
    const cantidadLazos = parseInt(document.getElementById('lazo').value) || 0;
    const cantidadManteles = parseInt(document.getElementById('mantel').value) || 0;
    const cantidadCubreManteles = parseInt(document.getElementById('cubreMantel').value) || 0;

    //cantidad de sillas
    const cantidadSillasSinVestir = parseInt(document.getElementById('sillasSinVestir').value) || 0;
    const cantidadSillasVestidas = parseInt(document.getElementById('sillasVestidas').value) || 0;
    const cantidadSillasSinVestirclientes = parseInt(document.getElementById('sillasSinVestirclientes').value) || 0;
    const cantidadSillaVestidaNoClientes= parseInt(document.getElementById('sillasVestidasNoClientes').value) || 0;

    //cantida de tableros de pista de baile
    const cantidadPistaTableros = parseInt(document.getElementById('pistaTableros').value) || 0;

    //cantidad de silla y mesas para ninios
    const cantidadSillasNinos = parseInt(document.getElementById('sillasNinos').value) || 0;
    const cantidadMesasNinos = parseInt(document.getElementById('mesasNinos').value) || 0;
    const cantidadMobiliario = parseInt(document.getElementById('mobiliario').value) || 0;
    
    //cantidad de tricilos, bandejas y jarras
    const cantidadTriciclo = parseInt(document.getElementById('triciclo').value) || 0;
    const cantidadBandeja = parseInt(document.getElementById('bandeja').value) || 0;
    const cantidadJarra = parseInt(document.getElementById('jarra').value) || 0;
    const cantidadDias = parseInt(document.getElementById('dias').value) || 0;

    // Carpas con paredes (nuevos precios)
    const precioCarpa3x4_3paredes = 40;
    const precioCarpa4x6_3paredes = 56;
    const precioCarpa6x6_3paredes = 58;
    const precioCarpa6x8_3paredes = 72;

    // Cantidades de carpas con paredes
    const cantidadCarpa3x4_3paredes = parseInt(document.getElementById('carpa3x4_3paredes').value) || 0;
    const cantidadCarpa4x6_3paredes = parseInt(document.getElementById('carpa4x6_3paredes').value) || 0;
    const cantidadCarpa6x6_3paredes = parseInt(document.getElementById('carpa6x6_3paredes').value) || 0;
    const cantidadCarpa6x8_3paredes = parseInt(document.getElementById('carpa6x8_3paredes').value) || 0;

    // Cálculo de costos de carpas con paredes
    const costoCarpa3x4_3paredes = 40 * cantidadCarpa3x4_3paredes;
    const costoCarpa4x6_3paredes = 56 * cantidadCarpa4x6_3paredes;
    const costoCarpa6x6_3paredes = 58 * cantidadCarpa6x6_3paredes;
    const costoCarpa6x8_3paredes = 72 * cantidadCarpa6x8_3paredes;
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
    //costo total de mesas, sillas,  pista de baile
    const costoMesas = precioMesa * cantidadMesas;
    const costoMesasVestidas = precioMesaVestida * cantidadMesasVestidas;
    const costoSillasSinVestir = precioSillaSinVestir * cantidadSillasSinVestir;
    const costoSillasSinVestirclientes = precioSillaSinVestirclientes * cantidadSillasSinVestirclientes;
    const costoSillasVestidas = precioSillaVestida * cantidadSillasVestidas;
    const costoPistaTableros = precioPistaTablero * cantidadPistaTableros;
    const costoSillasNinos = precioSillaNino * cantidadSillasNinos;
    const costoMesasNinos = precioMesaNino * cantidadMesasNinos;
    const costoSillaVestidaNoClientes = precioSillaVestidaNoClientes * cantidadSillaVestidaNoClientes;
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

    document.getElementById('nombreClienteTd').textContent = nombreCliente;
    document.getElementById('cedulaClienteTd').textContent = cedulaCliente;
    document.getElementById('direccionClienteTd').textContent = direccionCliente;
    document.getElementById('numeroClienteTd').textContent = numeroCliente;
    document.getElementById('correoClienteTd').textContent = correoCliente;


    
    //costo total de todo
    const costoTotal = costoCarpas3x4 + costoCarpas4x6 + costoCarpas6x6 + costoCarpas6x8 +
                       costoCarpa3x4_3paredes + costoCarpa4x6_3paredes + costoCarpa6x6_3paredes + costoCarpa6x8_3paredes +
                       costoParedes4 + costoParedes6 + costoMesas + costoMesasVestidas +
                       costoSillasSinVestir + costoSillasVestidas + costoPistaTableros +
                       costoSillasNinos + costoMesasNinos + costoTransporte + costoMobiliario + costoSillasSinVestirclientes+
                       costoParedes3 + costoVestiduraSilla + costoLazos + costoManteles + costoCubreManteles+
                       costoSillaVestidaNoClientes + costoTriciclo + costoBandeja+ costoJarra + costoDias;
                       





    
    // al boton cotizador hace la funcion de pasar por parametro el costo tal a la 
const resultadoElement = document.getElementById('resultadoCotizacion');
    resultadoElement.innerHTML = `<p>El costo total de la cotización es: $${costoTotal}</p>`;

const detalleCotizacion = [];

//agrega los elementos a la tabla para ver los detalles 
 if (cantidadCarpas3x4 > 0) {
        n += 1;
        const precioIndividual = precioTecho3x4;
        const precioTotal = precioIndividual * cantidadCarpas3x4;
        const item = n.toString();

        detalleCotizacion.push({
            item: item,
            producto: "Carpas 3x4",
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
        producto: "Carpas 4x6",
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
        producto: "Carpas 6x6",
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
        producto: "Carpas 6x8",
        cantidad: cantidadCarpa6x8,
        precioIndividual: precioIndividual6x8,
        precioTotal: precioTotal6x8
    });
}

// Carpas con paredes
if (cantidadCarpa3x4_3paredes > 0) {
    n += 1;
    const precioIndividual = precioCarpa3x4_3paredes;
    const precioTotal = precioIndividual * cantidadCarpa3x4_3paredes;
    const item = n.toString();

    detalleCotizacion.push({
        item: item,
        producto: "Carpa 3x4 con 3 Paredes",
        cantidad: cantidadCarpa3x4_3paredes,
        precioIndividual: precioIndividual,
        precioTotal: precioTotal
    });
}
if (cantidadCarpa4x6_3paredes > 0) {
    n += 1;
    const precioIndividual = precioCarpa4x6_3paredes;
    const precioTotal = precioIndividual * cantidadCarpa4x6_3paredes;
    const item = n.toString();

    detalleCotizacion.push({
        item: item,
        producto: "Carpa 4x6 con 3 Paredes",
        cantidad: cantidadCarpa4x6_3paredes,
        precioIndividual: precioIndividual,
        precioTotal: precioTotal
    });
}
if (cantidadCarpa6x6_3paredes > 0) {
    n += 1;
    const precioIndividual = precioCarpa6x6_3paredes;
    const precioTotal = precioIndividual * cantidadCarpa6x6_3paredes;
    const item = n.toString();

    detalleCotizacion.push({
        item: item,
        producto: "Carpa 6x6 con 3 Paredes",
        cantidad: cantidadCarpa6x6_3paredes,
        precioIndividual: precioIndividual,
        precioTotal: precioTotal
    });
}
if (cantidadCarpa6x8_3paredes > 0) {
    n += 1;
    const precioIndividual = precioCarpa6x8_3paredes;
    const precioTotal = precioIndividual * cantidadCarpa6x8_3paredes;
    const item = n.toString();

    detalleCotizacion.push({
        item: item,
        producto: "Carpa 6x8 con 3 Paredes",
        cantidad: cantidadCarpa6x8_3paredes,
        precioIndividual: precioIndividual,
        precioTotal: precioTotal
    });
}

if (cantidadMesas > 0) {
    n += 1;
    const precioIndividualMesa = precioMesa;
    const precioTotalMesa = precioIndividualMesa * cantidadMesas;
    const item = n.toString();

    detalleCotizacion.push({
        item: item,
        producto: "Mesas",
        cantidad: cantidadMesas,
        precioIndividual: precioIndividualMesa,
        precioTotal: precioTotalMesa
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


    //enseña el detalle de la cotizacion
   mostrarDetalleCotizacion(detalleCotizacion, costoTotal);
    

}

// pdf
document.addEventListener("DOMContentLoaded", function() {
    const botonGenerarPDF = document.getElementById("downloadPDF");
    if (botonGenerarPDF) {
        botonGenerarPDF.addEventListener("click", function() {
            if (typeof generarPDF === "function") {
                generarPDF();
            } else {
                alert("La función generarPDF no está definida o el archivo js/pdf.js no está cargado correctamente.");
            }
        });
    }
});

// WhatsApp informe instalación
document.addEventListener("DOMContentLoaded", function() {
    const whatsappBtn = document.getElementById("whatsappSendBtn");
    if (!whatsappBtn) return;

    whatsappBtn.addEventListener("click", function() {
        // Datos del cliente
        const nombre = document.getElementById('nombre').value || '';
        const numero = document.getElementById('numero').value || '';
        const direccion = document.getElementById('direccion').value || '';
        const cedula = document.getElementById('cedula').value || '';
        const correo = document.getElementById('correo').value || '';
        // Nuevos campos
        const fechaInstalacion = document.getElementById('fechaInstalacion').value || '';
        const hora = document.getElementById('horaInstalacion').value || '';
        const referencia = document.getElementById('referencia').value || '';
        const tipoPiso = document.getElementById('tipoPiso').value || '';

        // Servicios seleccionados
        let servicios = [];
        const cantidadCarpas3x4 = parseInt(document.getElementById('carpas3x4').value) || 0;
        const cantidadParedes3 = parseInt(document.getElementById('paredes3').value) || 0;
        if (cantidadCarpas3x4 > 0) servicios.push(`carpa de 3x4 con ${cantidadParedes3} paredes`);
        const cantidadCarpa4x6 = parseInt(document.getElementById('carpas4x6').value) || 0;
        const cantidadParedes4 = parseInt(document.getElementById('paredes4').value) || 0;
        if (cantidadCarpa4x6 > 0) servicios.push(`carpa de 4x6 con ${cantidadParedes4} paredes`);
        const cantidadCarpa6x6 = parseInt(document.getElementById('carpas6x6').value) || 0;
        const cantidadParedes6 = parseInt(document.getElementById('paredes6').value) || 0;
        if (cantidadCarpa6x6 > 0) servicios.push(`carpa de 6x6 con ${cantidadParedes6} paredes`);
        const cantidadCarpa6x8 = parseInt(document.getElementById('carpas6x8').value) || 0;
        if (cantidadCarpa6x8 > 0) servicios.push(`carpa de 6x8`);
        const cantidadMesas = parseInt(document.getElementById('mesas').value) || 0;
        if (cantidadMesas > 0) servicios.push(`${cantidadMesas} mesas`);
        const cantidadMesasVestidas = parseInt(document.getElementById('mesasVestidas').value) || 0;
        if (cantidadMesasVestidas > 0) servicios.push(`${cantidadMesasVestidas} mesas vestidas`);
        const cantidadSillasSinVestir = parseInt(document.getElementById('sillasSinVestir').value) || 0;
        if (cantidadSillasSinVestir > 0) servicios.push(`${cantidadSillasSinVestir} sillas sin vestir`);
        const cantidadSillasSinVestirclientes = parseInt(document.getElementById('sillasSinVestirclientes').value) || 0;
        if (cantidadSillasSinVestirclientes > 0) servicios.push(`${cantidadSillasSinVestirclientes} sillas sin vestir (clientes)`);
        const cantidadSillasVestidas = parseInt(document.getElementById('sillasVestidas').value) || 0;
        if (cantidadSillasVestidas > 0) servicios.push(`${cantidadSillasVestidas} sillas vestidas`);
        const cantidadSillaVestidaNoClientes = parseInt(document.getElementById('sillasVestidasNoClientes').value) || 0;
        if (cantidadSillaVestidaNoClientes > 0) servicios.push(`${cantidadSillaVestidaNoClientes} sillas vestidas (no clientes)`);
        const cantidadVestiduraSilla = parseInt(document.getElementById('vestidura').value) || 0;
        if (cantidadVestiduraSilla > 0) servicios.push(`${cantidadVestiduraSilla} vestiduras de silla`);
        const cantidadLazos = parseInt(document.getElementById('lazo').value) || 0;
        if (cantidadLazos > 0) servicios.push(`${cantidadLazos} lazos`);
        const cantidadManteles = parseInt(document.getElementById('mantel').value) || 0;
        if (cantidadManteles > 0) servicios.push(`${cantidadManteles} manteles`);
        const cantidadCubreManteles = parseInt(document.getElementById('cubreMantel').value) || 0;
        if (cantidadCubreManteles > 0) servicios.push(`${cantidadCubreManteles} cubre manteles`);
        const cantidadPistaTableros = parseInt(document.getElementById('pistaTableros').value) || 0;
        if (cantidadPistaTableros > 0) servicios.push(`${cantidadPistaTableros} tableros de pista de baile`);
        const cantidadSillasNinos = parseInt(document.getElementById('sillasNinos').value) || 0;
        if (cantidadSillasNinos > 0) servicios.push(`${cantidadSillasNinos} sillas de niños`);
        const cantidadMesasNinos = parseInt(document.getElementById('mesasNinos').value) || 0;
        if (cantidadMesasNinos > 0) servicios.push(`${cantidadMesasNinos} mesas de niños`);
        const cantidadMobiliario = parseInt(document.getElementById('mobiliario').value) || 0;
        if (cantidadMobiliario > 0) servicios.push(`${cantidadMobiliario} mobiliario de arco para globos y mesitas`);
        const cantidadTriciclo = parseInt(document.getElementById('triciclo').value) || 0;
        if (cantidadTriciclo > 0) servicios.push(`${cantidadTriciclo} triciclo de decoración`);
        const cantidadBandeja = parseInt(document.getElementById('bandeja').value) || 0;
        if (cantidadBandeja > 0) servicios.push(`${cantidadBandeja} bandejas`);
        const cantidadJarra = parseInt(document.getElementById('jarra').value) || 0;
        if (cantidadJarra > 0) servicios.push(`${cantidadJarra} jarras`);
        const costoTransporte = parseFloat(document.getElementById('costoTransporte').value) || 0;
        if (costoTransporte > 0) servicios.push(`transporte`);
        const cantidadDias = parseInt(document.getElementById('dias').value) || 0;
        if (cantidadDias > 0) servicios.push(`${cantidadDias} días adicionales`);
        // Sector (puedes usar dirección o agregar un campo específico)
        const sector = direccion;

        // Mensaje final

        // Formatear fecha con día de la semana
        function formatFecha(fechaStr) {
            if (!fechaStr) return "";
            const fechaObj = new Date(fechaStr);
            const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
            const diaSemana = dias[fechaObj.getDay()];
            const dia = String(fechaObj.getDate()).padStart(2, '0');
            const mes = String(fechaObj.getMonth() + 1).padStart(2, '0');
            const anio = fechaObj.getFullYear();
            return `${diaSemana} ${dia}/${mes}/${anio}`;
        }
        const fechaInstalacionFormateada = formatFecha(fechaInstalacion);

        const mensaje = `
INFORME DE INSTALACIÓN
FECHA DE INSTALACIÓN: ${fechaInstalacionFormateada}
HORA: ${hora}
SERVICIO: ${servicios.join('\n')}
SECTOR: ${sector}
CLIENTE: ${nombre}
NÚMERO DE CONTACTO: ${numero}
DIRECCIÓN: ${direccion}
REFERENCIA: ${referencia}
TIPO DE PISO: ${tipoPiso}
        `.trim();

        const whatsappNumber = "593987593512";
        const encodedMessage = encodeURIComponent(mensaje);
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    });
});

