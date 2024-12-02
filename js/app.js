class Producto {
    constructor(imagen = '', nombre = '', nuevo = '', descripcion = '', genero = '', precio = 0, envioGratis, precioEnvio = 0, descuento = '') {
        this.imagen = imagen;
        this.nombre = nombre;
        this.nuevo = nuevo;
        this.descripcion = descripcion;
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
    new Producto('img/jordan/jordan-1.jpg', 'Air Jordan 1 Low', 'Lo nuevo', 'Zapatillas Jordan para Hombre', 'hombre', 219.999, false, 10.999, ''),
    new Producto('img/jordan/jordan-2.jpg', 'Air Jordan 1 Low', '', 'Zapatillas Jordan para Hombre', 'hombre', 219.999, false, 10.999, '10% de descuento'),
    new Producto('img/jordan/jordan-3.jpg', 'Air Jordan 1 Mid', 'Lo nuevo', 'Zapatillas Jordan para Hombre', 'hombre', 239.999, false, 0, ''),
    new Producto('img/jordan/jordan-4.jpg', 'Air Jordan 1 High OG "Mauve"', 'Lo nuevo', 'Zapatillas Jordan para Hombre', 'hombre', 219.999, true, 0, ''),
    new Producto('img/jordan/jordan-5.jpg', 'Air Jordan 1 Retro High OG', '', 'Zapatillas Jordan para Mujer', 'mujer', 219.999, true, 0, ''),
    new Producto('img/jordan/jordan-6.jpg', 'Air Jordan 1 Mid', 'Lo nuevo', 'Zapatillas Jordan para Mujer', 'mujer', 219.999, false, 15.999, ''),
    new Producto('img/jordan/jordan-7.jpg', 'Air Jordan 1 Retro High OG', 'Lo nuevo', 'Zapatillas de Moda, Jordan para Mujer', 'mujer', 344.999, true, 0, '')
]


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




const filtrarGeneros = document.querySelectorAll(".filtrar-input");

filtrarGeneros.forEach(filtrarGenero => {
    filtrarGenero.addEventListener('change', () => {
        let productosFiltrados;

        const filtrosActivos = Array.from(filtrarGeneros)
                .filter(input => input.checked) // solo los tildados
                .map(input => input.id) // obtenemos el id
                console.log(filtrosActivos);

        if (filtrosActivos.length > 0 ){
            productosFiltrados = productos.filter( producto => filtrosActivos.includes(`filtro-${producto.genero}`));
        } else {
            productosFiltrados = productos;
        }

        renderizarProductos(productosFiltrados)
    });
});

renderizarProductos(productos);


/* 
filtrarHombre.forEach( filtroHombre => {
    mostrarProductos.innerHTML = `<figure><img src="${filtroHombre.imagen}" alt=""></figure>
<span>${filtroHombre.envioGratis === true ? 'Envio gratis' : filtroHombre.nuevo}</span>
<h3 class="card-titulo">${filtroHombre.nombre}</h3>
<p class="card-descrip">${filtroHombre.descripcion}</p>
<p class="card-precio">${filtroHombre.precio}</p>
<button class="button-agregar">Agregar al carrito</button>`
    cardContainer.appendChild(mostrarProductos);
    console.log(mostrarProductos); */



/* filtrarGenero.forEach((genero) => {
    if (genero.id === "filtro-ambos") {
        productos.find((producto) => producto.genero === 'hombre');
        console.log(productos)
    }
})
console.log(filtrarGenero)
 */
/* const filtrarPorGenero = (genero) => {

    console.log('click')
} */
