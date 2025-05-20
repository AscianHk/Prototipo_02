<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ $libro->title ?? 'Libro' }}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 min-h-screen flex flex-col items-center justify-center">
    <div class="bg-white/80 rounded-xl shadow-lg p-8 w-full max-w-xl">
        <h1 class="text-3xl font-bold text-blue-900 mb-6 text-center">{{ $libro->title ?? 'Sin título' }}</h1>
        <div class="flex flex-col md:flex-row gap-6 items-center">
            @if($libro->image)
                <img src="{{ $libro->image }}" alt="Portada" class="w-40 h-56 object-cover rounded shadow">
            @else
                <div class="w-40 h-56 bg-gray-200 flex items-center justify-center rounded text-gray-500">Sin imagen</div>
            @endif
            <div class="flex-1">
                <p class="mb-2"><span class="font-semibold text-blue-800">Autor(es):</span> {{ $libro->author ?? 'Desconocido' }}</p>
                <p class="mb-2"><span class="font-semibold text-blue-800">Editorial:</span> {{ $libro->publisher ?? 'Desconocida' }}</p>
                <p class="mb-2"><span class="font-semibold text-blue-800">Año de publicación:</span> {{ $libro->published_date ?? 'Desconocido' }}</p>
                <p class="mb-2"><span class="font-semibold text-blue-800">Idioma:</span> {{ $libro->language ?? 'Desconocido' }}</p>
                <p class="mb-2"><span class="font-semibold text-blue-800">Páginas:</span> {{ $libro->page_count ?? 'Desconocido' }}</p>
                <p class="mb-2"><span class="font-semibold text-blue-800">ID Google Books:</span> {{ $libro->google_id ?? 'N/A' }}</p>
            </div>
        </div>
        <div class="mt-6">
            <h2 class="text-xl font-semibold text-blue-800 mb-2">Descripción</h2>
            <p class="text-gray-800">{{ $libro->description ?? 'Sin descripción disponible.' }}</p>
        </div>
        <div class="mt-8 text-center">
            <a href="/resultado" class="text-blue-700 hover:underline">Volver a resultados</a>
        </div>
    </div>
</body>
</html>