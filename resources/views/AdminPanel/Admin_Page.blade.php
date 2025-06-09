<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Panel de Administración</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        @if(session('success'))
            Swal.fire({
                title: "¡Usuario creado!",
                text: "{{ session('success') }}",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK"
            });
        @endif
    });
</script>


<body class="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 min-h-screen flex flex-col items-center py-10">

    @include('parts.navbar')

    <div class="bg-white/90 rounded-xl shadow-lg p-8 w-full max-w-3xl">
        <h1 class="text-3xl font-bold text-blue-900 mb-8 text-center">Panel de Administración</h1>

        {{-- Crear nuevo perfil --}}
        <div class="mb-10">
            <h2 class="text-xl font-semibold text-blue-800 mb-4">Crear nuevo perfil</h2>
            <form action="{{ route('admin.crearUsuario') }}" method="POST" class="flex flex-col gap-4">
                @csrf
                <input type="text" name="nombre_usuario" placeholder="Nombre de usuario" required class="border border-blue-300 rounded p-2">
                <input type="email" name="email" placeholder="Email" required class="border border-blue-300 rounded p-2">
                <input type="password" name="password" placeholder="Contraseña" required class="border border-blue-300 rounded p-2">
                <select name="rol" class="border border-blue-300 rounded p-2">
                    <option value="usuario">Usuario</option>
                    <option value="admin">Administrador</option>
                </select>
                <button type="submit" class="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition">Crear perfil</button>
            </form>
        </div>

        {{-- Modificar perfiles existentes --}}
        <div>
            <h2 class="text-xl font-semibold text-blue-800 mb-4">Modificar perfiles</h2>
            <table class="w-full text-left mb-4">
                <thead>
                    <tr>
                        <th class="py-2">ID</th>
                        <th class="py-2">Usuario</th>
                        <th class="py-2">Email</th>
                        <th class="py-2">Rol</th>
                        <th class="py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($usuarios as $usuario)
                        <tr class="border-b">
                            <td class="py-2">{{ $usuario->id }}</td>
                            <td class="py-2">{{ $usuario->nombre_usuario }}</td>
                            <td class="py-2">{{ $usuario->email }}</td>
                            <td class="py-2">{{ $usuario->rol }}</td>
                            <td class="py-2 flex gap-2">
                                <a href="{{ route('admin.editarUsuario', $usuario->id) }}" class="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition">Editar</a>
                                
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>