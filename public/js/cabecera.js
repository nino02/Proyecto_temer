// Seleccionamos el header
const header = document.querySelector("header");

// Función para activar/desactivar la clase "sticky"
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) { // Si el desplazamiento supera los 50px
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
});