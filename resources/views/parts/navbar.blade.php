<nav class="fixed top-0 left-0 w-full bg-blue-800/90 backdrop-blur-md shadow-lg py-4 px-6 flex items-center justify-between md:flex-col md:gap-4">
    <!-- Contenedor de navegación -->
    <div class="flex items-center justify-between w-full max-w-7xl mx-auto">
        
        <!-- Botones de navegación a la izquierda -->
        <div class="flex gap-6">
            <a href="/" class="text-white hover:bg-blue-700 px-4 py-2 rounded transition">Inicio</a>
            
        </div>

        <!-- Barra de búsqueda centrada -->
        <div class="flex-1 flex justify-center">
            <form class="flex gap-2 w-full max-w-md" action="/buscar-libro" method="GET">
                <input type="text" name="q" placeholder="Buscar libro..." required
                    class="px-4 py-2 rounded-l-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full">
                <button type="submit"
                    class="bg-blue-700 text-white px-6 py-2 font-semibold hover:bg-blue-800 transition rounded-none rounded-r-lg">
                    Buscar
                </button>
                <select name="tipo"
                    class="px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="titulo">Título</option>
                    <option value="autor">Autor</option>
                    <option value="genero">Género</option>
                    <option value="usuario">Usuario</option>
                </select>
            </form>
        </div>

        <!-- Botones de autenticación a la derecha -->
        <div class="flex gap-4">
            @auth
                <a href="{{ route('usuario.panel') }}" class="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Mi perfil</a>
                <form action="{{ route('logout') }}" method="POST">
                    @csrf
                    <button type="submit" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition">Cerrar sesión</button>
                </form>
            @else
                <a href="{{ route('login') }}" class="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Iniciar sesión</a>
                <a href="{{ route('register') }}" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition">Registrarse</a>
            @endauth
        </div>
    </div>
</nav>

<!-- Espaciado para evitar que el contenido quede oculto detrás de la barra -->
<div class="mt-24"></div>
