<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Registro</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Tailwind CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen flex flex-col items-center py-16 bg-cover bg-center bg-no-repeat" style="background-image: url('{{ asset('fondo.jpg') }}');">

    @include('parts.navbar')

    <div class="bg-purple-500/50 backdrop-blur-md p-10 rounded-xl shadow-2xl w-full max-w-md mx-auto mt-12">
        <h2 class="mb-8 text-white text-center text-4xl font-bold">Registro</h2>

        <form method="POST" action="{{ route('register') }}" class="space-y-6">
            @csrf

            <div>
                <label for="name" class="block mb-2 text-white font-semibold text-lg">Nombre</label>
                <input id="name" type="text" name="nombre_usuario" value="{{ old('name') }}" required autofocus
                    class="w-full px-4 py-3 border border-purple-300 rounded-lg bg-purple-700/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300"
                    placeholder="Introduce tu nombre" />
                @error('name')
                    <span class="text-red-300 text-sm">{{ $message }}</span>
                @enderror
            </div>

            <div>
                <label for="email" class="block mb-2 text-white font-semibold text-lg">Correo electrónico</label>
                <input id="email" type="email" name="email" value="{{ old('email') }}" required
                    class="w-full px-4 py-3 border border-purple-300 rounded-lg bg-purple-700/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300"
                    placeholder="Introduce tu correo" />
                @error('email')
                    <span class="text-red-300 text-sm">{{ $message }}</span>
                @enderror
            </div>

            <div>
                <label for="password" class="block mb-2 text-white font-semibold text-lg">Contraseña</label>
                <input id="password" type="password" name="password" required
                    class="w-full px-4 py-3 border border-purple-300 rounded-lg bg-purple-700/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300"
                    placeholder="Introduce tu contraseña" />
                @error('password')
                    <span class="text-red-300 text-sm">{{ $message }}</span>
                @enderror
            </div>

            <div>
                <label for="password-confirm" class="block mb-2 text-white font-semibold text-lg">Confirmar contraseña</label>
                <input id="password-confirm" type="password" name="password_confirmation" required
                    class="w-full px-4 py-3 border border-purple-300 rounded-lg bg-purple-700/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300"
                    placeholder="Confirma tu contraseña" />
            </div>

            <button type="submit"
                class="w-full py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 hover:scale-105 transition focus:ring-2 focus:ring-purple-400">
                Registrarse
            </button>
        </form>

        <div class="mt-6 text-center">
            <a href="{{ route('login') }}" class="text-white hover:underline text-lg font-semibold">
                ¿Ya tienes cuenta? Inicia sesión
            </a>
        </div>
    </div>
    @include('parts.footer')

</body>
</html>
