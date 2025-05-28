<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
 <script src="https://cdn.tailwindcss.com"></script>
<body>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 class="mb-6 text-center text-2xl font-bold text-blue-800">Editar Usuario</h2>
        <form method="POST" action="{{ route('admin.actualizarUsuario', $usuario->id) }}">
            @csrf
            <div class="mb-4">
                <label for="nombre_usuario" class="block text-gray-700 mb-1">Nombre de usuario</label>
                <input id="nombre_usuario" type="text" name="nombre_usuario" value="{{ old('nombre_usuario', $usuario->nombre_usuario) }}" required class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 @error('nombre_usuario') border-red-500 @enderror">
                @error('nombre_usuario')
                    <span class="text-red-500 text-sm">{{ $message }}</span>
                @enderror
            </div>
            <div class="mb-4">
                <label for="email" class="block text-gray-700 mb-1">Correo electrónico</label>
                <input id="email" type="email" name="email" value="{{ old('email', $usuario->email) }}" required class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 @error('email') border-red-500 @enderror">
                @error('email')
                    <span class="text-red-500 text-sm">{{ $message }}</span>
                @enderror
            </div>
            <div class="mb-4">
                <label for="password" class="block text-gray-700 mb-1">Nueva contraseña (opcional)</label>
                <input id="password" type="password" name="password" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 @error('password') border-red-500 @enderror">
                @error('password')
                    <span class="text-red-500 text-sm">{{ $message }}</span>
                @enderror
            </div>
            <div class="mb-6">
                <label for="rol" class="block text-gray-700 mb-1">Rol</label>
                <select id="rol" name="rol" class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option value="usuario" {{ $usuario->rol == 'usuario' ? 'selected' : '' }}>Usuario</option>
                    <option value="admin" {{ $usuario->rol == 'admin' ? 'selected' : '' }}>Administrador</option>
                </select>
            </div>
            <button type="submit" class="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition">Actualizar usuario</button>
        </form>
        <div class="mt-4 text-center">
            <a href="{{ route('admin.index') }}" class="text-blue-600 hover:underline">Volver al panel de administración</a>
        </div>
    </div>
</div>

</body>
</html>


