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

    total() {
        let calculoTotal;
        // si envio es gratis
        if (this.envioGratis) {
            // va a calcular el precio * la cantidad
            calculoTotal = (this.precio * this.cantidad);
            return `El total es ${calculoTotal}`;
        } else {
            // sino va a multiplicar el precio por la cantidad + el precio del envio
            calculoTotal = (this.precio * this.cantidad) + this.precioEnvio;
            return `El total + envio es ${calculoTotal}`;
        }
    }
}

const productos = [
    new Producto('img/jordan/jordan-1.jpg', 'Air Jordan 1 Low', 'Lo nuevo', 'Zapatillas Jordan para Hombre', 'jordan', 'hombre', 219.999, false, 10.999, ''),
    new Producto('img/jordan/jordan-2.jpg', 'Air Jordan 1 Low', '', 'Zapatillas Jordan para Hombre', 'jordan', 'hombre', 219.999, false, 10.999, '10% de descuento'),
    new Producto('img/jordan/jordan-3.jpg', 'Air Jordan 1 Mid', 'Lo nuevo', 'Zapatillas Jordan para Hombre', 'jordan', 'hombre', 239.999, false, 0, ''),
    new Producto('img/jordan/jordan-4.jpg', 'Air Jordan 1 High OG "Mauve"', 'Lo nuevo', 'Zapatillas Jordan para Hombre', 'jordan', 'hombre', 219.999, true, 0, ''),
    new Producto('img/jordan/jordan-5.jpg', 'Air Jordan 1 Retro High OG', '', 'Zapatillas Jordan para Mujer', 'jordan', 'mujer', 219.999, true, 0, ''),
    new Producto('img/jordan/jordan-6.jpg', 'Air Jordan 1 Mid', 'Lo nuevo', 'Zapatillas Jordan para Mujer', 'jordan', 'mujer', 219.999, false, 15.999, ''),
    new Producto('img/jordan/jordan-7.jpg', 'Air Jordan 1 Retro High OG', 'Lo nuevo', 'Zapatillas de Moda, Jordan para Mujer', 'jordan', 'mujer', 344.999, true, 0, '')
]

console.log(productos)
const cardContainer = document.getElementById('card-container');

const renderizarProductos = (productos) => {
    cardContainer.innerHTML = ''; // limpiamos el contenedor
    productos.forEach(producto => {
        const productoCard = document.createElement('div');
        productoCard.classList.add("card-item");
        productoCard.innerHTML = `
        <figure><img src="${producto.imagen}" alt=""></figure>
        <span>${producto.envioGratis === true ? 'Envio gratis' : producto.nuevo}</span>
        <h3 class="card-titulo">${producto.nombre}</h3>
        <p class="card-descrip">${producto.descripcion}</p>
        <p class="card-precio">${producto.precio}</p>
        <button class="button-agregar">Agregar al carrito</button>
        `;

        cardContainer.appendChild(productoCard);
        console.log(productoCard);
    });
}

const filtrarProducto = document.querySelectorAll(".filtrar-input");

const filtrarProductosPorId = () => {
    // obtenemos los filtros activos
    const filtrosActivos = Array.from(filtrarProducto) // le pasamos los inputs
        .filter(input => input.checked) // solo los tildados
        .map(input => input.id.replace('filtro-', '')) // obtenemos el id
    console.log(filtrosActivos);

    let productosFiltrados = productos;

    if (filtrosActivos.length > 0) {
        // Usamos .filter para obtener los productos que coinciden con los filtros activos
        productosFiltrados = productos.filter(producto => {

            if (filtrosActivos > 0) {
                            // Si el id del filtro coincide con el genero o la coleccion del producto
                return filtrosActivos.some(filtro => producto.genero === filtro || producto.coleccion === filtro);            
            } else {
                const alertNoDisponible = document.createElement("div");
                alertNoDisponible.textContent = 'Producto no disponible';
                console.log(alertNoDisponible);
            }
            // if(filtrosActivos < 0)
        });
    }

    renderizarProductos(productosFiltrados);
}

filtrarProducto.forEach(filtro => {
    filtro.addEventListener("change", filtrarProductosPorId);
})

renderizarProductos(productos);