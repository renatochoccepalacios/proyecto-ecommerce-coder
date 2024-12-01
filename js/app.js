class Producto {
    constructor(imagen = '', nombre = '', nuevo = '' , descripcion = '', precio = 0, envioGratis, precioEnvio = 0, descuento = '') {
        this.imagen = imagen;
        this.nombre = nombre;
        this.nuevo = nuevo;
        this.descripcion = descripcion;
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
    new Producto('img/jordan/jordan-1.jpg',  'Air Jordan 1 Low','Lo nuevo', 'Zapatillas Jordan para Hombre', 219.999, false, 10.999, ''),
    new Producto('img/jordan/jordan-2.jpg', 'Air Jordan 1 Low','', 'Zapatillas Jordan para Hombre', 219.999, false, 10.999, '10% de descuento'),
    new Producto('img/jordan/jordan-3.jpg', 'Air Jordan 1 Mid','Lo nuevo', 'Zapatillas Jordan para Hombre', 239.999, false, 0, ''),
    new Producto('img/jordan/jordan-4.jpg', 'Air Jordan 1 High OG "Mauve"','Lo nuevo', 'Zapatillas Jordan para Hombre', 219.999, true, 0, ''),
    new Producto('img/jordan/jordan-5.jpg', 'Air Jordan 1 Retro High OG','', 'Zapatillas Jordan para Mujer', 219.999, true, 0, ''),
    new Producto('img/jordan/jordan-6.jpg', 'Air Jordan 1 Mid','Lo nuevo', 'Zapatillas Jordan para Mujer', 219.999, false, 15.999, ''),
    new Producto('img/jordan/jordan-7.jpg', 'Air Jordan 1 Retro High OG','Lo nuevo', 'Zapatillas de Moda, Jordan para Mujer', 344.999, true, 0, '')


]


productos.forEach(producto => {
    const cardContainer = document.getElementById('card-container');
    const mostrarProductos = document.createElement('div');
    mostrarProductos.classList.add("card-item");

    mostrarProductos.innerHTML = `
    <figure><img src="${producto.imagen}" alt=""></figure>
    <span>${producto.envioGratis === true ? 'Envio gratis' : producto.nuevo}</span>
    <h3 class="card-titulo">${producto.nombre}</h3>
    <p class="card-descrip">${producto.descripcion}</p>
    <p class="card-precio">${producto.precio}</p>
    <button class="button-agregar">Agregar al carrito</button>
    `;

    cardContainer.appendChild(mostrarProductos);
    console.log(mostrarProductos)

})