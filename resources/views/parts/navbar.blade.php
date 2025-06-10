<nav class="fixed top-0 left-0 w-full bg-blue-800/80 backdrop-blur-md shadow-lg py-4 px-6 flex items-center justify-between z-50">
    <div class="flex items-center justify-between w-full max-w-7xl mx-auto">
        
        <!-- Logo y botones a la izquierda -->
        <div class="flex items-center gap-4">
            <a href="/">
                <img src="{{ asset('icono_CDB.png') }}" alt="Crítico de Bolsillo" class="w-10 h-10 object-contain">
            </a>
            @auth
                <div class="hidden md:flex items-center gap-4">
                    <!-- Botón "Mi perfil" -->
                    <a href="{{ route('usuario.panel') }}" class="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full flex items-center gap-2 shadow-md transition">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2a4 4 0 110 8 4 4 0 010-8zm-6 14a6 6 0 1112 0H4z"/>
                        </svg>
                        Mi perfil
                    </a>

                    <!-- Botón "Mis listas" -->
                    <a href="{{ route('usuario.listas') }}" class="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2 rounded-full flex items-center gap-2 shadow-md transition">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2v8h10V6H5zm2 2h6v2H7V8z"/>
                        </svg>
                        Mis listas
                    </a>
                </div>
            @endauth
            <button id="menu-toggle" class="block md:hidden text-white text-2xl focus:outline-none">
                ☰
            </button>
        </div>

        <!-- Menú de navegación en escritorio -->
        <div class="hidden md:flex flex-row items-center gap-6">
            <!-- Barra de búsqueda -->
            <form class="flex gap-2 w-full sm:w-auto max-w-md" action="/buscar-libro" method="GET">
                <input type="text" name="q" placeholder="Buscar libro..." required
                    class="px-4 py-2 rounded-l-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full">
                <button type="submit"
                    class="bg-blue-700 text-white px-6 py-2 font-semibold hover:bg-blue-800 transition rounded-none rounded-r-lg">
                    Buscar
                </button>

                <!-- Selector mejorado -->
                <select name="tipo"
                    class="appearance-none bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 shadow-md hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="titulo">Título</option>
                    <option value="autor">Autor</option>
                    <option value="genero">Género</option>
                    <option value="usuario">Usuario</option>
                </select>
            </form>

            <!-- Botones de autenticación -->
            <div class="flex flex-wrap justify-center md:justify-end gap-4">
                @if(Auth::check() && Auth::user()->rol === 'admin')
                    <a href="{{ route('admin.index') }}" class="bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-lg font-bold shadow-md transition flex items-center gap-2">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 3h14a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1zm1 2v10h12V5H4zm2 2h8v2H6V7zm0 4h8v2H6v-2z"/>
                        </svg>
                        Panel de administración
                    </a>
                @endif
                @auth
                    <form action="{{ route('logout') }}" method="POST">
                        @csrf
                        <button type="submit" class="bg-red-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-500 transition font-semibold">
                            Cerrar sesión
                        </button>
                    </form>
                @else
                    <a href="{{ route('login') }}" class="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-500 transition font-semibold">
                        Iniciar sesión
                    </a>
                    <a href="{{ route('register') }}" class="bg-green-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-500 transition font-semibold">
                        Registrarse
                    </a>
                @endauth
            </div>
        </div>
    </div>

    <!-- Menú desplegable en móviles -->
    <div id="menu" class="hidden absolute top-full left-0 w-full bg-blue-900/90 backdrop-blur-md shadow-lg flex flex-col items-center space-y-4 py-6 transition-all duration-300 ease-in-out">
        
        <!-- Barra de búsqueda -->
        <form class="flex flex-col items-center gap-2 w-full px-4" action="/buscar-libro" method="GET">
            <input type="text" name="q" placeholder="Buscar libro..." required
                class="px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full">
            <button type="submit"
                class="bg-blue-700 text-white px-6 py-2 font-semibold hover:bg-blue-800 transition rounded-lg">
                Buscar
            </button>

            <!-- Selector mejorado -->
            <select name="tipo"
                class="appearance-none bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 shadow-md hover:bg-purple-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="titulo">Título</option>
                <option value="autor">Autor</option>
                <option value="genero">Género</option>
                <option value="usuario">Usuario</option>
            </select>
        </form>

        <!-- Botones de autenticación -->
        <div class="flex flex-col items-center gap-4">
            @if(Auth::check() && Auth::user()->rol === 'admin')
                <a href="{{ route('admin.index') }}" class="bg-red-600 hover:bg-red-500 text-white px-5 py-2 rounded-lg font-bold shadow-md transition flex items-center gap-2">
                    Panel de administración
                </a>
            @endif
            @auth
                <form action="{{ route('logout') }}" method="POST">
                    @csrf
                    <button type="submit" class="bg-red-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-500 transition font-semibold">
                        Cerrar sesión
                    </button>
                </form>
            @else
                <a href="{{ route('login') }}" class="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-500 transition font-semibold">
                    Iniciar sesión
                </a>
                <a href="{{ route('register') }}" class="bg-green-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-500 transition font-semibold">
                    Registrarse
                </a>
            @endauth
        </div>
    </div>
</nav>

<script>
    document.getElementById('menu-toggle').addEventListener('click', function () {
        document.getElementById('menu').classList.toggle('hidden');
    });
</script>
