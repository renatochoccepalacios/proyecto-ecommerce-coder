const btnHamburguer = document.getElementById("btn-hamburguer");
const aside = document.getElementById("aside-principal");
console.log(btnHamburguer);

btnHamburguer.addEventListener("click", () => {

    if (aside.classList.contains("aside-visible")) {
        aside.classList.remove("aside-visible");
        aside.classList.add("aside-oculto");
    } else {
        aside.classList.add("aside-visible");
        aside.classList.remove("aside-oculto");
    }
})