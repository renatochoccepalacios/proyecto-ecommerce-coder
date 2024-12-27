const carritoData = JSON.parse(localStorage.getItem('carrito')) || [];
// console.log(carritoData)
const carrito = carritoData;
const carritoSection = document.getElementById("carrito-section");




document.addEventListener("DOMContentLoaded", () => {
    const mostrarCarrito = () => {
        carritoSection.innerHTML = ""; // Limpia la sección antes de renderizar
        if (carrito.length === 0) {
            carritoSection.innerHTML = '<h2 class="text-center">No hay productos en el carrito</h2>';
            totalCarrito();
            return;
        }

        carrito.forEach(({ imagen, nombre, descripcion, precio }) => {
            const mostrarCarritoDiv = document.createElement("div");
            mostrarCarritoDiv.classList.add("carrito-item");
            mostrarCarritoDiv.innerHTML = `
                    <figure>
                        <img src="../${imagen}" alt="">
                    </figure>
                    <div class="carrito-item-contenido">
                        <h3>${nombre}</h3>
                        <p>${descripcion || "Descripcion no disponible"}</p>
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

        asignarEventListeners()
        totalCarrito();
    }

    const eliminarProducto = (index = 0) => {
        Swal.fire({
            title: "¿Estás seguro que deseas eliminar este producto?",
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                carrito.splice(index, 1); // Eliminar el producto del array
                localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualizar localStorage
                mostrarCarrito(); // Actualizar la vista

                Swal.fire({
                    title: "¡Producto eliminado!",
                    text: "El producto ha sido eliminado del carrito.",
                    icon: "success"
                });
            }
        });
    };

    function asignarEventListeners() {
        const buttonsEliminarCarrito = Array.from(document.getElementsByClassName("carrito-item-eliminar")) || [];
        buttonsEliminarCarrito.forEach((button, index) => {
            button.addEventListener("click", () => {
                eliminarProducto(index);
                /* carritoSection.innerHTML = '';
                mostrarCarrito();
                asignarEventListeners(); // Reasignar los event listeners */
            });
        });

        

    }


    function totalCarrito() {
        const totalPrecio = document.getElementById("total-precio");
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
                    mostrarCarrito();
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
    mostrarCarrito();

    // Llamar a la función para asignar los event listeners inicialmente
    asignarEventListeners();



});