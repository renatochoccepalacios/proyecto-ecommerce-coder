const btnHamburguer = document.getElementById("btn-hamburguer");
const aside = document.getElementById("aside-principal");

btnHamburguer.addEventListener("click", () => {
    aside.classList.contains("aside-visible") // si aside tiene la clase de "aside-visible"
        // removemos la clase "aside-visible" y agregamos "aside-oculto"
        ? (aside.classList.remove("aside-visible"), aside.classList.add("aside-oculto"))
        // si no agregamos la clase "aside-visible" y removemos "aside-oculto"
        : (aside.classList.add("aside-visible"), aside.classList.remove("aside-oculto"));
});