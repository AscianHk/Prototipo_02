<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ $libro->title ?? 'Libro' }}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

</head>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        @if(session('success'))
            Swal.fire({
                title: "¡Libro añadido!",
                text: "{{ session('success') }}",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK"
            });
        @endif

        @if(session('info'))
            Swal.fire({
                title: "Información",
                text: "{{ session('info') }}",
                icon: "info",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK"
            });
        @endif
    });
</script>


<body class="min-h-screen flex flex-col items-center py-16 bg-cover bg-center bg-no-repeat" style="background-image: url('{{ asset('Libro_Libro.jpg') }}');">

    @include('parts.navbar')



    <div class="bg-white/80 rounded-xl shadow-lg p-8 w-full max-w-xl">
        <h1 class="text-3xl font-bold text-blue-900 mb-6 text-center">{{ $libro->title ?? 'Sin título' }}</h1>
        <div class="flex flex-col md:flex-row gap-6 items-center">
            @if($libro->imagen_url)
                <div class="flex flex-col items-center">
                    @if($libro->imagen_url)
                        <img src="{{ $libro->imagen_url }}" alt="Portada" class="w-40 h-56 object-cover rounded shadow">
                    @else
                        <img src="{{ asset('errorsito.jpg') }}" alt="Imagen no disponible" class="w-40 h-56 object-cover rounded shadow">
                    @endif
                    <div class="mt-2 flex justify-center">
                        @php
                            $rating = $libro->average_rating ?? 0;
                            $fullStars = floor($rating);
                            $halfStar = ($rating - $fullStars) >= 0.5 ? 1 : 0;
                            $emptyStars = 5 - $fullStars - $halfStar;
                        @endphp
                        @for($i = 0; $i < $fullStars; $i++)
                            <svg class="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20"><polygon points="9.9,1.1 7.6,6.6 1.6,7.5 6,11.7 4.8,17.6 9.9,14.7 15,17.6 13.8,11.7 18.2,7.5 12.2,6.6 "/></svg>
                        @endfor
                        @if($halfStar)
                            <svg class="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                <defs>
                                    <linearGradient id="half-grad">
                                        <stop offset="50%" stop-color="currentColor"/>
                                        <stop offset="50%" stop-color="#e5e7eb"/>
                                    </linearGradient>
                                </defs>
                                <polygon fill="url(#half-grad)" points="9.9,1.1 7.6,6.6 1.6,7.5 6,11.7 4.8,17.6 9.9,14.7 15,17.6 13.8,11.7 18.2,7.5 12.2,6.6 "/>
                            </svg>
                        @endif
                        @for($i = 0; $i < $emptyStars; $i++)
                            <svg class="w-6 h-6 text-gray-300 fill-current" viewBox="0 0 20 20"><polygon points="9.9,1.1 7.6,6.6 1.6,7.5 6,11.7 4.8,17.6 9.9,14.7 15,17.6 13.8,11.7 18.2,7.5 12.2,6.6 "/></svg>
                        @endfor
                    </div>
                    <div class="text-sm text-gray-700 mt-1">
                        Puntuación media: {{ $libro->average_rating !== null ? $libro->average_rating : 'Sin puntuación' }}
                    </div>
                </div>
            @else
                <div class="w-40 h-56 bg-gray-200 flex items-center justify-center rounded text-gray-500">Sin imagen</div>
            @endif
            <div class="flex-1">
                <p class="mb-2"><span class="font-semibold text-blue-800">Autor(es):</span> {{ $libro->author ?? 'Desconocido' }}</p>
                <p class="mb-2"><span class="font-semibold text-blue-800">Editorial:</span> {{ $libro->publisher ?? 'Desconocida' }}</p>
                <p class="mb-2"><span class="font-semibold text-blue-800">Año de publicación:</span> {{ $libro->published_date ?? 'Desconocido' }}</p>
                <p class="mb-2"><span class="font-semibold text-blue-800">Idioma:</span> {{ $libro->language ?? 'Desconocido' }}</p>
                <p class="mb-2"><span class="font-semibold text-blue-800">Páginas:</span> {{ $libro->page_count ?? 'Desconocido' }}</p>
                <p class="mb-2">
                    <span class="font-semibold text-blue-800">Género:</span>
                    @if($libro->categories)
                        {{ is_array($libro->categories) ? implode(', ', $libro->categories) : implode(', ', json_decode($libro->categories, true) ?? []) }}
                    @else
                        Desconocido
                    @endif
                </p>
                <p class="mb-2"><span class="font-semibold text-blue-800">ID Google Books:</span> {{ $libro->google_id ?? 'N/A' }}</p>
            </div>
        </div>
        <div class="mt-6">
            <h2 class="text-xl font-semibold text-blue-800 mb-2">Descripción</h2>
            <p class="text-gray-800">{{ $libro->description ?? 'Sin descripción disponible.' }}</p>
        </div>
        <div class="mt-8 text-center">
            <a href="{{ route('resultado') }}" class="text-blue-700 hover:underline">
                Volver a resultados
            </a>
            @auth
            
                <form action="{{ url('/libro/' . $libro->id . '/resenas') }}" method="GET" class="mt-4">
                    <button type="submit" class="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition">
                        Ver reseñas
                    </button>
                </form>

                @if(Auth::check() && Auth::user()->rol === 'admin')
                    <a href="{{ url('/libro/'.$libro->id.'/editar') }}" class="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition mt-4 inline-block">
                        Editar libro
                    </a>
                @endif

                {{-- Barra selectora para añadir a lista --}}
                <form action="{{ route('listas.agregar') }}" method="POST" class="mt-4 flex flex-col items-center gap-2">
                    @csrf
                    <input type="hidden" name="libro_id" value="{{ $libro->id }}">
                    <label for="tipo_lista" class="font-semibold text-blue-800">Añadir a:</label>
                    <div class="flex gap-2">
                        <select name="tipo_lista" id="tipo_lista" class="border border-blue-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="favorito">Favoritos</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="leyendo">Leyendo</option>
                            <option value="terminado">Terminado</option>
                            <option value="me_gusta">Me gusta</option>
                        </select>
                        <button type="submit" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                            Añadir
                        </button>
                    </div>
                </form>
            @endauth
        </div>
    </div>
    @include('parts.footer')
</body>
</html>