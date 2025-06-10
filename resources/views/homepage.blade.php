<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Inicio | Crítico de Bolsillo</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen flex flex-col items-center pt-[80px] pb-[80px] bg-cover bg-center bg-no-repeat" style="background-image: url('{{ asset('fondo.jpg') }}');">
    
    <!-- Barra de navegación -->
    @include('parts.navbar')

    <!-- Contenido principal -->
    <div class="w-full max-w-7xl px-6">
        <h2 class="text-4xl font-bold text-white text-center mb-10">Explora por Género</h2>
        <div id="carousels-container" class="space-y-12">
            <!-- Aquí se insertarán los carruseles dinámicamente -->
        </div>
    </div>

    <!-- Footer -->
    @include('parts.footer')

    <script>
        document.addEventListener("DOMContentLoaded", function () {
            const genres = ["Horror", "Drama", "Science Fiction", "Fantasy", "Romance"];
            const carouselsContainer = document.getElementById("carousels-container");

            genres.forEach(genre => {
                fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&maxResults=10`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.items) {
                            const books = data.items.map(book => {
                                const bookId = book.id;
                                const title = book.volumeInfo.title || "Título desconocido";
                                const thumbnail = book.volumeInfo.imageLinks?.thumbnail 
                                    ? book.volumeInfo.imageLinks.thumbnail 
                                    : "/Waldo.png"; // Usa la imagen local si no hay imagen

                                return `
                                    <div class="flex-shrink-0 w-40 p-2 transform hover:scale-105 transition-transform snap-center">
                                        <a href="/libro/${bookId}">
                                            <img src="${thumbnail}" alt="${title}" class="w-full h-56 object-cover rounded-lg shadow-md">
                                            <p class="text-sm text-white mt-2 text-center">${title}</p>
                                        </a>
                                    </div>
                                `;
                            }).join("");

                            const carousel = `
                                <div class="relative bg-purple-700/30 backdrop-blur-md p-8 rounded-xl shadow-xl">
                                    <h3 class="text-3xl font-bold text-white mb-6 text-center">${genre}</h3>

                                    <!-- Botón izquierdo -->
                                    <button class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/30 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-white/50 transition"
                                        onclick="scrollCarousel('${genre}', -1)">
                                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M12.293 16.293a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L7.414 10l4.879 4.879a1 1 0 010 1.414z"/>
                                        </svg>
                                    </button>

                                    <!-- Contenedor del carrusel -->
                                    <div id="carousel-${genre}" class="overflow-x-auto whitespace-nowrap flex gap-6 scrollbar-hide px-4 py-2 snap-x snap-mandatory">
                                        ${books}
                                    </div>

                                    <!-- Botón derecho -->
                                    <button class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/30 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-white/50 transition"
                                        onclick="scrollCarousel('${genre}', 1)">
                                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M7.707 16.293a1 1 0 001.414 0l6-6a1 1 0 000-1.414l-6-6a1 1 0 00-1.414 1.414L12.586 10l-4.879 4.879a1 1 0 000 1.414z"/>
                                        </svg>
                                    </button>
                                </div>
                            `;

                            carouselsContainer.innerHTML += carousel;
                        }
                    })
                    .catch(error => console.error("Error al obtener libros:", error));
            });
        });

        function scrollCarousel(genre, direction) {
            const carousel = document.getElementById(`carousel-${genre}`);
            const scrollAmount = carousel.clientWidth / 2; // Desplazamiento de la mitad del ancho
            carousel.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
        }
    </script>

    <style>
        /* Ocultar scrollbar en los carruseles */
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
    </style>

</body>
</html>
