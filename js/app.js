class Producto {
    constructor(imagen = '', nombre = '', nuevo = '', descripcion = '', coleccion = '', genero = '', precio = 0, envioGratis, precioEnvio = 0, descuento = '') {
        this.imagen = imagen;
        this.nombre = nombre;
        this.nuevo = nuevo;
        this.descripcion = descripcion;
        this.coleccion = coleccion;
        this.genero = genero;
        this.precio = parseFloat(precio);
        this.envioGratis = Boolean(envioGratis);
        this.precioEnvio = parseFloat(precioEnvio);
        this.descuento = descuento;
    }
}

export const carrito = JSON.parse(localStorage.getItem('carrito')) || [];  // Cargar carrito desde localStorage o iniciar vacío

const productos = [
    new Producto('img/jordan/jordan-1.jpg', 'Air Jordan 1 Low', 'Lo nuevo', 'Zapatillas Jordan para Hombre', 'jordan', 'hombre', 219.999, false, 10.999, ''),
    new Producto('img/jordan/jordan-2.jpg', 'Air Jordan 1 Low', '', 'Zapatillas Jordan para Hombre', 'jordan', 'hombre', 219.999, false, 10.999, '10% de descuento'),
    new Producto('img/jordan/jordan-3.jpg', 'Air Jordan 1 Mid', 'Lo nuevo', 'Zapatillas Jordan para Hombre', 'jordan', 'hombre', 239.999, false, 0, ''),
    new Producto('img/jordan/jordan-4.jpg', 'Air Jordan 1 High OG "Mauve"', 'Lo nuevo', 'Zapatillas Jordan para Hombre', 'jordan', 'hombre', 219.999, true, 0, ''),
    new Producto('img/jordan/jordan-5.jpg', 'Air Jordan 1 Retro High OG', '', 'Zapatillas Jordan para Mujer', 'jordan', 'mujer', 219.999, true, 0, ''),
    new Producto('img/jordan/jordan-6.jpg', 'Air Jordan 1 Mid', 'Lo nuevo', 'Zapatillas Jordan para Mujer', 'jordan', 'mujer', 219.999, false, 15.999, ''),
    new Producto('img/jordan/jordan-7.jpg', 'Air Jordan 1 Retro High OG', 'Lo nuevo', 'Zapatillas de Moda, Jordan para Mujer', 'jordan', 'mujer', 344.999, true, 0, ''),
    new Producto('img/jordan/jordan-7.jpg', 'Air Jordan 1 Retro High OG', 'Lo nuevo', '', 'jordan', 'mujer', 344.999, true, 0, '')

]

const cardContainer = document.getElementById('card-container');
console.log(cardContainer)
const sectionCards = document.getElementById('section-cards');

const renderizarProductos = (productos) => {
    cardContainer.innerHTML = ''; // limpiamos el contenedor

    productos.forEach(({ imagen, envioGratis, nuevo, nombre, descripcion, precio }) => {
        const productoCard = document.createElement('div');
        productoCard.classList.add("card-item");
        productoCard.innerHTML = `
        <figure><img src="${imagen}" alt=""></figure>
        <span>${envioGratis ? 'Envio gratis' : nuevo}</span>
        <h3 class="card-titulo">${nombre}</h3>
        <p class="card-descrip">${descripcion || "Descripcion no disponible"}</p>
        <p class="card-precio">${precio}</p>
        <button class="button-agregar">Agregar al carrito</button>
        `;

        cardContainer.appendChild(productoCard);
    });

    // lo convertimos a un array con arra.from
    const buttonsAgregarCarrito = Array.from(document.getElementsByClassName("button-agregar"));
    buttonsAgregarCarrito.forEach((button, index) => {
        // console.log(index);
        button.addEventListener("click", () => { agregarProducto(index) });
    });
}

const agregarProducto = (index = 0) => {
    const productoSeleccionado = productos[index];
    carrito.push(productoSeleccionado);
    // console.log("carrito", carrito);
    localStorageCarrito();
}

const localStorageCarrito = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}




/* const cargarLocalStorage = () => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(...carritoGuardado); // aniadimos los productos al carrito actual
    console.log(carrito);
} */

// cargarLocalStorage();
const filtrarProducto = Array.from(document.getElementsByClassName("filtrar-input"));

const filtrarProductosPorId = () => {
    // obtenemos los filtros activos
    const filtrosActivos = filtrarProducto // le pasamos los inputs
        .filter(input => input.checked) // solo los tildados
        .map(input => input.id.replace('filtro-', '')) // obtenemos el id
    // console.log(filtrosActivos);
    cardContainer.innerHTML = ''; // limpiamos el contenedor

    let productosFiltrados = productos;

    if (filtrosActivos.length > 0) {
        // Usamos .filter para obtener los productos que coinciden con los filtros activos
        productosFiltrados = productos.filter(producto => {
            // Si el id del filtro coincide con el genero o la coleccion del producto
            return filtrosActivos.some(filtro => producto.genero === filtro || producto.coleccion === filtro);
        });
    }

    // console.log(productosFiltrados);

    limpiarCardContainer(); // Limpia antes de mostrar el mensaje
    // si no hay productos filtrados mostramos un mensaje
    if (productosFiltrados.length === 0) {
        const alertNoDisponible = document.createElement("div");
        alertNoDisponible.classList.add("alerta-no-disponible");
        alertNoDisponible.textContent = 'No hay productos disponibles';
        cardContainer.appendChild(alertNoDisponible);
    } else {
        renderizarProductos(productosFiltrados);

    }
}

filtrarProducto.forEach(filtro => {
    filtro.addEventListener("change", filtrarProductosPorId);
})

function limpiarCardContainer() {
    // Mientras el contenedor `cardContainer` tenga al menos un hijo...
    while (cardContainer.firstChild) {
        // Elimina el primer hijo del contenedor.
        // Esto se repetirá hasta que no quede ningún hijo dentro de `cardContainer`.
        cardContainer.removeChild(cardContainer.firstChild);
    }
}
// Escucha el evento "DOMContentLoaded", que se activa cuando el DOM está completamente cargado.
document.addEventListener("DOMContentLoaded", () => {
    // mostrarCarrito();
    renderizarProductos(productos);
})