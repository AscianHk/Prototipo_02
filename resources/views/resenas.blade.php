<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Reseñas de {{ $libro->title }}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        @if(session('success'))
            Swal.fire({
                title: "¡Éxito!",
                text: "{{ session('success') }}",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK"
            });
        @endif
    });
</script>



<body class="min-h-screen flex flex-col items-center py-16 bg-cover bg-center bg-no-repeat" style="background-image: url('{{ asset('Biblios.jpg') }}');">
    {{-- Barra de navegación --}}
    @include('parts.navbar')

    {{-- Contenedor principal --}}

    <div class="bg-white/90 rounded-xl shadow-lg p-8 w-full max-w-2xl mx-auto">
        <h1 class="text-3xl font-bold text-blue-900 mb-6 text-center">Reseñas de "{{ $libro->title }}"</h1>

        @forelse($resenas as $resena)
            <div class="mb-6 bg-white shadow-md p-4 rounded-lg border border-blue-200">
                <div class="flex items-center justify-between mb-2">
                    <span class="font-semibold text-blue-800">{{ $resena->usuario->nombre_usuario ?? 'Anónimo' }}</span>
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
                        <div class="mt-3 flex gap-4">
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
        <div class="mt-8 bg-white shadow-md p-6 rounded-lg">
            <h2 class="text-xl font-semibold text-blue-800 mb-4">Escribe tu reseña</h2>
            <form action='/libro/{{$libro->id}}/resenas' method="POST" class="grid gap-4">
                @csrf
                <textarea name="texto" rows="3" class="w-full border border-blue-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tu reseña..." required>{{ old('texto') }}</textarea>
                <div class="flex items-center gap-4">
                    <label class="font-semibold text-blue-800">Puntuación:</label>
                    <select name="puntuacion" class="border border-blue-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
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
    @include('parts.footer')

</body>
</html>
