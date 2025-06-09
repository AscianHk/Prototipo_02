<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Editar reseña</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>

<body class="min-h-screen flex flex-col items-center py-16 bg-cover bg-center bg-no-repeat" style="background-image: url('{{ asset('Biblios.jpg') }}');">

    @include('parts.navbar')

    <div class="bg-white/90 rounded-xl shadow-xl p-8 w-full max-w-lg mx-auto mt-8">
        <h1 class="text-3xl font-bold text-blue-900 mb-6 text-center">Editar reseña de "{{ $libro->title }}"</h1>

        <form action="{{ url('/libro/'.$libro->id.'/resenas/editar/'.$resena->id) }}" method="POST" class="space-y-6">
            @csrf

            <textarea name="texto" rows="4" class="w-full border border-blue-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-600" required>{{ old('texto', $resena->texto) }}</textarea>

            <div class="flex flex-col sm:flex-row items-center gap-4">
                <label class="font-semibold text-blue-800">Puntuación:</label>
                <select name="puntuacion" class="border border-blue-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-600" required>
                    @for($i=1; $i<=5; $i++)
                        <option value="{{ $i }}" {{ (old('puntuacion', $resena->puntuacion) == $i) ? 'selected' : '' }}>{{ $i }}</option>
                    @endfor
                </select>
            </div>

            <div class="flex flex-col sm:flex-row gap-4 mt-6">
                <button type="submit" class="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition focus:ring-2 focus:ring-blue-600">
                    Actualizar reseña
                </button>
                <a href="{{ url('/libro/'.$libro->id.'/resenas') }}" class="text-blue-700 hover:underline flex items-center">
                    Cancelar
                </a>
            </div>
        </form>
    </div>

    @include('parts.footer')
</body>
</html>
