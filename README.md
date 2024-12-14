# Portal de Reservas de Hoteles

Este proyecto es un portal de reservas de hoteles enfocado en fomentar el consumo nacional. Permite a los usuarios buscar hoteles en las principales ciudades de España, comparar precios y realizar reservas. El proyecto ha sido desarrollado como parte de una asignatura universitaria, integrando tanto conocimientos teóricos como prácticos adquiridos durante el curso.

## Características del Proyecto

- **Búsqueda de hoteles:** Los usuarios pueden buscar hoteles introduciendo el destino, fechas de entrada y salida, y número de adultos.
- **Interfaz intuitiva:** Diseño responsivo con una experiencia de usuario optimizada.
- **Resultados dinámicos:** Los hoteles se muestran como tarjetas generadas dinámicamente a partir de datos obtenidos de una API.
- **Filtros avanzados:** Ordenación de resultados por precio, valoración y nombre.
- **Validación de formularios:** Control en tiempo real de los parámetros introducidos por los usuarios.
- **Integración con API externa:** Uso de la API de MakCorps para obtener datos en tiempo real sobre hoteles.

## Tecnologías Utilizadas

- **Frontend:**
  - HTML5, CSS3, JavaScript.
  - Bibliotecas y recursos como [w3schools](https://www.w3schools.com) y [GeeksforGeeks](https://www.geeksforgeeks.org) para referencias y ejemplos.
- **Backend:**
  - Node.js con Express.js.
  - Axios para la comunicación con APIs externas.
- **Gestión del proyecto:**
  - GitHub para control de versiones y colaboración.
  - IDE utilizado: Visual Studio Code.

## Estructura del Proyecto

root/ │── public/ │ ├── css/ │ ├── js/ │ ├── img/ │ ├── secciones/ │── mapping_city/ │── server.js │── package.json │── README.md

- **`public/`:** Contiene los recursos de frontend, incluyendo las hojas de estilo, imágenes y scripts.
- **`server.js`:** Archivo principal del servidor Node.js.
- **`package.json`:** Lista de dependencias y configuración del proyecto.

## Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/nino02/Proyecto_temer.git
   cd Proyecto_temer
   npm install
    node server.js
   ```
Capturas de Pantalla
Página principal

Resultados de búsqueda

Contribuciones
Este proyecto fue desarrollado por:

Antonio
Khalil
Jaime
Jesús
Cada integrante se encargó de partes específicas del desarrollo, distribuyendo las responsabilidades de forma equilibrada. Para más detalles, consulta la documentación completa del proyecto.

Licencia
Este proyecto es parte de un trabajo académico y no está destinado a uso comercial. Sin embargo, puedes utilizar el código como referencia para aprender o desarrollar proyectos similares.
