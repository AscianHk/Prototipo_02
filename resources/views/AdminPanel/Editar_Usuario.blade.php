<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Editar Usuario</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Tailwind CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body class="min-h-screen flex flex-col items-center py-16 bg-cover bg-center bg-no-repeat" style="background-image: url('{{ asset('Libros_Fondo.jpg') }}');">

    @include('parts.navbar')

    <div class="bg-purple-500/50 backdrop-blur-md p-10 rounded-xl shadow-2xl w-full max-w-md mx-auto mt-12">
        <h2 class="mb-8 text-white text-center text-4xl font-bold">Editar Usuario</h2>

        <form method="POST" action="{{ route('admin.actualizarUsuario', $usuario->id) }}" class="space-y-6">
            @csrf

            <div>
                <label for="nombre_usuario" class="block mb-2 text-white font-semibold text-lg">Nombre de usuario</label>
                <input id="nombre_usuario" type="text" name="nombre_usuario" value="{{ old('nombre_usuario', $usuario->nombre_usuario) }}" required
                    class="w-full px-4 py-3 border border-purple-300 rounded-lg bg-purple-700/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300"
                    placeholder="Introduce el nombre de usuario" />
                @error('nombre_usuario')
                    <span class="text-red-300 text-sm">{{ $message }}</span>
                @enderror
            </div>

            <div>
                <label for="email" class="block mb-2 text-white font-semibold text-lg">Correo electrónico</label>
                <input id="email" type="email" name="email" value="{{ old('email', $usuario->email) }}" required
                    class="w-full px-4 py-3 border border-purple-300 rounded-lg bg-purple-700/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300"
                    placeholder="Introduce el correo electrónico" />
                @error('email')
                    <span class="text-red-300 text-sm">{{ $message }}</span>
                @enderror
            </div>

            <div>
                <label for="password" class="block mb-2 text-white font-semibold text-lg">Nueva contraseña (opcional)</label>
                <input id="password" type="password" name="password"
                    class="w-full px-4 py-3 border border-purple-300 rounded-lg bg-purple-700/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300"
                    placeholder="Introduce una nueva contraseña" />
                @error('password')
                    <span class="text-red-300 text-sm">{{ $message }}</span>
                @enderror
            </div>

            <div>
                <label for="rol" class="block mb-2 text-white font-semibold text-lg">Rol</label>
                <select id="rol" name="rol"
                    class="w-full px-4 py-3 border border-purple-300 rounded-lg bg-purple-700/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-400">
                    <option value="usuario" {{ $usuario->rol == 'usuario' ? 'selected' : '' }}>Usuario</option>
                    <option value="admin" {{ $usuario->rol == 'admin' ? 'selected' : '' }}>Administrador</option>
                </select>
            </div>

            <button type="submit"
                class="w-full py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 hover:scale-105 transition focus:ring-2 focus:ring-purple-400">
                Actualizar usuario
            </button>
        </form>

        <div class="mt-6 text-center">
            <a href="{{ route('admin.index') }}" class="text-white hover:underline text-lg font-semibold">
                Volver al panel de administración
            </a>
        </div>
    </div>
</body>
</html>
