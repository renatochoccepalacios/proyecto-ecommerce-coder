const carritoData = JSON.parse(localStorage.getItem('carrito')) || [];
console.log(carritoData)
const carrito = carritoData;
const carritoSection = document.getElementById("carrito-section");




document.addEventListener("DOMContentLoaded", () => {
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
        carrito.splice(index, 1); // eliminamos el producto del carrito
        localStorage.setItem('carrito', JSON.stringify(carrito)); // actualizamos el carrito
        mostrarCarrito(); // actualizamos la vista
    }

    function asignarEventListeners() {
        const buttonsEliminarCarrito = Array.from(document.getElementsByClassName("carrito-item-eliminar"));
        buttonsEliminarCarrito.forEach((button, index) => {
            button.addEventListener("click", () => {
                eliminarProducto(index);
                carritoSection.innerHTML = '';
                mostrarCarrito();
                asignarEventListeners(); // Reasignar los event listeners
            });
        });

        if (carrito.length === 0) {
            carritoSection.innerHTML = '<h2 class="text-center">No hay productos en el carrito</h2>';
        }

        const totalPrecio = document.getElementById("total-precio");
        function totalCarrito() {
            let acumulador = 0;
            carrito.forEach(({ precio }) => {
                acumulador += precio;
            });
            totalPrecio.innerHTML = `<h2>Total: $${acumulador}</h2>`;
        }

        function vaciarCarrito() {
            const botonVaciarCarrito = document.getElementById("button-vaciar");
            botonVaciarCarrito.addEventListener("click", () => {
                Swal.fire({
                    title: "¿Estás seguro que deseas vaciar el carrito?",
                    text: "Esta acción no se puede deshacer.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sí, vaciar",
                    cancelButtonText: "Cancelar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        // Vaciar el carrito
                        carrito.length = 0; 
                        localStorage.removeItem('carrito');
                        carritoSection.innerHTML = '<h2 class="text-center">No hay productos en el carrito</h2>';
                        totalCarrito();
        
                        // Mostrar mensaje de confirmación
                        Swal.fire({
                            title: "¡Carrito vacío!",
                            text: "Todos los productos han sido eliminados del carrito.",
                            icon: "success"
                        });
                    }
                });
            });
        }
        vaciarCarrito();
        totalCarrito();

    }


    mostrarCarrito();

    // Llamar a la función para asignar los event listeners inicialmente
    asignarEventListeners();



});