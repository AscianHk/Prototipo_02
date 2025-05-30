{{-- filepath: resources/views/UserPanel/User_Page.blade.php --}}
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Panel de Usuario</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 min-h-screen flex flex-col items-center py-10">

    <form action="{{ route('buscar.usuario') }}" method="GET" class="mb-8 flex gap-2 justify-center w-full max-w-2xl">
        <input type="text" name="q" placeholder="Buscar usuario..." class="flex-1 border border-blue-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
        <button type="submit" class="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition">Buscar usuario</button>
    </form>

    <div class="bg-white/80 rounded-xl shadow-lg p-8 w-full max-w-2xl">
        <div class="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div>
                <img src="{{ Auth::user()->foto_perfil ?? 'https://ui-avatars.com/api/?name='.urlencode(Auth::user()->nombre_usuario) }}" alt="Foto de perfil" class="w-32 h-32 rounded-full object-cover shadow">
                <form action="{{ route('usuario.foto') }}" method="POST" enctype="multipart/form-data" class="mt-2">
                    @csrf
                    <input type="file" name="foto_perfil" class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
                    <button type="submit" class="mt-2 bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800 transition">Actualizar foto</button>
                </form>
            </div>
            <div class="flex-1">
                <h2 class="text-2xl font-bold text-blue-900">{{ Auth::user()->nombre_usuario }}</h2>
                <form action="{{ route('usuario.biografia') }}" method="POST" class="mt-2">
                    @csrf
                    <textarea name="biografia" rows="3" class="w-full border border-blue-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tu biografía...">{{ Auth::user()->biografia }}</textarea>
                    <button type="submit" class="mt-2 bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800 transition">Actualizar biografía</button>
                </form>
                <a href="{{ route('usuario.listas') }}" class="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition">Ir a mis listas</a>
                @if(Auth::user()->rol === 'admin')
                    <a href="{{ route('admin.index') }}" class="inline-block mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 transition">Panel de administración</a>
                @endif
            </div>
        </div>
        <div>
            <h3 class="text-xl font-semibold text-blue-800 mb-4">Tus reseñas</h3>
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
                <p class="text-gray-600">No has escrito ninguna reseña todavía.</p>
            @endforelse
        </div>
    </div>
</body>
</html>