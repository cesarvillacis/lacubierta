export function calcularItems(cantidades,productos) {

    const detalle = [];

    let item = 1;

    productos.forEach(producto => {

        const cantidad =
            cantidades[producto.codigo] || 0;

        if (cantidad <= 0) return;

        const precioIndividual = Number(producto.precio);

        const precioTotal = cantidad * precioIndividual;

        detalle.push({

            item,

            codigo:
                producto.codigo,

            producto:
                producto.nombre,

            cantidad,

            precioIndividual,

            precioTotal

        });

        item++;

    });

    if (cantidades.costoTransporte > 0) {

        detalle.push({
            producto: "Costo de transporte",
            cantidad: 1,
            precioIndividual: cantidades.costoTransporte,
            precioTotal: cantidades.costoTransporte
        });
    }

    if (
        cantidades.dias > 0 &&
        cantidades.valorxDia > 0
    ) {

        detalle.push({
            producto: "Días adicionales",
            cantidad: cantidades.dias,
            precioIndividual: cantidades.valorxDia,
            precioTotal:
                cantidades.dias *
                cantidades.valorxDia
        });
    }



    return detalle;
}

export function calcularTotal(detalle) {

    return detalle.reduce(

        (total, item) =>

            total + item.precioTotal,

        0

    );
}