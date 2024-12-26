const fetchData = async () => {
    try {
        const resultado = await fetch('./productos.json');
        const data = await resultado.json();
        // console.log(data);
        return data; // Retorna los datos obtenidos
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "¡Algo salió mal al obtener los datos de los productos!",
            footer: `<a href="#">¿Por qué tengo este problema? ${error.message}</a>`,
            allowOutsideClick: false, // No permite cerrar al hacer clic fuera
            allowEscapeKey: false,   // No permite cerrar con la tecla Escape
            allowEnterKey: false,    // No permite cerrar con Enter
            showCloseButton: false,  // Oculta el botón de cerrar
            showConfirmButton: false // Oculta el botón "OK"
        });
        return []; // Devuelve un array vacío si ocurre un error
    }/*  finally {
        console.log("fetch finalizado");
    } */
};

let carrito = JSON.parse(localStorage.getItem('carrito')) || []; // Cargamos el carrito desde localStorage o inicializamos vacío

// Escucha el evento "DOMContentLoaded", que se activa cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', async () => {
    // Obtenemos el contenedor de las tarjetas
    const cardContainer = document.getElementById('card-container');
    // if (!cardContainer) {
    //     console.error('El contenedor "card-container" no se encontró.');
    //     return;
    // }
    const productos = await fetchData(); // Obtenemos los productos desde el archivo JSON

    const renderizarProductos = (productos) => {
        cardContainer.innerHTML = ''; // Limpiamos el contenedor

        // Iteramos sobre los productos y creamos las tarjetas dinámicamente
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

        // Convertimos los botones en un array para agregarles eventos
        const buttonsAgregarCarrito = Array.from(document.getElementsByClassName("button-agregar"));
        buttonsAgregarCarrito.forEach((button, index) => {
            button.addEventListener("click", () => agregarProducto(index, productos)); // Agregamos el evento "click"
            // console.log(button)
        });
    };
    renderizarProductos(productos); // Renderizamos los productos en el DOM

    const agregarProducto = (index, productos) => {
        // Obtenemos el producto seleccionado por índice
        const productoSeleccionado = productos[index];
        carrito.push(productoSeleccionado); // Lo agregamos al carrito
        localStorageCarrito(); // Guardamos el carrito en localStorage
        mostrarIconoCarrito();

        // Mostramos el mensaje con Toastify
        Toastify({
            text: `${productoSeleccionado.nombre} ha sido agregado al carrito.`,
            duration: 2000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Previene que se cierre al hacer hover
            style: {
            background: "linear-gradient(to right,rgb(0, 65, 176),rgb(61, 126, 201))",
            zIndex: 9999, // Asegura que esté encima de otros elementos
            },
        }).showToast();

    };

    const localStorageCarrito = () => {
        // Almacenamos el carrito en localStorage como un string
        localStorage.setItem('carrito', JSON.stringify(carrito));
    };

    const filtrarProducto = Array.from(document.getElementsByClassName("filtrar-input")); // Obtenemos los inputs de filtros

    const filtrarProductosPorId = () => {
        // Obtenemos los filtros activos
        const filtrosActivos = filtrarProducto
            .filter(input => input.checked) // Solo los tildados
            .map(input => input.id.replace('filtro-', '')); // Obtenemos el id sin el prefijo

        cardContainer.innerHTML = ''; // Limpiamos el contenedor

        let productosFiltrados = productos;

        if (filtrosActivos.length > 0) {
            // Usamos .filter para obtener los productos que coinciden con los filtros activos
            productosFiltrados = productos.filter(producto => {
                // Si el id del filtro coincide con el genero o la coleccion del producto
                return filtrosActivos.some(filtro => producto.genero === filtro || producto.coleccion === filtro);
            });
        }

        limpiarCardContainer(); // Limpia antes de mostrar el mensaje

        if (productosFiltrados.length === 0) {
            // Mostramos un mensaje si no hay productos disponibles
            const alertNoDisponible = document.createElement("div");
            alertNoDisponible.classList.add("alerta-no-disponible");
            alertNoDisponible.textContent = 'No hay productos disponibles';
            cardContainer.appendChild(alertNoDisponible);
        } else {
            renderizarProductos(productosFiltrados); // Renderizamos los productos filtrados
        }
    };

    filtrarProducto.forEach(filtro => {
        filtro.addEventListener("change", filtrarProductosPorId); // Agregamos eventos "change" a los filtros
    });

    function limpiarCardContainer() {
        // Mientras el contenedor `cardContainer` tenga al menos un hijo...
        while (cardContainer.firstChild) {
            // Elimina el primer hijo del contenedor.
            cardContainer.removeChild(cardContainer.firstChild);
        }
    }

    function mostrarIconoCarrito() {
        const iconoCarrito = document.getElementById("span-icono-carrito");
        iconoCarrito.textContent = carrito.length; // Mostramos la cantidad de productos en el carrito
    }
    mostrarIconoCarrito()

});
