<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Iniciar Sesión</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Tailwind CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="min-h-screen flex flex-col items-center py-16 bg-cover bg-center bg-no-repeat" style="background-image: url('{{ asset('fondo.jpg') }}');">


    @include('parts.navbar')

    <div class="bg-purple-500/40 backdrop-blur-md p-10 rounded-xl shadow-2xl w-full max-w-md mx-auto mt-12">
        <h2 class="mb-8 text-white text-center text-4xl font-bold">Iniciar Sesión</h2>

        <form method="POST" action='/login' class="space-y-6">
            @csrf
            <div>
                <label for="email" class="block mb-2 text-white font-semibold text-lg">Correo electrónico</label>
                <input type="email" id="email" name="email" required autofocus
                    class="w-full px-4 py-3 border border-purple-300 rounded-lg bg-purple-700/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300"
                    placeholder="Introduce tu correo" />
            </div>
            <div>
                <label for="password" class="block mb-2 text-white font-semibold text-lg">Contraseña</label>
                <input type="password" id="password" name="password" required
                    class="w-full px-4 py-3 border border-purple-300 rounded-lg bg-purple-700/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300"
                    placeholder="Introduce tu contraseña" />
            </div>
            <button type="submit"
                class="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-purple-700 hover:scale-105 transition focus:ring-2 focus:ring-purple-400">
                Entrar
            </button>
        </form>

        <a class="block text-center mt-6 text-white hover:underline text-lg font-semibold" href="{{ route('register') }}">
            ¿No tienes cuenta? Regístrate
        </a>
    </div>
    @include('parts.footer')
</body>
</html>
