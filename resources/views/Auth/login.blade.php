<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Iniciar Sesión</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Tailwind CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 text-gray-100 flex items-center justify-center min-h-screen m-0">
    <div class="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 class="mb-6 text-teal-300 text-center text-2xl font-bold">Iniciar Sesión</h2>
        <form method="POST" action='/login'>
            @csrf
            <div class="mb-4">
                <label for="email" class="block mb-2 text-gray-100">Correo electrónico</label>
                <input type="email" id="email" name="email" required autofocus
                    class="w-full px-3 py-2 border border-teal-300 rounded bg-gray-900 text-gray-100 focus:outline-none focus:border-teal-400" />
            </div>
            <div class="mb-4">
                <label for="password" class="block mb-2 text-gray-100">Contraseña</label>
                <input type="password" id="password" name="password" required
                    class="w-full px-3 py-2 border border-teal-300 rounded bg-gray-900 text-gray-100 focus:outline-none focus:border-teal-400" />
            </div>
            <button type="submit"
                class="w-full py-3 bg-teal-300 text-gray-900 font-bold rounded hover:bg-teal-400 transition-colors mt-4">
                Entrar
            </button>
        </form>
        <a class="block text-center mt-4 text-teal-300 hover:underline" href="{{ route('register') }}">
            ¿No tienes cuenta? Regístrate
        </a>
    </div>
</body>
</html>
