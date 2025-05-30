<header class="sticky top-0 z-50 w-full border-b border-white/20 bg-black/20 backdrop-blur supports-[backdrop-filter]:bg-black/10">
    <div class="container mx-auto flex h-16 items-center px-4">
        <!-- Mobile menu button -->
        <button class="md:hidden mr-4" onclick="toggleMobileMenu()">
            <i data-lucide="menu" class="h-5 w-5"></i>
        </button>
        
        <!-- Logo -->
        <div class="flex items-center gap-2 mr-6">
            <a href="{{ route('home') }}" class="flex items-center gap-2">
                <i data-lucide="book-open" class="h-5 w-5 text-blue-400"></i>
                <span class="text-lg font-semibold hidden sm:block">Crítico de Bolsillo</span>
            </a>
        </div>
        
        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-6 mr-6">
            <a href="{{ route('home') }}" class="text-sm font-medium text-white hover:text-blue-300">Inicio</a>
            <a href="#" class="text-sm font-medium text-white/70 hover:text-white">Explorar</a>
            @auth
                <a href="{{ route('user.profile') }}" class="text-sm font-medium text-white/70 hover:text-white">Mi perfil</a>
                <a href="#" class="text-sm font-medium text-white/70 hover:text-white">Comunidad</a>
                @if(auth()->user()->isAdmin())
                    <a href="{{ route('admin.index') }}" class="text-sm font-medium text-red-400 hover:text-red-300">Panel Admin</a>
                @endif
            @endauth
        </nav>
        
        <!-- Search -->
        <div class="flex items-center gap-4 ml-auto">
            <form action="{{ route('search.results') }}" method="GET" class="relative flex items-center gap-2">
                <div class="relative">
                    <i data-lucide="search" class="absolute left-2.5 top-2.5 h-4 w-4 text-white/60"></i>
                    <input 
                        type="search" 
                        name="q"
                        placeholder="Buscar libros, autores..."
                        value="{{ request('q') }}"
                        class="w-full rounded-full bg-white/10 border border-white/20 pl-8 pr-4 py-2 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20 md:w-[200px] lg:w-[280px]"
                    />
                </div>
                <select name="tipo" class="rounded-full bg-white/10 border border-white/20 text-white text-sm px-3 py-2 focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20">
                    <option value="titulo" {{ request('tipo') == 'titulo' ? 'selected' : '' }}>Título</option>
                    <option value="autor" {{ request('tipo') == 'autor' ? 'selected' : '' }}>Autor</option>
                    <option value="genero" {{ request('tipo') == 'genero' ? 'selected' : '' }}>Género</option>
                    <option value="usuario" {{ request('tipo') == 'usuario' ? 'selected' : '' }}>Usuario</option>
                </select>
                <button type="submit" class="rounded-full bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-medium text-white transition-colors">
                    Buscar
                </button>
            </form>
            
            <!-- User menu -->
            @auth
                <div class="flex items-center gap-2">
                    <button class="p-2 rounded-full hover:bg-white/10 transition-colors">
                        <i data-lucide="bell" class="h-5 w-5"></i>
                    </button>
                    <a href="{{ route('user.profile') }}" class="p-2 rounded-full hover:bg-white/10 transition-colors">
                        <i data-lucide="user" class="h-5 w-5"></i>
                    </a>
                    @if(auth()->user()->isAdmin())
                        <a href="{{ route('admin.index') }}" class="p-2 rounded-full hover:bg-red-900/30 transition-colors text-red-400">
                            <i data-lucide="shield" class="h-5 w-5"></i>
                        </a>
                    @endif
                    <form action="{{ route('logout') }}" method="POST" class="inline">
                        @csrf
                        <button type="submit" class="p-2 rounded-full hover:bg-white/10 transition-colors" title="Cerrar sesión">
                            <i data-lucide="log-out" class="h-5 w-5"></i>
                        </button>
                    </form>
                </div>
            @else
                <div class="flex items-center gap-2">
                    <a href="{{ route('login') }}" class="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors">
                        Iniciar sesión
                    </a>
                    <a href="{{ route('register') }}" class="rounded-full bg-green-600 hover:bg-green-700 px-4 py-2 text-sm font-medium text-white transition-colors">
                        Registrarse
                    </a>
                </div>
            @endauth
        </div>
    </div>
    
    <!-- Mobile menu -->
    <div id="mobile-menu" class="hidden md:hidden border-t border-white/20 bg-black/20 backdrop-blur">
        <nav class="container mx-auto px-4 py-4 space-y-2">
            <a href="{{ route('home') }}" class="block py-2 text-white hover:text-blue-300">Inicio</a>
            <a href="#" class="block py-2 text-white/70 hover:text-white">Explorar</a>
            @auth
                <a href="{{ route('user.profile') }}" class="block py-2 text-white/70 hover:text-white">Mi perfil</a>
                <a href="#" class="block py-2 text-white/70 hover:text-white">Comunidad</a>
                @if(auth()->user()->isAdmin())
                    <a href="{{ route('admin.index') }}" class="block py-2 text-red-400 hover:text-red-300">Panel Admin</a>
                @endif
            @endauth
        </nav>
    </div>
</header>

<script>
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}
</script>
