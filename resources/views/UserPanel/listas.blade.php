{{-- filepath: resources/views/UserPanel/listas.blade.php --}}
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Mis Listas</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>
    document.addEventListener("DOMContentLoaded", function () {
        const deleteButtons = document.querySelectorAll(".delete-btn");

        deleteButtons.forEach(button => {
            button.addEventListener("click", function () {
                const form = this.closest(".delete-form");

                Swal.fire({
                    title: "¿Estás seguro?",
                    text: "El libro será eliminado de la lista.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Sí, eliminar",
                    cancelButtonText: "Cancelar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        form.submit(); // Envía el formulario si el usuario confirma
                    }
                });
            });
        });

        // Mostrar alerta después de eliminar el libro
        @if(session('success'))
            Swal.fire({
                title: "Libro eliminado",
                text: "Has eliminado el libro de la lista.",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK"
            });
        @endif
    });
</script>


<body class="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 min-h-screen flex flex-col items-center py-10">

    @include('parts.navbar')


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
                            <li class="mb-3 flex items-center gap-3">
                                <a href="{{ url('/libro/' . $item->libro->google_id) }}" class="flex items-center gap-2 group">
                                    <img src="{{ $item->libro->imagen_url ?? 'https://via.placeholder.com/40x60?text=Sin+imagen' }}"
                                        alt="Portada"
                                        class="w-10 h-14 object-cover rounded shadow group-hover:scale-105 transition" />
                                    <span class="text-blue-900 group-hover:underline">{{ $item->libro->title ?? 'Sin título' }}</span>
                                </a>

                                <!-- Formulario de eliminación con SweetAlert -->
                                <form class="delete-form" action="{{ route('listas.eliminar', $item->id) }}" method="POST">
                                    @csrf
                                    @method('DELETE')
                                    <button type="button" class="text-red-600 hover:text-red-800 font-bold delete-btn" title="Eliminar">
                                        ✕
                                    </button>
                                </form>

                                <a href="{{ route('usuario.diario', ['usuario_id' => Auth::id(), 'libro_id' => $item->libro->id]) }}"
                                class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition ml-2"
                                title="Diario de aventuras">
                                    Diario de aventuras
                                </a>
                            </li>
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
                            <li class="mb-3 flex items-center gap-3">
                                <a href="{{ url('/libro/' . $item->libro->google_id) }}" class="flex items-center gap-2 group">
                                    <img src="{{ $item->libro->imagen_url ?? 'https://via.placeholder.com/40x60?text=Sin+imagen' }}"
                                        alt="Portada"
                                        class="w-10 h-14 object-cover rounded shadow group-hover:scale-105 transition" />
                                    <span class="text-blue-900 group-hover:underline">{{ $item->libro->title ?? 'Sin título' }}</span>
                                </a>
                                <form action="{{ route('listas.eliminar', $item->id) }}" method="POST" class="ml-2">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="text-red-600 hover:text-red-800 font-bold" title="Eliminar">
                                        ✕
                                    </button>
                                </form>
                                <a href="{{ route('usuario.diario', ['usuario_id' => Auth::id(), 'libro_id' => $item->libro->id]) }}"
                                   class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition ml-2"
                                   title="Diario de aventuras">
                                    Diario de aventuras
                                </a>
                            </li>
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
                            <li class="mb-3 flex items-center gap-3">
                                <a href="{{ url('/libro/' . $item->libro->google_id) }}" class="flex items-center gap-2 group">
                                    <img src="{{ $item->libro->imagen_url ?? 'https://via.placeholder.com/40x60?text=Sin+imagen' }}"
                                        alt="Portada"
                                        class="w-10 h-14 object-cover rounded shadow group-hover:scale-105 transition" />
                                    <span class="text-blue-900 group-hover:underline">{{ $item->libro->title ?? 'Sin título' }}</span>
                                </a>
                                <form action="{{ route('listas.eliminar', $item->id) }}" method="POST" class="ml-2">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="text-red-600 hover:text-red-800 font-bold" title="Eliminar">
                                        ✕
                                    </button>
                                </form>
                                <a href="{{ route('usuario.diario', ['usuario_id' => Auth::id(), 'libro_id' => $item->libro->id]) }}"
                                   class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition ml-2"
                                   title="Diario de aventuras">
                                    Diario de aventuras
                                </a>
                            </li>
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
                            <li class="mb-3 flex items-center gap-3">
                                <a href="{{ url('/libro/' . $item->libro->google_id) }}" class="flex items-center gap-2 group">
                                    <img src="{{ $item->libro->imagen_url ?? 'https://via.placeholder.com/40x60?text=Sin+imagen' }}"
                                        alt="Portada"
                                        class="w-10 h-14 object-cover rounded shadow group-hover:scale-105 transition" />
                                    <span class="text-blue-900 group-hover:underline">{{ $item->libro->title ?? 'Sin título' }}</span>
                                </a>
                                <form action="{{ route('listas.eliminar', $item->id) }}" method="POST" class="ml-2">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="text-red-600 hover:text-red-800 font-bold" title="Eliminar">
                                        ✕
                                    </button>
                                </form>
                                <a href="{{ route('usuario.diario', ['usuario_id' => Auth::id(), 'libro_id' => $item->libro->id]) }}"
                                   class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition ml-2"
                                   title="Diario de aventuras">
                                    Diario de aventuras
                                </a>
                            </li>
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
                            <li class="mb-3 flex items-center gap-3">
                                <a href="{{ url('/libro/' . $item->libro->google_id) }}" class="flex items-center gap-2 group">
                                    <img src="{{ $item->libro->imagen_url ?? 'https://via.placeholder.com/40x60?text=Sin+imagen' }}"
                                        alt="Portada"
                                        class="w-10 h-14 object-cover rounded shadow group-hover:scale-105 transition" />
                                    <span class="text-blue-900 group-hover:underline">{{ $item->libro->title ?? 'Sin título' }}</span>
                                </a>
                                <form action="{{ route('listas.eliminar', $item->id) }}" method="POST" class="ml-2">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="text-red-600 hover:text-red-800 font-bold" title="Eliminar">
                                        ✕
                                    </button>
                                </form>
                                <a href="{{ route('usuario.diario', ['usuario_id' => Auth::id(), 'libro_id' => $item->libro->id]) }}"
                                   class="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition ml-2"
                                   title="Diario de aventuras">
                                    Diario de aventuras
                                </a>
                            </li>
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


