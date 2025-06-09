<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Resultado de la búsqueda</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen flex flex-col items-center py-16 bg-cover bg-center bg-no-repeat" style="background-image: url('{{ asset('fondo.jpg') }}');">

    @include('parts.navbar')    

    <div class="w-full max-w-7xl px-6 mt-12">
        <h1 class="text-4xl font-bold text-white text-center mb-10">Resultados de la búsqueda</h1>

        {{-- Resultados de libros --}}
        @if(isset($libros) && $libros->count() > 0)
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                @foreach($libros as $item)
                    @php
                        $info = $item['volumeInfo'];
                        $id_item = $item['id'] ?? '';
                    @endphp
                    <div class="bg-purple-500/40 backdrop-blur-md p-6 rounded-xl shadow-xl hover:scale-105 transition-transform">
                        <a href="/libro/{{ $id_item }}" class="block text-center">
                            @if(isset($info['imageLinks']['thumbnail']))
                                <img src="{{ $info['imageLinks']['thumbnail'] }}" alt="Portada" class="w-40 h-56 object-cover rounded-lg mx-auto shadow-md">
                            @else
                                <div class="w-40 h-56 bg-gray-200 flex items-center justify-center rounded-lg text-gray-500 mx-auto">Sin imagen</div>
                            @endif
                            <h2 class="text-xl font-semibold text-white mt-4 hover:underline">
                                {{ $info['title'] ?? 'Sin título' }}
                            </h2>
                        </a>
                        <p class="text-white mt-2">
                            <span class="font-semibold">Autor(es):</span>
                            {{ isset($info['authors']) ? implode(', ', $info['authors']) : 'Desconocido' }}
                        </p>
                        @if(isset($info['publishedDate']))
                            <p class="text-white"><span class="font-semibold">Año:</span> {{ $info['publishedDate'] }}</p>
                        @endif
                        @if(isset($info['description']))
                            <p class="mt-2 text-white text-sm">{{ \Illuminate\Support\Str::limit($info['description'], 150) }}</p>
                        @endif
                    </div>
                @endforeach
            </div>
            <div class="mt-12 flex justify-center">
                {{ $libros->links() }}
            </div>
        @else
            <div class="text-center text-red-300 font-semibold text-xl">No se encontraron resultados.</div>
        @endif

        {{-- Resultados de usuarios --}}
        @if(isset($usuarios) && count($usuarios) > 0)
            <div class="mt-16">
                <h2 class="text-3xl font-bold text-white text-center mb-6">Usuarios encontrados</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    @foreach($usuarios as $usuario)
                        <div class="bg-purple-500/40 backdrop-blur-md p-6 rounded-xl shadow-xl hover:scale-105 transition-transform flex items-center gap-4">
                            <img src="{{ $usuario->foto_perfil ? asset($usuario->foto_perfil) : 'https://ui-avatars.com/api/?name='.urlencode($usuario->nombre_usuario) }}" 
                                 alt="Foto" class="w-12 h-12 rounded-full object-cover shadow-md">
                            <a href="{{ route('perfil.usuario', $usuario->id) }}" class="text-white hover:underline font-semibold text-lg">
                                {{ $usuario->nombre_usuario }}
                            </a>
                        </div>
                    @endforeach
                </div>
            </div>
        @endif

        <div class="mt-16 text-center">
            <a href="/" class="text-white hover:underline text-lg font-semibold">Volver a buscar</a>
        </div>
    </div>

    @include('parts.footer')
</body>
</html>
