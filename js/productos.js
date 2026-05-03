// ========================================
// MEMORIA LOCAL DE PRODUCTOS
// ========================================

let productos = [];


// ========================================
// CARGAR TODOS LOS PRODUCTOS
// ========================================

async function cargarProductos() {

    const { data, error } =
        await window.supabaseClient
            .from('productos')
            .select('*');

    if (error) {

        console.error(
            'Error cargando productos:',
            error
        );

        return;
    }

    productos = data;

    console.log(
        'Productos cargados:',
        productos
    );
}


// ========================================
// OBTENER PRODUCTO POR CODIGO
// ========================================

function obtenerProducto(codigo) {

    return productos.find(
        producto =>
            producto.codigo === codigo
    );
}


// ========================================
// OBTENER SOLO EL PRECIO
// ========================================

function obtenerPrecio(codigo) {

    const producto =
        obtenerProducto(codigo);

    if (!producto) {

        console.warn(
            `Producto no encontrado: ${codigo}`
        );

        return 0;
    }

    return producto.precio;
}