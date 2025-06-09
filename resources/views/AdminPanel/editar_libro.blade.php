<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Editar libro</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        @if(session('success'))
            Swal.fire({
                title: "¡Libro actualizado!",
                text: "{{ session('success') }}",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK"
            });
        @endif
    });
</script>


<body class="bg-gradient-to-br from-blue-900 via-purple-700 to-blue-400 min-h-screen flex flex-col items-center justify-center">
    @include('parts.navbar')

    <div class="bg-white/80 rounded-xl shadow-lg p-8 w-full max-w-2xl mx-auto mt-10">
        <h1 class="text-2xl font-bold text-blue-900 mb-6 text-center">Editar "{{ $libro->title }}"</h1>

        <form action="{{ url('/libro/'.$libro->id.'/actualizar') }}" method="POST" class="space-y-4">
            @csrf
            @method('PUT')

            <label class="font-semibold text-blue-800">Título:</label>
            <input type="text" name="title" value="{{ old('title', $libro->title) }}" class="w-full border border-blue-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>

            <label class="font-semibold text-blue-800">Autor(es):</label>
            <input type="text" name="author" value="{{ old('author', $libro->author) }}" class="w-full border border-blue-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">

            <label class="font-semibold text-blue-800">Editorial:</label>
            <input type="text" name="publisher" value="{{ old('publisher', $libro->publisher) }}" class="w-full border border-blue-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">

            <label class="font-semibold text-blue-800">Año de publicación:</label>
            <input type="text" name="published_date" value="{{ old('published_date', $libro->published_date) }}" class="w-full border border-blue-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">

            <label class="font-semibold text-blue-800">Idioma:</label>
            <input type="text" name="language" value="{{ old('language', $libro->language) }}" class="w-full border border-blue-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">

            <label class="font-semibold text-blue-800">Páginas:</label>
            <input type="number" name="page_count" value="{{ old('page_count', $libro->page_count) }}" class="w-full border border-blue-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">

            <label class="font-semibold text-blue-800">Descripción:</label>
            <textarea name="description" rows="4" class="w-full border border-blue-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">{{ old('description', $libro->description) }}</textarea>

            <div class="flex gap-4 mt-4">
                <button type="submit" class="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition">Actualizar libro</button>
                <a href="{{ url('/libro/'.$libro->id) }}" class="text-blue-700 hover:underline flex items-center">Cancelar</a>
            </div>
        </form>
    </div>
</body>
</html>
 