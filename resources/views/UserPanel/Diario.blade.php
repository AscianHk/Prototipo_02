<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<script src="https://cdn.tailwindcss.com"></script>

@include('parts.navbar')

<<body class="min-h-screen flex flex-col items-end py-16 bg-cover bg-center bg-no-repeat text-white" style="background-image: url('{{ asset('Diarion.jpg') }}');">

   

    <div class="max-w-2xl ml-auto mr-auto mt-10 bg-white/30 backdrop-blur-md rounded-xl shadow-2xl p-8 self-end">
        <h1 class="text-4xl font-bold text-white mb-6 text-center">Diario de Aventuras</h1>

        {{-- Mostrar entradas existentes --}}
        @if(isset($entradas) && count($entradas))
            @foreach($entradas as $entrada)
                <div class="mb-6 border-b border-white/50 pb-4">
                    <h2 class="text-xl font-semibold text-white mb-2">Capítulo: {{ $entrada->capitulo }}</h2>
                    <p class="text-white whitespace-pre-line">{{ $entrada->texto }}</p>
                    <div class="text-xs text-gray-300 mt-2">Creado el {{ $entrada->created_at->format('d/m/Y H:i') }}</div>
                </div>
            @endforeach
        @else
            <div class="text-center text-gray-300 mb-8">
                Aún no tienes entradas en este diario.
            </div>
        @endif

        {{-- Formulario para nueva entrada --}}
        <div class="mt-8">
            <form method="POST" action="{{ route('usuario.diario.guardar', ['usuario_id' => $usuario_id, 'libro_id' => $libro_id]) }}">
                @csrf
                <div class="mb-4">
                    <label for="capitulo" class="block text-lg font-bold text-white mb-2">Capítulo:</label>
                    <input type="number" min="1" name="capitulo" id="capitulo" value="{{ old('capitulo', (isset($entradas) ? count($entradas) + 1 : 1)) }}" 
                        class="w-24 border border-white/50 rounded p-2 bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400" required>
                </div>
                <textarea name="texto" rows="6" 
                    class="w-full border border-white/50 rounded p-3 bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4" 
                    placeholder="Escribe aquí tu entrada del diario..." required>{{ old('texto') }}</textarea>
                <button type="submit" 
                    class="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 hover:scale-105 transition focus:ring-2 focus:ring-blue-400">
                    Guardar entrada
                </button>
            </form>
        </div>
    </div>
</body>
@include('parts.footer')

</html>