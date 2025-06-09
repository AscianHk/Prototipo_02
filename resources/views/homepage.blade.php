<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Inicio | Crítico de Bolsillo</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-blue-900 via-purple-700 to-blue-400 min-h-screen flex flex-col items-center">

    <!-- Barra de navegación -->
    @include('parts.navbar')

    <!-- Espaciado para evitar que el contenido quede oculto detrás de la barra -->
    <div class="mt-24 w-full max-w-7xl px-6">
        <h2 class="text-4xl font-bold text-white text-center mb-10">Explora por Género</h2>
        <div id="carousels-container" class="space-y-12">
            <!-- Aquí se insertarán los carruseles dinámicamente -->
        </div>
    </div>

    <!-- Pie de página -->
    <footer class="w-full bg-purple-800 text-white py-6 mt-16 border-t border-purple-700">
        <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p class="text-sm">&copy; 2025 Crítico de Bolsillo. Todos los derechos reservados.</p>
            <div class="flex gap-6 mt-4 md:mt-0">
                <a href="https://github.com/AscianHk" class="hover:underline">Contacto</a>
                <a href="" class="hover:underline">Términos y condiciones</a>
                <a href="" class="hover:underline">Política de privacidad</a>
            </div>
        </div>
    </footer>

    <script>
        document.addEventListener("DOMContentLoaded", function () {
            const genres = ["Horror", "Drama", "Ciencia Ficción", "Fantasia", "Romance"];
            const carouselsContainer = document.getElementById("carousels-container");

            genres.forEach(genre => {
                fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&maxResults=10`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.items) {
                            const books = data.items.map(book => {
                                const bookId = book.id;
                                const title = book.volumeInfo.title || "Título desconocido";
                                const thumbnail = book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/128x192";

                                return `
                                    <div class="flex-shrink-0 w-40 p-2 transform hover:scale-105 transition-transform">
                                        <a href="/libro/${bookId}">
                                            <img src="${thumbnail}" alt="${title}" class="w-full h-56 object-cover rounded-lg shadow-md">
                                            <p class="text-sm text-white mt-2 text-center">${title}</p>
                                        </a>
                                    </div>
                                `;
                            }).join("");

                            const carousel = `
                                <div class="bg-purple-700/30 backdrop-blur-md p-8 rounded-xl shadow-xl">
                                    <h3 class="text-3xl font-bold text-white mb-6 text-center">${genre}</h3>
                                    <div class="overflow-x-auto flex gap-6 scrollbar-hide px-4 py-2">
                                        ${books}
                                    </div>
                                </div>
                            `;

                            carouselsContainer.innerHTML += carousel;
                        }
                    })
                    .catch(error => console.error("Error al obtener libros:", error));
            });
        });
    </script>

    <style>
        /* Ocultar scrollbar en los carruseles */
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
    </style>

</body>
</html>
