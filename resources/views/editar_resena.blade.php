<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Editar reseña</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 min-h-screen flex flex-col items-center justify-center">
    @include('parts.navbar')
    <div class="bg-white/80 rounded-xl shadow-lg p-8 w-full max-w-xl mx-auto mt-10">
        <h1 class="text-2xl font-bold text-blue-900 mb-6 text-center">Editar reseña de "{{ $libro->title }}"</h1>
        <form action="{{ url('/libro/'.$libro->id.'/resenas/editar/'.$resena->id) }}" method="POST" class="space-y-4">
            @csrf
            <textarea name="texto" rows="4" class="w-full border border-blue-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>{{ old('texto', $resena->texto) }}</textarea>
            <div>
                <label class="font-semibold text-blue-800 mr-2">Puntuación:</label>
                <select name="puntuacion" class="border border-blue-300 rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    @for($i=1; $i<=5; $i++)
                        <option value="{{ $i }}" {{ (old('puntuacion', $resena->puntuacion) == $i) ? 'selected' : '' }}>{{ $i }}</option>
                    @endfor
                </select>
            </div>
            <div class="flex gap-4 mt-4">
                <button type="submit" class="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition">Actualizar reseña</button>
                <a href="{{ url('/libro/'.$libro->id.'/resenas') }}" class="text-blue-700 hover:underline flex items-center">Cancelar</a>
            </div>
        </form>
    </div>
</body>
</html>