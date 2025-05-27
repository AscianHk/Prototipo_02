<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Perfil de Usuario</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 min-h-screen flex flex-col items-center py-10">

    {{-- Barra de búsqueda de usuarios arriba de todo --}}
    <form action="{{ route('buscar.usuario') }}" method="GET" class="mb-8 flex gap-2 justify-center w-full max-w-2xl">
        <input type="text" name="q" placeholder="Buscar usuario..." class="flex-1 border border-blue-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
        <button type="submit" class="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition">Buscar usuario</button>
    </form>

    <div class="bg-white/80 rounded-xl shadow-lg p-8 w-full max-w-2xl">
        <div class="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div>
                <img src="{{ $usuario->foto_perfil ?? 'https://ui-avatars.com/api/?name='.urlencode($usuario->nombre_usuario) }}" alt="Foto de perfil" class="w-32 h-32 rounded-full object-cover shadow">
            </div>
            <div class="flex-1">
                <h2 class="text-2xl font-bold text-blue-900">{{ $usuario->nombre_usuario }}</h2>
                <div class="mt-2 bg-blue-50 rounded p-3 text-blue-900 min-h-[60px]">
                    {{ $usuario->biografia ?? 'Sin biografía.' }}
                </div>
                @if(Auth::id() !== $usuario->id)
                    @php
                        $yaSigues = \DB::table('follows')
                            ->where('seguidor_id', Auth::id())
                            ->where('seguido_id', $usuario->id)
                            ->exists();
                    @endphp
                    <div class="flex gap-2 mt-4">
                        @if($yaSigues)
                            <button type="button" class="bg-green-600 text-white px-4 py-2 rounded cursor-default">Siguiendo</button>
                            <form action="{{ route('usuario.dejar-seguir', $usuario->id) }}" method="POST">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
                                    Dejar de seguir
                                </button>
                            </form>
                        @else
                            <form action="{{ route('usuario.seguir', $usuario->id) }}" method="POST">
                                @csrf
                                <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition">
                                    Seguir usuario
                                </button>
                            </form>
                        @endif
                    </div>
                @endif
            </div>
        </div>
        <div>
            <h3 class="text-xl font-semibold text-blue-800 mb-4">Reseñas</h3>
            @forelse($resenas as $resena)
                <div class="mb-4 border-b border-blue-200 pb-2">
                    <div class="flex items-center mb-1">
                        <span class="font-semibold text-blue-800 mr-2">{{ $resena->libro->title ?? 'Libro desconocido' }}</span>
                        <span class="text-yellow-500">
                            @for($i = 0; $i < $resena->puntuacion; $i++)
                                ★
                            @endfor
                            @for($i = $resena->puntuacion; $i < 5; $i++)
                                <span class="text-gray-300">★</span>
                            @endfor
                        </span>
                    </div>
                    <div class="text-gray-800">{{ $resena->texto }}</div>
                    <div class="text-xs text-gray-500 mt-1">Publicado el {{ $resena->created_at->format('d/m/Y H:i') }}</div>
                </div>
            @empty
                <p class="text-gray-600">Este usuario no ha escrito ninguna reseña todavía.</p>
            @endforelse
        </div>
    </div>
</body>
</html>