<nav class="fixed top-0 left-0 w-full bg-blue-800/80 backdrop-blur-md shadow-lg py-4 px-8 flex items-center justify-between md:flex-col md:gap-4 z-50">
    <!-- Contenedor de navegación -->
    <div class="flex items-center justify-between w-full max-w-7xl mx-auto">
        
        <!-- Botones de navegación a la izquierda -->
        <div class="flex gap-6">
            <a href="/">
                <img src="{{ asset('icono_CDB.png') }}" alt="Crítico de Bolsillo" class="w-10 h-10 object-contain">
            </a>
            <a href="/" class="text-white font-semibold hover:bg-blue-700 px-4 py-2 rounded transition">Inicio</a>
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
        <div class="flex items-center gap-4">
            @if(Auth::check() && Auth::user()->rol === 'admin')
                <a href="{{ route('admin.index') }}" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 transition font-semibold">Panel de administración</a>
            @endif
            @auth
                <a href="{{ route('usuario.panel') }}" class="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 transition font-semibold">Mi perfil</a>
                <form action="{{ route('logout') }}" method="POST">
                    @csrf
                    <button type="submit" class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition font-semibold">Cerrar sesión</button>
                </form>
            @else
                <a href="{{ route('login') }}" class="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600 transition font-semibold">Iniciar sesión</a>
                <a href="{{ route('register') }}" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition font-semibold">Registrarse</a>
            @endauth
        </div>
    </div>
</nav>

<!-- Espaciado automático para evitar que el contenido quede oculto detrás del navbar -->
<div class="pt-[80px]"></div>
