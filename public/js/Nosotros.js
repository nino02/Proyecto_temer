
// Array con las imágenes y sus títulos
const fotos = [
    { src: "../img/ciudades/madrid.jpg", titulo: "Madrid" },
    { src: "../img/ciudades/albacete.jpg", titulo: "Albacete" },
    { src: "../img/ciudades/alicante.jpg", titulo: "Alicante" },
    { src: "../img/ciudades/barcelona.jpg", titulo: "Barcelona" },
    { src: "../img/ciudades/bilbao.jpg", titulo: "Bilbao" },
    { src: "../img/ciudades/mallorca.jpg", titulo: "Mallorca" },
    { src: "../img/ciudades/salamanca.jpg", titulo: "Salamanca" },
    { src: "../img/ciudades/sevilla.jpg", titulo: "Sevilla" },
    { src: "../img/ciudades/valencia.jpg", titulo: "Valencia" },
    { src: "../img/ciudades/zaragoza.jpg", titulo: "Zaragoza" },
];

// Elemento del carrusel
const carrusel = document.querySelector(".carrusel");

// Inicializar la serie de fotos visibles
let inicio = 0;
const cantidadVisible = 5; // Cantidad de fotos visibles

// Crear los elementos iniciales en el carrusel
function inicializarCarrusel() {
    for (let i = 0; i < cantidadVisible; i++) {
        const fotoIndex = (inicio + i) % fotos.length;
        const item = crearItem(fotos[fotoIndex]);
        carrusel.appendChild(item);
    }
}

// Crear un elemento de foto
function crearItem(foto) {
    const item = document.createElement("div");
    item.classList.add("items");
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("img");
    const img = document.createElement("img");
    img.src = foto.src;
    img.alt = foto.titulo;
    imgDiv.appendChild(img);

    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    const h3 = document.createElement("h3");
    h3.textContent = foto.titulo;
    overlay.appendChild(h3);

    item.appendChild(imgDiv);
    item.appendChild(overlay);
    return item;
}

// Función para desplazar las fotos
function desplazarFotos() {
    // Quitar la primera foto (izquierda)
    carrusel.removeChild(carrusel.firstElementChild);

    // Calcular la siguiente foto y añadirla al final (derecha)
    const siguienteIndex = (inicio + cantidadVisible) % fotos.length;
    const nuevaFoto = crearItem(fotos[siguienteIndex]);
    carrusel.appendChild(nuevaFoto);

    // Actualizar el índice inicial
    inicio = (inicio + 1) % fotos.length;
}

// Inicializar el carrusel
inicializarCarrusel();

// Configurar el desplazamiento automático cada segundo
setInterval(desplazarFotos, 3000);

