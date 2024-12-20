const carritoData = JSON.parse(localStorage.getItem('carrito')) || [];
console.log(carritoData)
const carrito = carritoData;
const carritoSection = document.getElementById("carrito-section");

const mostrarCarrito = () => {
    carrito.forEach(({ imagen, nombre, descripcion, precio }) => {
        const mostrarCarritoDiv = document.createElement("div");
        mostrarCarritoDiv.classList.add("carrito-item");
        const carritoSection = document.getElementById("carrito-section");
        mostrarCarritoDiv.innerHTML = `
                <figure>
                    <img src="../${imagen}" alt="">
                </figure>
                <div class="carrito-item-contenido">
                    <h3>${nombre}</h3>
                    <p>Z${descripcion}</p>
                    <div class="contador-precio-contenedor">
                        <div class="contador-contenedor">
                            <a href="">-</a>
                            <span class="cantidad">1</span>
                            <a href="">+</a>
                        </div>
                        <p>$ ${precio}</p>
                    </div>
                        <div class="eliminar-carrito-div">
                            <button class="carrito-item-eliminar">Eliminar del carrito</button>
                        </div>
                    </div>
        `

        carritoSection.appendChild(mostrarCarritoDiv);
    });
}

const eliminarProducto = (index) => {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}


document.addEventListener("DOMContentLoaded", () => {
    mostrarCarrito();
    
    const buttonsEliminarCarrito = Array.from(document.getElementsByClassName("carrito-item-eliminar"));
    buttonsEliminarCarrito.forEach((button, index) => {
        button.addEventListener("click", () => {
            eliminarProducto(index);
            // carritoSection.innerHTML = '';
            mostrarCarrito()
        });
    });

    
    if (carrito.length === 0) {
        carritoSection.innerHTML = '<h2 class="text-center">No hay productos en el carrito</h2>';
    }
});