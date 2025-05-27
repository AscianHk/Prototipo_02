<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Resultado</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 min-h-screen flex flex-col items-center justify-center">
    <div class="bg-white/80 rounded-xl shadow-lg p-8 w-full max-w-2xl">
        <h1 class="text-2xl font-bold text-blue-900 mb-6 text-center">Resultado de la búsqueda</h1>
        @php
            $resultado = session('resultado');
        @endphp

        @if(isset($resultado['items']) && count($resultado['items']) > 0)
            <div class="grid gap-6">
                @foreach($resultado['items'] as $item)
                    @php
                        $info = $item['volumeInfo'];
                        $id_item = $item['id'] ?? '';
                    @endphp
                    <div class="flex gap-4 bg-white rounded-lg shadow p-4">
                        @if(isset($info['imageLinks']['thumbnail']))
                            <a href="/libro/{{ $id_item }}">
                                <img src="{{ $info['imageLinks']['thumbnail'] }}" alt="Portada" class="w-24 h-32 object-cover rounded">
                            </a>
                        @else
                            <div class="w-24 h-32 bg-gray-200 flex items-center justify-center rounded text-gray-500">Sin imagen</div>
                        @endif
                        <div>
                            <a href="/libro/{{ $id_item }}">
                                <h2 class="text-xl font-semibold text-blue-800 hover:underline">
                                    {{ $info['title'] ?? 'Sin título' }}
                                </h2>
                            </a>
                            <p class="text-gray-700">
                                <span class="font-semibold">Autor(es):</span>
                                {{ isset($info['authors']) ? implode(', ', $info['authors']) : 'Desconocido' }}
                            </p>
                            @if(isset($info['publishedDate']))
                                <p class="text-gray-600"><span class="font-semibold">Año:</span> {{ $info['publishedDate'] }}</p>
                            @endif
                            @if(isset($info['description']))
                                <p class="mt-2 text-gray-800 text-sm">{{ \Illuminate\Support\Str::limit($info['description'], 200) }}</p>
                            @endif
                        </div>
                    </div>
                @endforeach
            </div>
        @else
            <div class="text-center text-red-700 font-semibold">No se encontraron resultados.</div>
        @endif
        @php
            $usuarios = session('usuarios');
        @endphp

        @if(isset($usuarios) && count($usuarios) > 0)
            <div class="mb-8">
                <h2 class="text-xl font-bold text-blue-800 mb-4">Usuarios encontrados</h2>
                <ul>
                    @foreach($usuarios as $usuario)
                        <li class="mb-2 flex items-center gap-3">
                            <img src="{{ $usuario->foto_perfil ?? 'https://ui-avatars.com/api/?name='.urlencode($usuario->nombre_usuario) }}" alt="Foto" class="w-10 h-10 rounded-full object-cover">
                            <a href="{{ route('perfil.usuario', $usuario->id) }}" class="text-blue-700 hover:underline font-semibold">
                                {{ $usuario->nombre_usuario }}
                            </a>
                        </li>
                    @endforeach
                </ul>
            </div>
        @endif
        <div class="mt-8 text-center">
            <a href="/" class="text-blue-700 hover:underline">Volver a buscar</a>
        </div>
    </div>
</body>
</html>