const carritoData = JSON.parse(localStorage.getItem('carrito')) || [];
console.log(carritoData)
const carrito = carritoData;

const mostrarCarrito = () => {
    carrito.forEach(({ imagen, envioGratis, nombre, descripcion, precio, nuevo }) => {
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
                        <p>${envioGratis ? 'Envio gratis' : nuevo} </p>
                        <p>$ ${precio}</p>
                    </div>
                    <button class="carrito-item-eliminar">X</button>

                </div>
        `

        carritoSection.appendChild(mostrarCarritoDiv);
    });


}
document.addEventListener("DOMContentLoaded", () => {
    mostrarCarrito();
});