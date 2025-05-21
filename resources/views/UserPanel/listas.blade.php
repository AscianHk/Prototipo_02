{{-- filepath: resources/views/UserPanel/Listas.blade.php --}}
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Mis Listas</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 min-h-screen flex flex-col items-center py-10">
    <div class="bg-white/80 rounded-xl shadow-lg p-8 w-full max-w-2xl">
        <h1 class="text-2xl font-bold text-blue-900 mb-8 text-center">Mis Listas</h1>

        {{-- Favoritos --}}
        <details class="mb-6">
            <summary class="cursor-pointer font-semibold text-blue-800 text-lg bg-blue-100 px-4 py-2 rounded hover:bg-blue-200 transition">
                Favoritos
            </summary>
            <div class="mt-2 pl-4">
                @if(isset($favoritos) && count($favoritos))
                    <ul class="list-disc ml-4">
                        @foreach($favoritos as $item)
                            <li class="mb-1">{{ $item->libro->title ?? 'Sin título' }}</li>
                        @endforeach
                    </ul>
                @else
                    <p class="text-gray-600">No tienes libros favoritos.</p>
                @endif
            </div>
        </details>

        {{-- Pendiente --}}
        <details class="mb-6">
            <summary class="cursor-pointer font-semibold text-blue-800 text-lg bg-blue-100 px-4 py-2 rounded hover:bg-blue-200 transition">
                Pendiente
            </summary>
            <div class="mt-2 pl-4">
                @if(isset($pendiente) && count($pendiente))
                    <ul class="list-disc ml-4">
                        @foreach($pendiente as $item)
                            <li class="mb-1">{{ $item->libro->title ?? 'Sin título' }}</li>
                        @endforeach
                    </ul>
                @else
                    <p class="text-gray-600">No tienes libros pendientes.</p>
                @endif
            </div>
        </details>

        {{-- Leyendo --}}
        <details class="mb-6">
            <summary class="cursor-pointer font-semibold text-blue-800 text-lg bg-blue-100 px-4 py-2 rounded hover:bg-blue-200 transition">
                Leyendo
            </summary>
            <div class="mt-2 pl-4">
                @if(isset($leyendo) && count($leyendo))
                    <ul class="list-disc ml-4">
                        @foreach($leyendo as $item)
                            <li class="mb-1">{{ $item->libro->title ?? 'Sin título' }}</li>
                        @endforeach
                    </ul>
                @else
                    <p class="text-gray-600">No tienes libros en lectura.</p>
                @endif
            </div>
        </details>

        {{-- Terminado --}}
        <details class="mb-6">
            <summary class="cursor-pointer font-semibold text-blue-800 text-lg bg-blue-100 px-4 py-2 rounded hover:bg-blue-200 transition">
                Terminado
            </summary>
            <div class="mt-2 pl-4">
                @if(isset($terminado) && count($terminado))
                    <ul class="list-disc ml-4">
                        @foreach($terminado as $item)
                            <li class="mb-1">{{ $item->libro->title ?? 'Sin título' }}</li>
                        @endforeach
                    </ul>
                @else
                    <p class="text-gray-600">No tienes libros terminados.</p>
                @endif
            </div>
        </details>

        {{-- Me gusta --}}
        <details class="mb-6">
            <summary class="cursor-pointer font-semibold text-blue-800 text-lg bg-blue-100 px-4 py-2 rounded hover:bg-blue-200 transition">
                Me gusta
            </summary>
            <div class="mt-2 pl-4">
                @if(isset($me_gusta) && count($me_gusta))
                    <ul class="list-disc ml-4">
                        @foreach($me_gusta as $item)
                            <li class="mb-1">{{ $item->libro->title ?? 'Sin título' }}</li>
                        @endforeach
                    </ul>
                @else
                    <p class="text-gray-600">No tienes libros marcados como "me gusta".</p>
                @endif
            </div>
        </details>

        <div class="mt-8 text-center">
            <a href="{{ route('usuario.panel') }}" class="text-blue-700 hover:underline">Volver al panel</a>
        </div>
    </div>
</body>
</html>