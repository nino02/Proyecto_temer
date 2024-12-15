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

// Aplicamos un fondo blanco fijo en las páginas de contacto, privacidad y sobre nosotros
if (
    window.location.pathname.includes("contacto.html") ||
    window.location.pathname.includes("privacidad.html") ||
    window.location.pathname.includes("sobrenosotros.html") || 
    window.location.pathname.includes("sobrenosotrosfix.html")
) {
    header.style.backgroundColor = "var(--white)";
    header.style.position = "fixed";
    header.style.width = "100%";
    header.style.top = "0";
    header.style.left = "0";
    header.style.zIndex = "1000";
}
