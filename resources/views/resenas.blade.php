<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div class="bg-white/80 rounded-xl shadow-lg p-8 w-full max-w-xl mx-auto mt-10">
    <h1 class="text-2xl font-bold text-blue-900 mb-4 text-center">Reseñas de "{{ $libro->title }}"</h1>
    @forelse($resenas as $resena)
        <div class="mb-6 border-b border-blue-200 pb-4">
            <div class="flex items-center mb-2">
                <span class="font-semibold text-blue-800 mr-2">{{ $resena->usuario->nombre_usuario ?? 'Anónimo' }}</span>
                <span class="text-yellow-500 text-lg">
                    @for($i = 0; $i < $resena->puntuacion; $i++)
                        ★
                    @endfor
                    @for($i = $resena->puntuacion; $i < 5; $i++)
                        <span class="text-gray-300">★</span>
                    @endfor
                </span>
            </div>
            <div class="text-gray-800 bg-blue-50 rounded p-3">{{ $resena->texto }}</div>
            <div class="text-xs text-gray-500 mt-1">Publicado el {{ $resena->created_at->format('d/m/Y H:i') }}</div>
            @auth
                @if($resena->usuario_id === auth()->id())
                    <div class="mt-2 flex gap-2">
                        <a href="{{ url('/libro/'.$libro->id.'/resenas/editar/'.$resena->id) }}" class="text-blue-600 hover:underline">Editar</a>
                        <a href="{{ url('/libro/'.$libro->id.'/resenas/borrar/'.$resena->id) }}" class="text-red-600 hover:underline" onclick="return confirm('¿Seguro que quieres borrar esta reseña?')">Borrar</a>
                    </div>
                @endif
            @endauth
        </div>
    @empty
        <p class="text-center text-gray-600">No hay reseñas para este libro todavía.</p>
    @endforelse

    {{-- Formulario para nueva reseña --}}
    @auth
    <div class="mt-8">
        <h2 class="text-lg font-semibold text-blue-800 mb-2">Escribe tu reseña</h2>
        <form action='/libro/{{$libro->id}}/resenas' method="POST" class="space-y-4">
            @csrf
            <textarea name="texto" rows="3" class="w-full border border-blue-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tu reseña..." required>{{ old('texto') }}</textarea>
            <div>
                <label class="font-semibold text-blue-800 mr-2">Puntuación:</label>
                <select name="puntuacion" class="border border-blue-300 rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                    <option value="">Selecciona</option>
                    @for($i=1; $i<=5; $i++)
                        <option value="{{ $i }}" {{ old('puntuacion') == $i ? 'selected' : '' }}>{{ $i }}</option>
                    @endfor
                </select>
            </div>
            <button type="submit" class="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition">Enviar reseña</button>
        </form>
    </div>
    @else
        <div class="mt-8 text-center text-blue-800">Inicia sesión para dejar una reseña.</div>
    @endauth

    <div class="mt-8 text-center">
        <a href="{{ url('/libro/'.$libro->id) }}" class="text-blue-700 hover:underline">Volver al libro</a>
    </div>
</div>



</body>
</html>